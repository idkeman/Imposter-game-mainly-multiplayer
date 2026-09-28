(function(){
/* 
  NetplayJS-compatible online transport.
  NetplayJS 0.4.1 documents a WebSocket matchmaking server followed by
  WebRTC peer connections. This test branch uses that documented signaling
  protocol directly so this DOM-based game can support 3–20 players and
  send private role messages to individual peers.
*/
const DEFAULT_NETPLAY_SERVER_URL="https://netplayjs.varunramesh.net";
function getServerUrl(){
  try{
    const match=window.location.hash.match(/(?:^|[&#])server=([^&]+)/);
    return match?decodeURIComponent(match[1]):DEFAULT_NETPLAY_SERVER_URL;
  }catch{return DEFAULT_NETPLAY_SERVER_URL}
}
function getWebSocketUrl(serverUrl){
  try{
    const url=new URL(serverUrl);
    url.protocol=url.protocol==="http:"?"ws:":"wss:";
    url.port="";
    url.pathname="/";
    url.search="";
    url.hash="";
    return url.toString();
  }catch{return "wss://netplayjs.varunramesh.net/"}
}
const NETPLAY_SERVER_URL=getServerUrl();
const NETPLAY_WS_URL=getWebSocketUrl(NETPLAY_SERVER_URL);
const state={
  connection:null,ws:null,clientId:"",hostId:"",isHost:false,name:"",
  players:new Map(),peers:new Map(),privateRole:null,privateWord:"",privateHint:"",
  settings:{players:5,category:"mixed",time:90},phase:"home",timerLeft:0,timerId:null,
  myVote:null,votes:new Map(),voteRound:0,candidates:null,selectedPlayer:null,
  gameStarted:false,lastIntent:""
};
const $=id=>document.getElementById(id);
const screens=["home","connecting","lobby","role","discussion","vote","result","error"];
function show(id){screens.forEach(s=>$(s)?.classList.toggle("active",s===id));window.scrollTo(0,0)}
function setStatus(kicker,title,text){$("connectingKicker").textContent=kicker;$("connectingTitle").textContent=title;$("connectingText").textContent=text}
function setError(title,text){$("errorTitle").textContent=title;$("errorText").textContent=text;show("error")}
function normalizeName(value){return String(value||"").trim().replace(/\s+/g," ").slice(0,24)}
function parseRoom(value){
  const raw=String(value||"").trim();
  if(!raw)return "";
  try{const url=new URL(raw);const room=url.hash.match(/(?:^|[&#])room=([^&]+)/);if(room)return decodeURIComponent(room[1])}catch{}
  const match=raw.match(/(?:^|[?#&])room=([^&#]+)/);if(match)return decodeURIComponent(match[1]);
  return raw.replace(/^room=/i,"").trim();
}
function validRoom(id){return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)}
function setMode(host){
  $("hostModeBtn").classList.toggle("active",host);$("joinModeBtn").classList.toggle("active",!host);
  $("hostSetup").classList.toggle("hidden",!host);$("joinSetup").classList.toggle("hidden",host);
}
function updatePlayerSlider(){const input=$("onlinePlayerCount"),label=$("onlinePlayerCountLabel");if(!input||!label)return;label.textContent=input.value}
function showHostOnly(show){document.querySelectorAll(".host-only").forEach(e=>e.classList.toggle("hidden",!show))}
function roleHint(){return typeof window.IMPOSTER_HINT_FOR==="function"?window.IMPOSTER_HINT_FOR(state.privateWord):({food:"Food",animals:"Animal",places:"Place",objects:"Object",activities:"Activity",nature:"Nature",school:"School",sports:"Sport",movies:"Movies",jobs:"Work",vehicles:"Vehicle",technology:"Technology",music:"Music",drinks:"Drink",household:"Home",clothing:"Clothing",space:"Space",weather:"Weather",holidays:"Holiday",mixed:"General"}[state.settings.category]||"General")}
function getPlayerEntries(){return [...state.players.values()].filter(p=>p.connected!==false)}
function playerName(id){return state.players.get(id)?.name||"Player"}
function send(wsMessage){if(state.ws?.readyState===WebSocket.OPEN)state.ws.send(JSON.stringify(wsMessage))}
function closePeer(peer){try{peer.dc?.close()}catch{}try{peer.pc?.close()}catch{}}
function cleanupNetwork(){
  clearInterval(state.timerId);state.timerId=null;
  clearInterval(state._timerBroadcast);state._timerBroadcast=null;
  for(const peer of state.peers.values())closePeer(peer);
  state.peers.clear();try{state.ws?.close()}catch{}state.ws=null;
}
function resetLocal(){
  cleanupNetwork();state.connection=null;state.clientId="";state.hostId="";state.isHost=false;state.players.clear();
  state.myVote=null;state.votes.clear();state.voteRound=0;state.candidates=null;state.selectedPlayer=null;state.gameStarted=false;state.phase="home";
}
function backHome(){resetLocal();showHostOnly(false);$("leaveBtn").textContent="↻";show("home")}
function currentInvite(){const room=state.hostId||state.clientId;return window.location.href.split("#")[0]+"#room="+encodeURIComponent(room)}
function renderLobby(){
  $("roomCode").textContent=state.hostId||state.clientId;
  $("inviteLink").textContent=state.isHost?currentInvite():(state.hostId?window.location.href.split("#")[0]+"#room="+encodeURIComponent(state.hostId):"—");
  const list=getPlayerEntries();
  $("lobbyCount").textContent=list.length+" / "+state.settings.players;
  $("onlinePlayerList").replaceChildren();
  list.forEach(p=>{
    const row=document.createElement("div");row.className="player-row";
    const strong=document.createElement("strong");strong.textContent=p.name;
    const meta=document.createElement("div");meta.className="player-meta";
    const dot=document.createElement("span");dot.className="dot "+(p.ready?"ready":"");
    const label=document.createElement("span");label.textContent=p.id===state.clientId?"YOU":(p.isHost?"HOST":"READY "+(p.ready?"✓":""));
    if(p.isHost)label.classList.add("host-badge");
    meta.append(dot,label);row.append(strong,meta);$("onlinePlayerList").appendChild(row);
  });
  $("guestReadyArea").classList.toggle("hidden",state.isHost);
  $("hostLobbyArea").classList.toggle("hidden",!state.isHost);
  if(!state.isHost){
    $("readyBtn").textContent=state.players.get(state.clientId)?.ready?"READY ✓":"I'M READY";
  }else{
    const full=list.length===state.settings.players;
    const ready=full&&list.every(p=>p.ready);
    $("hostLobbyMessage").textContent=full?(ready?"Everyone is ready. Start the match.":"Waiting for everyone to ready up."):"Waiting for "+(state.settings.players-list.length)+" more player"+(state.settings.players-list.length===1?"":"s")+"…";
    $("startOnlineBtn").disabled=!ready;
  }
}
function addOrUpdatePlayer(player){state.players.set(player.id,{connected:true,ready:false,...player})}

class NetplaySignal{
  constructor(){this.ws=null}
  connect(){
    return new Promise((resolve,reject)=>{
      try{this.ws=new WebSocket(NETPLAY_WS_URL)}catch(e){reject(e);return}
      state.ws=this.ws;
      let settled=false;
      this.ws.onopen=()=>{setStatus("NETPLAYJS","CONNECTED TO SIGNALING","Waiting for your player ID…")};
      this.ws.onerror=()=>{if(!settled){settled=true;reject(new Error("Could not connect to the NetplayJS matchmaking server."))}else setError("Signaling connection lost","The multiplayer signaling service is unavailable. Return home and try again.")};
      this.ws.onclose=()=>{if(!settled){settled=true;reject(new Error("The NetplayJS signaling connection closed before registration."))}else if(state.gameStarted)setError("Connection lost","The multiplayer signaling connection was closed.");};
      this.ws.onmessage=event=>{
        let msg;try{msg=JSON.parse(event.data)}catch{return}
        if(msg.kind==="registration-success"){
          state.clientId=msg.clientID;state.connection=msg.iceServers||[];
          settled=true;resolve(msg);
        }else this.handleServerMessage(msg);
      };
    });
  }
  host(){
    state.isHost=true;state.hostId=state.clientId;showHostOnly(true);
    addOrUpdatePlayer({id:state.clientId,name:state.name,isHost:true,ready:true,connected:true});
    renderLobby();show("lobby");
  }
  async join(hostId){
    state.isHost=false;state.hostId=hostId;showHostOnly(false);
    if(!validRoom(hostId))throw new Error("That room ID is not a valid NetplayJS client ID.");
    setStatus("JOINING ROOM","CONNECTING TO HOST","Negotiating a secure WebRTC data channel…");show("connecting");
    await this.makePeer(hostId,true);
  }
  async makePeer(peerId,initiator){
    if(state.peers.has(peerId))return state.peers.get(peerId);
    const pc=new RTCPeerConnection({iceServers:state.connection||[]});
    const peer={id:peerId,pc,dc:null,initiator,pendingCandidates:[],timeoutId:null};
    peer.timeoutId=setTimeout(()=>{if(pc.connectionState!=="connected"){try{pc.close()}catch{}state.peers.delete(peerId);if(state.isHost){const p=state.players.get(peerId);if(p){p.connected=false;broadcastLobby()}}else setError("Could not connect to host","The WebRTC connection timed out. Make sure both devices are online and try again.");}},15000);
    state.peers.set(peerId,peer);
    pc.onicecandidate=e=>{if(e.candidate)send({kind:"send-message",type:"candidate",destinationID:peerId,payload:e.candidate.toJSON?e.candidate.toJSON():e.candidate})};
    pc.onconnectionstatechange=()=>{
      if(pc.connectionState==="connected")clearTimeout(peer.timeoutId);
      if(["failed","closed"].includes(pc.connectionState)){
        closePeer(peer);state.peers.delete(peerId);
        clearTimeout(peer.timeoutId);
        if(state.isHost){const p=state.players.get(peerId);if(p){p.connected=false;broadcastLobby()}}
        else setError("Host connection lost","The host left or the peer connection failed. Return home and join a new room.");
      }
    };
    if(initiator){
      peer.dc=pc.createDataChannel("data",{ordered:true});
      this.bindDataChannel(peer);
      const offer=await pc.createOffer();await pc.setLocalDescription(offer);
      send({kind:"send-message",type:"offer",destinationID:peerId,payload:offer});
    }else{
      pc.ondatachannel=e=>{peer.dc=e.channel;this.bindDataChannel(peer)};
    }
    return peer;
  }
  bindDataChannel(peer){
    peer.dc.binaryType="arraybuffer";
    peer.dc.onopen=()=>{
      clearTimeout(peer.timeoutId);
      if(!state.isHost)sendPeer(peer,{type:"hello",name:state.name,clientId:state.clientId});
      else this.acceptPeer(peer);
    };
    peer.dc.onmessage=e=>{
      let msg;try{msg=JSON.parse(typeof e.data==="string"?e.data:new TextDecoder().decode(e.data))}catch{return}
      this.handlePeerMessage(peer,msg);
    };
    peer.dc.onclose=()=>{clearTimeout(peer.timeoutId);closePeer(peer);state.peers.delete(peer.id);if(state.isHost){const p=state.players.get(peer.id);if(p){p.connected=false;broadcastLobby()}}};
  }
  acceptPeer(peer){
    sendPeer(peer,{type:"host-accepted",settings:state.settings});
  }
  handleServerMessage(msg){
    if(msg.kind==="server-error")setError("NetplayJS server error",msg.reason);
    else if(msg.kind==="send-message-failure")setError("Could not reach player",msg.reason);
    else if(msg.kind==="peer-message"){
      let peer=state.peers.get(msg.sourceID);
      if(!peer){this.makePeer(msg.sourceID,false).catch(e=>setError("Peer setup failed",e.message))}
      peer=state.peers.get(msg.sourceID);if(peer)this.handleSignal(peer,msg.type,msg.payload);
    }
  }
  async handleSignal(peer,type,payload){
    try{
      if(type==="candidate"){
        if(peer.pc.remoteDescription){
          await peer.pc.addIceCandidate(payload);
        }else{
          peer.pendingCandidates.push(payload);
        }
        return;
      }
      if(type==="offer"){
        await peer.pc.setRemoteDescription(payload);
        for(const candidate of peer.pendingCandidates.splice(0)){
          await peer.pc.addIceCandidate(candidate);
        }
        const answer=await peer.pc.createAnswer();
        await peer.pc.setLocalDescription(answer);
        send({kind:"send-message",type:"answer",destinationID:peer.id,payload:answer});
      }else if(type==="answer"){
        await peer.pc.setRemoteDescription(payload);
        for(const candidate of peer.pendingCandidates.splice(0)){
          await peer.pc.addIceCandidate(candidate);
        }
      }
    }catch(e){
      console.error("Signaling error",e);
      setError("WebRTC signaling failed","The browser-to-browser connection could not complete. Check that both players are using HTTPS and try again.");
    }
  }
}
state.net=null;
function sendPeer(peer,msg){
  if(peer?.dc?.readyState==="open"){peer.dc.send(JSON.stringify(msg));return true}
  return false;
}
function sendToAllPeers(msg){for(const peer of state.peers.values())sendPeer(peer,msg)}
function broadcastLobby(){const payload={type:"lobby",settings:state.settings,players:getPlayerEntries().map(p=>({id:p.id,name:p.name,isHost:p.isHost,ready:p.ready}))};sendToAllPeers(payload);renderLobby()}
function syncPublic(msg){sendToAllPeers(msg)}
function assignRound(){
  const pool=(window.IMPOSTER_WORDS&&Array.isArray(window.IMPOSTER_WORDS[state.settings.category])?window.IMPOSTER_WORDS[state.settings.category]:window.IMPOSTER_WORDS?.mixed)||["Pizza","Shark","Volcano"];
  const word=pool[Math.floor(Math.random()*pool.length)];
  const players=getPlayerEntries();const max=Math.max(1,Math.floor(players.length/3));const n=1+Math.floor(Math.random()*max);
  const shuffled=players.map(p=>p.id).sort(()=>Math.random()-.5);const imposters=new Set(shuffled.slice(0,n));
  state.privateWord=word;state.privateRole=imposters.has(state.clientId)?"imposter":"player";state.privateHint=typeof window.IMPOSTER_HINT_FOR==="function"?window.IMPOSTER_HINT_FOR(word):roleHint();
  for(const p of players){
    const peer=state.peers.get(p.id);
    if(p.id===state.clientId)continue;
    if(peer)sendPeer(peer,{type:"private-role",role:imposters.has(p.id)?"imposter":"player",word:imposters.has(p.id)?"":word,hint:imposters.has(p.id)?hintForWord(word):"",name:p.name});
  }
  state._roles=Object.fromEntries(players.map(p=>[p.id,imposters.has(p.id)]));
}
function hintForWord(word){return typeof window.IMPOSTER_HINT_FOR==="function"?window.IMPOSTER_HINT_FOR(word):({food:"Food",animals:"Animal",places:"Place",objects:"Object",activities:"Activity",nature:"Nature",school:"School",sports:"Sport",movies:"Movies",jobs:"Work",vehicles:"Vehicle",technology:"Technology",music:"Music",drinks:"Drink",household:"Home",clothing:"Clothing",space:"Space",weather:"Weather",holidays:"Holiday",mixed:"General"}[state.settings.category]||"General")}
function startOnlineMatch(){
  if(!state.isHost)return;
  if(getPlayerEntries().length!==state.settings.players||!getPlayerEntries().every(p=>p.ready))return;
  state.gameStarted=true;state.phase="role";state.myVote=null;state.votes.clear();state.voteRound=0;
  assignRound();
  sendToAllPeers({type:"game-start",settings:state.settings,players:getPlayerEntries()});
  startTimer(state.settings.time);
  showLocalRole();
}
function showLocalRole(){
  const imp=state.privateRole==="imposter";
  $("onlineRoleIcon").textContent=imp?"?":"✓";
  $("onlineRoleKicker").textContent=imp?"YOU ARE":"THE SECRET WORD IS";
  $("onlineRoleTitle").textContent=imp?"IMPOSTER":"YOU ARE A REAL PLAYER";
  $("onlineWordBox").classList.toggle("hidden",imp);
  $("onlineSecretWord").textContent=state.privateWord;
  $("onlineRoleHint").textContent=imp?"Hint: "+state.privateHint+" — Figure out the exact word.":"Describe the word without saying it directly.";
  show("role");
}
function startTimer(seconds){
  clearInterval(state.timerId);state.timerLeft=Math.max(0,Math.floor(seconds));renderTimer();
  state.timerId=setInterval(()=>{state.timerLeft--;renderTimer();if(state.timerLeft<=0){clearInterval(state.timerId);state.timerId=null;if(state.isHost)openVoting()}},1000);
}
function renderTimer(){const s=Math.max(0,Math.floor(state.timerLeft));$("onlineTimer").textContent=Math.floor(s/60)+":"+String(s%60).padStart(2,"0")}
function continueToDiscussion(){show("discussion");$("discussionStatus").textContent=state.isHost?"You're the host. End discussion when everyone has described the word.":"The host controls the discussion timer."}
function openVoting(candidates=null,revote=false){
  if(!state.isHost)return;
  clearInterval(state.timerId);state.timerId=null;state.phase="vote";state.candidates=candidates;state.votes.clear();state.myVote=null;
  syncPublic({type:"vote-open",candidates:candidates,revote,players:getPlayerEntries().map(p=>({id:p.id,name:p.name}))});
  renderVoting(candidates,revote);
}
function renderVoting(candidates,revote){
  state.phase="vote";$("votePhase").textContent=revote?"REVOTE":"VOTE";$("voteTitle").textContent=revote?"The vote is tied. Vote again.":"Who is the imposter?";
  const list=candidates||getPlayerEntries().map(p=>p.id);const grid=$("onlineVoteGrid");grid.replaceChildren();
  list.forEach(id=>{
    const b=document.createElement("button");b.type="button";b.className="vote-btn";b.dataset.id=id;b.textContent=playerName(id);
    if(id===state.clientId)b.classList.add("self"),b.disabled=true;
    b.addEventListener("click",()=>{grid.querySelectorAll(".vote-btn").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");state.myVote=id;$("submitVoteBtn").disabled=false});
    grid.appendChild(b);
  });
  $("submitVoteBtn").disabled=state.myVote===null;
  $("hostRevealBtn").classList.toggle("hidden",!state.isHost);$("hostRevealBtn").disabled=!state.isHost||state.votes.size<getPlayerEntries().length;show("vote");
}
function submitVote(){
  if(state.myVote===null)return;
  if(state.isHost){state.votes.set(state.clientId,state.myVote);updateVoteStatus();maybeRevealVotes()}
  else {const peer=state.peers.get(state.hostId);sendPeer(peer,{type:"vote",candidate:state.myVote});$("submitVoteBtn").disabled=true;$("voteStatus").textContent="Vote submitted. Waiting for the reveal…"}
}
function updateVoteStatus(){const total=getPlayerEntries().length;const count=state.votes.size;$("voteStatus").textContent=count+" / "+total+" votes submitted."}
function maybeRevealVotes(){if(state.isHost&&state.votes.size>=getPlayerEntries().length)resolveVotes()}
function resolveVotes(){
  if(!state.isHost)return;
  const counts={};for(const candidate of state.votes.values())counts[candidate]=(counts[candidate]||0)+1;
  const max=Math.max(...Object.values(counts),0);const tied=Object.keys(counts).filter(id=>counts[id]===max);
  if(tied.length>1){state.voteRound++;if(state.voteRound>=3){const chosen=tied[0];revealCandidate(chosen,counts);return}openVoting(tied,true);return}
  revealCandidate(tied[0],counts);
}
function revealCandidate(selected,counts){
  if(!selected)return;state.selectedPlayer=selected;state.phase="result";const caught=!!state._roles?.[selected];
  const payload={type:"vote-result",selected,counts,caught,revote:false};
  syncPublic(payload);renderVoteResult(selected,counts,caught);
  if(caught){
    state.phase="guess";if(selected===state.clientId)showGuessPrompt();
  }else finishRound(false,"The group voted for the wrong player.",state.privateWord);
}
function renderVoteResult(selected,counts,caught){
  $("resultPlayer").textContent=playerName(selected).toUpperCase();$("onlineResultMessage").innerHTML=caught?"<strong>They were an IMPOSTER.</strong>":"<strong>They were NOT an imposter.</strong>";
  $("voteCounts").replaceChildren();Object.entries(counts).sort((a,b)=>b[1]-a[1]).forEach(([id,n])=>{const row=document.createElement("div");row.className="vote-count";row.innerHTML="<span></span><strong>"+n+"</strong>";row.firstChild.textContent=playerName(id);$("voteCounts").appendChild(row)});
  $("finalGuessArea").classList.toggle("hidden",!caught);$("finishedArea").classList.toggle("hidden",caught);
  if(caught)$("finalGuessInstruction").textContent=selected===state.clientId?"You were caught. Guess the secret word for a chance to win.":playerName(selected)+" gets one final guess at the secret word.";
  show("result");
}
function showGuessPrompt(){$("guessInputRow").classList.remove("hidden");$("finalGuessInput").focus()}
function submitFinalGuess(){
  const guess=$("finalGuessInput").value.trim();if(!guess)return;
  if(state.isHost){finishRound(guess.toLowerCase()===state.privateWord.toLowerCase(),"Final guess: "+guess,state.privateWord)}
  else{if(!sendPeer(state.peers.get(state.hostId),{type:"final-guess",guess})){setError("Connection lost","Your connection to the host is no longer available.");return}$("guessInputRow").classList.add("hidden");$("finalGuessInstruction").textContent="Guess submitted. Waiting for the result…"}
}
function finishRound(impostersWin,message,word){
  state.phase="finished";clearInterval(state.timerId);state.timerId=null;
  syncPublic({type:"round-finished",impostersWin,message,word});
  renderFinished(impostersWin,message,word);
}
function renderFinished(impostersWin,message,word){
  $("finalGuessArea").classList.add("hidden");$("finishedArea").classList.remove("hidden");
  $("onlineFinalResult").textContent=(impostersWin?"THE IMPOSTER WINS. ":"THE REAL PLAYERS WIN. ")+message+" The word was “"+word+"”.";
  $("playAgainBtn").textContent=state.isHost?"RETURN TO LOBBY":"LEAVE GAME";
  show("result");
}
function handlePeerMessage(peer,msg){
  if(msg.type==="hello"&&state.isHost){
    if(getPlayerEntries().length>=state.settings.players){sendPeer(peer,{type:"room-full"});closePeer(peer);state.peers.delete(peer.id);return}
    addOrUpdatePlayer({id:peer.id,name:normalizeName(msg.name)||"Player",isHost:false,ready:false});
    broadcastLobby();return;
  }
  if(msg.type==="host-accepted"&&!state.isHost){
    state.settings={...state.settings,...msg.settings};state.players.set(state.clientId,{id:state.clientId,name:state.name,isHost:false,ready:false,connected:true});renderLobby();show("lobby");return;
  }
  if(msg.type==="lobby"&&!state.isHost){
    state.settings=msg.settings;state.players.clear();msg.players.forEach(p=>state.players.set(p.id,p));renderLobby();return;
  }
  if(msg.type==="ready"&&state.isHost){
    const p=state.players.get(peer.id);
    if(p&&!state.gameStarted){p.ready=!!msg.ready;broadcastLobby()}
    return;
  }
  if(msg.type==="vote"&&state.isHost){
    if(state.phase!=="vote"||!state.players.has(peer.id))return;
    const allowed=(state.candidates||getPlayerEntries().map(p=>p.id));
    if(!allowed.includes(msg.candidate)||msg.candidate===peer.id)return;
    state.votes.set(peer.id,msg.candidate);
    updateVoteStatus();
    maybeRevealVotes();
    return;
  }
  if(msg.type==="game-start"){
    state.gameStarted=true;state.phase="role";state.settings=msg.settings;state.players.clear();msg.players.forEach(p=>state.players.set(p.id,p));show("role");return;
  }
  if(msg.type==="private-role"){
    state.privateRole=msg.role;state.privateWord=msg.word||"";state.privateHint=msg.hint||"General";showLocalRole();return;
  }
  if(msg.type==="timer"){state.timerLeft=msg.seconds;renderTimer();return}
  if(msg.type==="discussion-end"){openVotingRemote(null,false);return}
  if(msg.type==="vote-open"){openVotingRemote(msg.candidates,msg.revote);return}
  if(msg.type==="vote-result"){renderVoteResult(msg.selected,msg.counts,msg.caught);if(msg.caught&&msg.selected===state.clientId)showGuessPrompt();return}
  if(msg.type==="round-finished"){renderFinished(msg.impostersWin,msg.message,msg.word);return}
  if(msg.type==="room-full"){setError("Room is full","The host already has the maximum number of players.");}
  if(msg.type==="final-guess"&&state.isHost){
    const guess=String(msg.guess||"").trim();
    if(peer.id!==state.selectedPlayer||state.phase!=="guess"||!guess)return;
    finishRound(guess.toLowerCase()===state.privateWord.toLowerCase(),"Final guess: "+guess,state.privateWord);
    return;
  }
}
function openVotingRemote(candidates,revote){renderVoting(candidates,revote);$("voteStatus").textContent="Choose a player, then submit your vote."}
function sendTimerTick(){sendToAllPeers({type:"timer",seconds:state.timerLeft})}
function hostTimerBroadcast(){
  clearInterval(state._timerBroadcast);state._timerBroadcast=setInterval(()=>{if(state.isHost){sendTimerTick();if(state.timerLeft<=0)clearInterval(state._timerBroadcast)}},1000)
}
function leaveRoom(){backHome()}
function createRoom(){
  const name=normalizeName($("displayName").value);if(!name){alert("Enter your name first.");$("displayName").focus();return}
  state.name=name;state.isHost=true;state.settings={players:Number($("onlinePlayerCount").value),category:$("onlineCategory").value,time:Number($("onlineRoundTime").value)};
  setStatus("HOSTING","CREATING PRIVATE ROOM","Registering with the NetplayJS matchmaking service…");show("connecting");
  state.net=new NetplaySignal();state.net.connect().then(()=>{state.net.host();hostTimerBroadcast()}).catch(e=>setError("Could not create room",e.message));
}
function joinRoom(){
  const name=normalizeName($("displayName").value),room=parseRoom($("roomInput").value);if(!name){alert("Enter your name first.");$("displayName").focus();return}
  if(!validRoom(room)){alert("Enter a valid room ID or invite link.");return}
  state.name=name;setStatus("JOINING","CONNECTING TO ROOM","Registering with the NetplayJS matchmaking service…");show("connecting");
  state.net=new NetplaySignal();state.net.connect().then(()=>state.net.join(room)).catch(e=>setError("Could not join room",e.message));
}
function startHostMatch(){startOnlineMatch()}
function continueFromRole(){continueToDiscussion()}
function endDiscussion(){if(!state.isHost)return;clearInterval(state.timerId);state.timerId=null;syncPublic({type:"discussion-end"});openVoting()}
function toggleReady(){
  const p=state.players.get(state.clientId);if(!p||state.isHost)return;p.ready=!p.ready;if(!sendPeer(state.peers.get(state.hostId),{type:"ready",ready:p.ready})){p.ready=!p.ready;setError("Connection lost","Your connection to the host is no longer available.");return}renderLobby()
}
async function copyInvite(){try{await navigator.clipboard.writeText(currentInvite());$("copyRoomBtn").textContent="COPIED ✓";setTimeout(()=>$("copyRoomBtn").textContent="COPY INVITE",1400)}catch{$("inviteLink").select?.()}}
let initDone=false;
function init(){
  if(initDone)return;
  initDone=true;
  try{
    setMode(true);showHostOnly(false);updatePlayerSlider();
    const slider=$("onlinePlayerCount");
    if(slider){slider.addEventListener("input",updatePlayerSlider);slider.addEventListener("change",updatePlayerSlider)}
    $("hostModeBtn").addEventListener("click",()=>setMode(true));$("joinModeBtn").addEventListener("click",()=>setMode(false));
    $("createRoomBtn").addEventListener("click",createRoom);$("joinRoomBtn").addEventListener("click",joinRoom);
    $("copyRoomBtn").addEventListener("click",copyInvite);$("readyBtn").addEventListener("click",toggleReady);
    $("startOnlineBtn").addEventListener("click",startHostMatch);$("continueRoleBtn").addEventListener("click",continueFromRole);
    $("endDiscussionBtn").addEventListener("click",endDiscussion);$("submitVoteBtn").addEventListener("click",submitVote);$("hostRevealBtn").addEventListener("click",resolveVotes);
    $("finalGuessBtn").addEventListener("click",submitFinalGuess);
    $("playAgainBtn").addEventListener("click",()=>{
      if(state.isHost){
        state.gameStarted=false;state.phase="lobby";state.privateRole=null;state.privateWord="";state.privateHint="";
        state.myVote=null;state.votes.clear();state.voteRound=0;state.selectedPlayer=null;
        state.players.forEach(p=>{if(!p.isHost)p.ready=false});
        const host=state.players.get(state.clientId);if(host)host.ready=true;
        broadcastLobby();show("lobby");
      }else{
        backHome();
      }
    });
    $("leaveBtn").addEventListener("click",leaveRoom);$("retryBtn").addEventListener("click",backHome);
    const room=parseRoom(window.location.hash);
    if(validRoom(room)){$("roomInput").value=window.location.href;setMode(false)}
  }catch(e){
    console.error("Online multiplayer startup failed:",e);
    setError("Online page failed to start",e?.message||String(e));
  }
}
if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",init,{once:true});
}else{
  init();
}
window.addEventListener("load",init,{once:true});

})();
