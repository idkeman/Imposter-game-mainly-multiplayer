(()=>{"use strict";
const $=id=>document.getElementById(id),screens=["home","connecting","lobby","role","discussion","vote","result","error"];
const S={peer:null,hostConn:null,guest:new Map(),id:"",host:"",hostMode:false,name:"",settings:{players:5,category:"mixed",time:90},players:new Map(),roles:{},word:"",role:"",hint:"",phase:"home",timer:0,timerId:null,voteCandidates:null,votes:new Map(),selectedVote:null,voteRound:0,selected:null,game:false};
const PREFIX="imposter-",MAX=20,MIN=3;
function show(x){screens.forEach(s=>$(s)?.classList.toggle("active",s===x));scrollTo(0,0)}
function status(k,t,x){$("connectingKicker").textContent=k;$("connectingTitle").textContent=t;$("connectingText").textContent=x}
function error(t,x){$("errorTitle").textContent=t;$("errorText").textContent=x;show("error")}
function name(x){return String(x||"").trim().replace(/\s+/g," ").slice(0,24)}
function code(){const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let r="";const a=new Uint8Array(8);crypto.getRandomValues(a);a.forEach(v=>r+=c[v%c.length]);return r}
function peerIdFrom(v){let r=String(v||"").trim();try{const u=new URL(r),m=u.hash.match(/room=([^&]+)/i);if(m)r=decodeURIComponent(m[1])}catch{}const m=r.match(/room=([^&#]+)/i);if(m)r=decodeURIComponent(m[1]);r=r.replace(/^room=/i,"").trim();if(/^imposter-[a-z0-9]{8}$/i.test(r))return r.toLowerCase();if(/^[a-z0-9]{8}$/i.test(r))return PREFIX+r.toLowerCase();return""}
function room(id){id=String(id||"");return id.startsWith(PREFIX)?id.slice(PREFIX.length).toUpperCase():id.toUpperCase()}
function invite(){return location.href.split("#")[0]+"#room="+room(S.host||S.id)}
function players(){return [...S.players.values()].filter(p=>p.connected!==false)}
function pname(id){return S.players.get(id)?.name||"Player"}
function txt(id,v){const e=$(id);if(e)e.textContent=v}
function mode(host){$("hostModeBtn").classList.toggle("active",host);$("joinModeBtn").classList.toggle("active",!host);$("hostSetup").classList.toggle("hidden",!host);$("joinSetup").classList.toggle("hidden",host)}
function hostOnly(v){document.querySelectorAll(".host-only").forEach(e=>e.classList.toggle("hidden",!v))}
function slider(){txt("onlinePlayerCountLabel",$("onlinePlayerCount").value)}
function send(c,m){if(!c?.open)return false;try{c.send(m);return true}catch{return false}}
function all(m){S.guest.forEach(c=>send(c,m))}
function stop(){clearInterval(S.timerId);S.timerId=null}
function closeAll(){stop();S.guest.forEach(c=>{try{c.close()}catch{}});S.guest.clear();try{S.hostConn?.close()}catch{};S.hostConn=null;try{S.peer?.destroy()}catch{};S.peer=null}
function home(){closeAll();S.id=S.host="";S.hostMode=false;S.players.clear();S.game=false;S.phase="home";hostOnly(false);mode(true);show("home")}
function lobby(){
 txt("roomCode",room(S.host||S.id));txt("inviteLink",S.host?invite():"—");const ps=players();txt("lobbyCount",ps.length+" / "+S.settings.players);$("onlinePlayerList").replaceChildren();
 ps.forEach(p=>{const r=document.createElement("div"),n=document.createElement("strong"),m=document.createElement("div"),d=document.createElement("span"),l=document.createElement("span");r.className="player-row";m.className="player-meta";d.className="dot "+(p.ready?"ready":"");n.textContent=p.name;l.textContent=p.id===S.id?"YOU":p.isHost?"HOST":p.ready?"READY ✓":"NOT READY";if(p.isHost)l.classList.add("host-badge");m.append(d,l);r.append(n,m);$("onlinePlayerList").append(r)});
 $("guestReadyArea").classList.toggle("hidden",S.hostMode);$("hostLobbyArea").classList.toggle("hidden",!S.hostMode);
 if(S.hostMode){const full=ps.length===S.settings.players,ready=full&&ps.every(p=>p.ready);$("hostLobbyMessage").textContent=full?(ready?"Everyone is ready. Start the match.":"Everyone must be ready before the match can start."):"Waiting for "+(S.settings.players-ps.length)+" more player"+(S.settings.players-ps.length===1?"":"s")+"…";$("startOnlineBtn").disabled=!ready}else $("readyBtn").textContent=S.players.get(S.id)?.ready?"READY ✓":"I'M READY";
}
function sync(){if(!S.hostMode)return;all({type:"lobby",settings:S.settings,players:players()});lobby()}
function roleUI(){const imp=S.role==="imposter";txt("onlineRoleIcon",imp?"?":"✓");txt("onlineRoleTitle",imp?"THE IMPOSTER":"A REAL PLAYER");txt("onlineSecretWord",imp?"—":S.word||"—");txt("onlineRoleHint",imp?"Your one-word hint: "+S.hint:"Keep the secret word hidden from the imposter.");$("onlineWordBox").classList.toggle("hidden",imp);show("role")}
function timerUI(){let n=Math.max(0,S.timer|0);txt("onlineTimer",Math.floor(n/60)+":"+String(n%60).padStart(2,"0"))}
function discussion(){show("discussion");timerUI();txt("discussionStatus",S.hostMode?"End discussion when everyone is ready to vote.":"Discuss, then wait for the host to open voting.")}
function word(){const a=window.IMPOSTER_WORDS?.[S.settings.category]||window.IMPOSTER_WORDS?.mixed||[];return a[Math.floor(Math.random()*a.length)]||"Pizza"}
function hint(w){return String(window.IMPOSTER_HINT_FOR?.(w)||"General").split(/\s+/)[0]}
function imposters(n){return n<=6?1:n<=11?2:n<=16?3:4}
function start(){
 if(!S.hostMode)return;const ps=players();if(ps.length!==S.settings.players||!ps.every(p=>p.ready)){lobby();return}
 S.word=word();S.roles={};const ids=ps.map(p=>p.id).sort(()=>Math.random()-.5),set=new Set(ids.slice(0,Math.min(imposters(ps.length),ps.length-1)));ps.forEach(p=>S.roles[p.id]=set.has(p.id)?"imposter":"real");S.game=true;S.phase="role";S.role=S.roles[S.id];S.hint=hint(S.word);S.votes.clear();S.voteRound=0;S.selected=null;
 all({type:"game-start",settings:S.settings,players:ps});ps.forEach(p=>{if(p.id!==S.id)send(S.guest.get(p.id),{type:"role",role:S.roles[p.id],word:S.roles[p.id]==="real"?S.word:"",hint:hint(S.word)})});roleUI()
}
function beginTimer(){stop();S.timer=+S.settings.time||90;timerUI();all({type:"timer",seconds:S.timer});S.timerId=setInterval(()=>{S.timer--;timerUI();all({type:"timer",seconds:S.timer});if(S.timer<=0){stop();openVote()}},1000)}
function connectHost(){
 const id=PREFIX+code().toLowerCase();S.peer=new Peer(id,{debug:0});
 S.peer.on("open",x=>{S.id=S.host=x;S.hostMode=true;S.players.set(x,{id:x,name:S.name,isHost:true,ready:true,connected:true});hostOnly(true);lobby();show("lobby")});
 S.peer.on("connection",c=>{c.on("open",()=>{S.guest.set(c.peer,c);send(c,{type:"hello"})});c.on("data",m=>hostMsg(c,m));c.on("close",()=>{S.guest.delete(c.peer);S.players.delete(c.peer);if(!S.game)sync()})});
 S.peer.on("error",e=>{if(e.type==="unavailable-id"){try{S.peer.destroy()}catch{};setTimeout(connectHost,200)}else if(!S.id)error("Could not create room",e.message||"The multiplayer service could not be reached.")});
 S.peer.on("disconnected",()=>{if(S.game)error("Connection lost","The multiplayer connection was lost. Create a new room.")})
}
function hostMsg(c,m){
 const id=c.peer;
 if(m.type==="hello"){if(S.game){send(c,{type:"busy"});c.close();return}if(players().length>=S.settings.players){send(c,{type:"full"});c.close();return}S.players.set(id,{id,name:name(m.name)||"Player",isHost:false,ready:false,connected:true});send(c,{type:"accepted",settings:S.settings,host:S.host});sync();return}
 const p=S.players.get(id);if(!p)return;
 if(m.type==="ready"){if(!S.game){p.ready=!!m.ready;sync()}return}
 if(m.type==="vote"&&S.phase==="vote"){const ok=(S.voteCandidates||players().map(x=>x.id)).includes(m.candidate)&&m.candidate!==id;if(ok){S.votes.set(id,m.candidate);voteStatus();if(S.votes.size>=players().length)resolve()};return}
 if(m.type==="guess"&&S.phase==="guess"&&id===S.selected){finish(m.guess.trim().toLowerCase()===S.word.toLowerCase(),"Final guess: "+m.guess,S.word)}
}
function connectGuest(host){
 S.peer=new Peer(undefined,{debug:0});S.peer.on("open",id=>{S.id=id;const c=S.peer.connect(host,{reliable:true,serialization:"json"});S.hostConn=c;c.on("open",()=>send(c,{type:"hello",name:S.name}));c.on("data",guestMsg);c.on("close",()=>error("Host disconnected","The host left the room or the connection was lost."));setTimeout(()=>{if(!c.open&&S.phase==="connecting")error("Could not join room","The host could not be reached. Make sure the room is open and the code is correct.")},20000)});S.peer.on("error",e=>error("Could not join room",e.message||"The room could not be reached."))
}
function guestMsg(m){
 if(m.type==="accepted"){S.settings={...S.settings,...m.settings};S.host=m.host;return}
 if(m.type==="lobby"){S.settings={...S.settings,...m.settings};S.players.clear();m.players.forEach(p=>S.players.set(p.id,p));lobby();show("lobby");return}
 if(m.type==="game-start"){S.game=true;S.settings={...S.settings,...m.settings};S.players.clear();m.players.forEach(p=>S.players.set(p.id,p));show("role");return}
 if(m.type==="role"){S.role=m.role;S.word=m.word||"";S.hint=m.hint||"General";roleUI();return}
 if(m.type==="timer"){S.timer=+m.seconds||0;timerUI();return}
 if(m.type==="vote-open"){renderVote(m.candidates,m.revote);return}
 if(m.type==="vote-result"){result(m.selected,m.counts,m.caught);return}
 if(m.type==="finish"){finished(m.win,m.message,m.word);return}
 if(m.type==="full")error("Room is full","The host already has the maximum number of players.");
 if(m.type==="busy")error("Match already started","This room is already in a game.");
}
function continueRole(){S.phase="discussion";discussion();if(S.hostMode)beginTimer()}
function renderVote(cands,revote){
 S.phase="vote";S.voteCandidates=cands||players().map(p=>p.id);S.selectedVote=null;txt("votePhase",revote?"REVOTE":"VOTE");txt("voteTitle",revote?"It's a tie. Vote again.":"Who is the imposter?");$("onlineVoteGrid").replaceChildren();$("submitVoteBtn").disabled=true;$("hostRevealBtn").classList.toggle("hidden",!S.hostMode);
 S.voteCandidates.filter(id=>id!==S.id).forEach(id=>{const b=document.createElement("button");b.type="button";b.className="vote-option";b.textContent=pname(id);b.onclick=()=>{document.querySelectorAll(".vote-option").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");S.selectedVote=id;$("submitVoteBtn").disabled=false};$("onlineVoteGrid").append(b)});txt("voteStatus","Choose a player, then submit your vote.");show("vote")
}
function openVote(cands=null,revote=false){if(!S.hostMode)return;stop();S.votes.clear();S.voteCandidates=cands||players().map(p=>p.id);all({type:"vote-open",candidates:S.voteCandidates,revote});renderVote(S.voteCandidates,revote)}
function submitVote(){if(!S.selectedVote)return;if(S.hostMode){S.votes.set(S.id,S.selectedVote);$("submitVoteBtn").disabled=true;voteStatus();if(S.votes.size>=players().length)resolve()}else if(send(S.hostConn,{type:"vote",candidate:S.selectedVote})){$("submitVoteBtn").disabled=true;txt("voteStatus","Vote submitted. Waiting for the reveal…")}else error("Connection lost","Your vote could not reach the host.")}
function voteStatus(){txt("voteStatus",S.votes.size+" / "+players().length+" votes submitted.")}
function resolve(){if(!S.hostMode||S.phase!=="vote")return;const counts={};S.votes.forEach(v=>counts[v]=(counts[v]||0)+1);const max=Math.max(...Object.values(counts));const tied=Object.keys(counts).filter(x=>counts[x]===max);if(tied.length>1&&S.voteRound<2){S.voteRound++;openVote(tied,true);return}reveal(tied[0],counts)}
function reveal(id,counts){const caught=S.roles[id]==="imposter";S.selected=id;S.phase=caught?"guess":"finished";all({type:"vote-result",selected:id,counts,caught});result(id,counts,caught);if(!caught)finish(false,"The group voted for the wrong player.",S.word);else if(id===S.id)showGuess()}
function result(id,counts,caught){txt("resultPlayer",pname(id).toUpperCase());$("onlineResultMessage").innerHTML=caught?"<strong>They were an IMPOSTER.</strong>":"<strong>They were NOT an imposter.</strong>";$("voteCounts").replaceChildren();Object.entries(counts).sort((a,b)=>b[1]-a[1]).forEach(([id,n])=>{const r=document.createElement("div"),s=document.createElement("span"),b=document.createElement("strong");r.className="vote-count";s.textContent=pname(id);b.textContent=n;r.append(s,b);$("voteCounts").append(r)});$("finalGuessArea").classList.toggle("hidden",!caught);$("finishedArea").classList.toggle("hidden",caught);if(caught){txt("finalGuessInstruction",S.selected===S.id?"You were caught. Guess the secret word for a chance to win.":pname(S.selected)+" gets one final guess at the secret word.");$("guessInputRow").classList.toggle("hidden",S.selected!==S.id)}show("result")}
function showGuess(){$("guessInputRow").classList.remove("hidden");$("finalGuessInput").focus()}
function guess(){const g=$("finalGuessInput").value.trim();if(!g)return;if(S.hostMode)finish(g.toLowerCase()===S.word.toLowerCase(),"Final guess: "+g,S.word);else if(send(S.hostConn,{type:"guess",guess:g})){$("guessInputRow").classList.add("hidden");txt("finalGuessInstruction","Guess submitted. Waiting for the result…")}else error("Connection lost","Your guess could not reach the host.")}
function finish(win,msg,w){if(!S.hostMode)return;stop();S.phase="finished";all({type:"finish",win,message:msg,word:w});finished(win,msg,w)}
function finished(win,msg,w){S.phase="finished";$("finalGuessArea").classList.add("hidden");$("finishedArea").classList.remove("hidden");$("onlineFinalResult").textContent=(win?"THE IMPOSTER WINS. ":"THE REAL PLAYERS WIN. ")+msg+" The word was “"+w+"”.";show("result")}
function again(){stop();S.game=false;S.phase="lobby";S.role="";S.word="";S.hint="";S.roles={};S.votes.clear();S.voteRound=0;S.selected=null;if(S.hostMode){S.players.forEach(p=>p.ready=p.isHost);sync()}show("lobby")}
function ready(){if(S.hostMode)return;const p=S.players.get(S.id);if(!p)return;const v=!p.ready;if(send(S.hostConn,{type:"ready",ready:v})){p.ready=v;lobby()}else error("Connection lost","Your ready status could not reach the host.")}
async function copy(){try{await navigator.clipboard.writeText(invite());$("copyRoomBtn").textContent="COPIED ✓";setTimeout(()=>$("copyRoomBtn").textContent="COPY INVITE",1400)}catch{txt("inviteLink",invite())}}
function create(){const n=name($("displayName").value);if(!n){alert("Enter your name first.");return}S.name=n;S.hostMode=true;S.settings={players:+$("onlinePlayerCount").value,category:$("onlineCategory").value,time:+$("onlineRoundTime").value};status("CONNECTING","CREATING PRIVATE ROOM","Connecting to the multiplayer service…");show("connecting");connectHost()}
function join(){const n=name($("displayName").value),h=peerIdFrom($("roomInput").value);if(!n){alert("Enter your name first.");return}if(!h){alert("Enter a valid 8-character room code or invite link.");return}S.name=n;S.hostMode=false;S.host=h;S.phase="connecting";status("CONNECTING","JOINING ROOM","Connecting to the host…");show("connecting");connectGuest(h)}
function init(){if(window.__impOnline)return;window.__impOnline=true;if(!window.Peer){error("Online multiplayer unavailable","The multiplayer library did not load. Refresh the page and try again.");return}mode(true);hostOnly(false);slider();$("onlinePlayerCount").oninput=slider;$("hostModeBtn").onclick=()=>mode(true);$("joinModeBtn").onclick=()=>mode(false);$("createRoomBtn").onclick=create;$("joinRoomBtn").onclick=join;$("copyRoomBtn").onclick=copy;$("readyBtn").onclick=ready;$("startOnlineBtn").onclick=start;$("continueRoleBtn").onclick=continueRole;$("endDiscussionBtn").onclick=()=>openVote();$("submitVoteBtn").onclick=submitVote;$("hostRevealBtn").onclick=resolve;$("finalGuessBtn").onclick=guess;$("playAgainBtn").onclick=again;$("leaveBtn").onclick=home;$("retryBtn").onclick=home;const h=peerIdFrom(location.href);if(h){$("roomInput").value=location.href;mode(false)}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();