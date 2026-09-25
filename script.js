const expand=(words,tags)=>{const tagList=Array.isArray(tags)?tags:String(tags).split("|").map(x=>x.trim()).filter(Boolean);return [...new Set([...words,...tagList.flatMap(t=>words.map(w=>t+" "+w))])].slice(0,205)};
const WORDS={
food:expand("Pizza|Sushi|Pancake|Popcorn|Hamburger|Taco|Spaghetti|Donut|Pretzel|Pineapple|Apple|Banana|Orange|Strawberry|Blueberry|Grape|Cherry|Peach|Pear|Mango|Coconut|Avocado|Tomato|Potato|Carrot|Broccoli|Cheese|Bacon|Chicken|Steak".split("|"),"Fresh|Spicy|Sweet|Savory|Crispy|Grilled|Baked|Fried|Frozen|Homemade|Cheesy|Chocolate|Fruit|Classic|Mini"),
animals:expand("Shark|Penguin|Elephant|Giraffe|Dolphin|Tiger|Octopus|Kangaroo|Butterfly|Crocodile|Owl|Panda|Lion|Leopard|Cheetah|Zebra|Gorilla|Monkey|Chimpanzee|Bear|Wolf|Fox|Coyote|Deer|Moose|Bison|Horse|Donkey|Rabbit|Squirrel".split("|"),"Wild|Baby|Giant|Tiny|Sea|Forest|Desert|Mountain|River|Arctic|Tropical|Domestic|Nocturnal|Flying|Striped"),
places:expand("Airport|Library|Beach|Museum|Castle|School|Hospital|Restaurant|Amusement park|Subway|Desert|Mountain|Park|Zoo|Aquarium|Stadium|Theater|Cinema|Mall|Hotel|Campground|Farm|Lighthouse|Harbor|Marina|Bridge|Tunnel|Bank|Church|Garden".split("|"),"Old|New|Central|City|Public|Local|Downtown|Historic|Famous|Hidden|Quiet|Busy|Main|Grand|National"),
objects:expand("Backpack|Umbrella|Guitar|Camera|Bicycle|Telescope|Toothbrush|Clock|Pencil|Mirror|Robot|Compass|Phone|Tablet|Laptop|Computer|Keyboard|Mouse|Monitor|Printer|Calculator|Notebook|Scissors|Hammer|Screwdriver|Wrench|Flashlight|Lantern|Candle|Balloon".split("|"),"Wooden|Metal|Plastic|Digital|Electric|Portable|Small|Large|New|Old|Handheld|Round|Square|Folding|Travel"),
activities:expand("Camping|Swimming|Dancing|Basketball|Fishing|Skateboarding|Cooking|Painting|Singing|Hiking|Bowling|Reading|Running|Walking|Jogging|Cycling|Surfing|Skiing|Snowboarding|Skating|Climbing|Diving|Rowing|Sailing|Golfing|Boxing|Wrestling|Archery|Soccer|Gaming".split("|"),"Indoor|Outdoor|Competitive|Team|Solo|Water|Winter|Summer|Creative|Physical|Social|Weekend|Morning|Evening|Group"),
nature:expand("Volcano|Rainbow|Thunderstorm|Snowflake|Ocean|Waterfall|Forest|Sunset|Tornado|Moon|Glacier|River|Mountain|Lake|Cloud|Rain|Snow|Wind|Lightning|Thunder|Hurricane|Fog|Hail|Sun|Star|Desert|Canyon|Valley|Meadow|Jungle".split("|"),"Green|Blue|Wild|Natural|Tropical|Arctic|Mountain|Coastal|Forest|Desert|Deep|Bright|Frozen|Rocky|Hidden"),
school:expand("Pencil|Textbook|Locker|Calculator|Backpack|Teacher|Cafeteria|Recess|Homework|Science lab|Gym|Library|Classroom|Desk|Chair|Whiteboard|Notebook|Binder|Folder|Ruler|Eraser|Scissors|Dictionary|Globe|Map|Microscope|Computer|Projector|Lunchbox|School bus".split("|"),"Elementary|Middle|High|Public|Private|Science|Math|Art|Music|Sports|Classroom|Study|College|Academic|Online"),
sports:expand("Soccer|Football|Baseball|Basketball|Tennis|Volleyball|Hockey|Golf|Boxing|Wrestling|Swimming|Diving|Surfing|Skiing|Snowboarding|Skateboarding|Cycling|Running|Gymnastics|Lacrosse|Cricket|Rugby|Badminton|Table tennis|Handball|Softball|Kickball|Dodgeball|Archery|Fencing".split("|"),"Pro|College|High school|Team|Individual|Indoor|Outdoor|Winter|Summer|Contact|Water|Field|Court|Championship|Professional"),
movies:expand("Cinema|Movie|Film|Actor|Actress|Director|Producer|Screenwriter|Camera|Screenplay|Script|Scene|Trailer|Premiere|Sequel|Prequel|Remake|Reboot|Villain|Hero|Superhero|Character|Costume|Soundtrack|Comedy|Drama|Horror|Thriller|Action|Adventure".split("|"),"Classic|New|Old|Action|Comedy|Horror|Romance|Animated|Science fiction|Fantasy|Mystery|Western|Musical|Indie|Superhero"),
jobs:expand("Doctor|Firefighter|Chef|Pilot|Farmer|Mechanic|Dentist|Teacher|Artist|Engineer|Police officer|Photographer|Nurse|Lawyer|Judge|Plumber|Electrician|Carpenter|Architect|Scientist|Programmer|Designer|Writer|Journalist|Actor|Musician|Coach|Barber|Cashier|Accountant".split("|"),"Full-time|Part-time|Senior|Junior|Local|Professional|Skilled|Medical|Creative|Technical|Public|Private|Office|Field|Remote"),
vehicles:expand("Car|Bus|Train|Airplane|Helicopter|Boat|Motorcycle|Bicycle|Submarine|Tractor|Ambulance|Firetruck|Police car|Taxi|Limousine|Van|Truck|Pickup|Minivan|SUV|Jeep|Racecar|Go-kart|Scooter|Moped|Sailboat|Yacht|Canoe|Kayak|Rocket".split("|"),"Electric|Gas|Racing|City|School|Cargo|Military|Private|Commercial|Luxury|Off-road|Compact|Heavy|Public|Emergency"),
technology:expand("Computer|Phone|Tablet|Laptop|Keyboard|Mouse|Monitor|Printer|Scanner|Camera|Microphone|Speaker|Headphones|Television|Radio|Console|Controller|Joystick|Server|Router|Modem|Wi-Fi|Internet|Website|App|Software|Hardware|Battery|Charger|Drone".split("|"),"Digital|Smart|Wireless|Mobile|Online|Virtual|Cloud|Secure|Portable|Personal|Home|Office|Gaming|Modern|Advanced"),
music:expand("Piano|Guitar|Violin|Cello|Viola|Bass|Drums|Trumpet|Trombone|Saxophone|Clarinet|Flute|Harmonica|Accordion|Banjo|Ukulele|Harp|Keyboard|Synthesizer|Microphone|Speaker|Headphones|Radio|Record|Concert|Singer|Musician|Band|Orchestra|Choir".split("|"),"Live|Acoustic|Electric|Classical|Jazz|Rock|Pop|Country|Folk|Digital|Studio|Concert|Solo|Band|Orchestral"),
drinks:expand("Water|Lemonade|Milkshake|Smoothie|Coffee|Tea|Soda|Hot chocolate|Juice|Milk|Slushie|Cocoa|Cola|Root beer|Ginger ale|Apple juice|Orange juice|Grape juice|Cranberry juice|Pineapple juice|Coconut water|Sparkling water|Iced tea|Sweet tea|Cider|Espresso|Latte|Cappuccino|Mocha|Matcha".split("|"),"Hot|Cold|Iced|Fresh|Sweet|Sparkling|Fruit|Berry|Citrus|Creamy|Frozen|Spiced|Homemade|Classic|Tropical"),
household:expand("Couch|Sofa|Chair|Table|Desk|Bed|Dresser|Nightstand|Bookshelf|Cabinet|Drawer|Shelf|Lamp|Fan|Television|Remote|Refrigerator|Freezer|Oven|Microwave|Toaster|Blender|Dishwasher|Sink|Faucet|Bathtub|Shower|Toilet|Mirror|Towel".split("|"),"Home|Kitchen|Bathroom|Bedroom|Living room|Wooden|Metal|Electric|Portable|Modern|Classic|Cleaning|Storage|Garden|Office"),
clothing:expand("Shirt|T-shirt|Blouse|Sweater|Hoodie|Jacket|Coat|Raincoat|Vest|Jeans|Pants|Shorts|Skirt|Dress|Suit|Tuxedo|Uniform|Pajamas|Underwear|Socks|Shoes|Sneakers|Boots|Sandals|Slippers|Hat|Cap|Beanie|Scarf|Gloves".split("|"),"Winter|Summer|Formal|Casual|Sports|School|Work|Outdoor|Warm|Light|Cotton|Wool|Leather|Denim|Rain"),
space:expand("Planet|Star|Sun|Moon|Mercury|Venus|Earth|Mars|Jupiter|Saturn|Uranus|Neptune|Pluto|Comet|Asteroid|Meteor|Meteorite|Galaxy|Nebula|Universe|Astronaut|Rocket|Spaceship|Spacecraft|Satellite|Space station|Telescope|Black hole|Eclipse|Constellation".split("|"),"Deep|Outer|Inner|Solar|Lunar|Stellar|Galactic|Cosmic|Interstellar|Orbital|Space|Alien|Distant|Ancient|Frozen"),
weather:expand("Rain|Snow|Wind|Cloud|Fog|Lightning|Thunder|Hurricane|Tornado|Hail|Sleet|Drizzle|Storm|Thunderstorm|Blizzard|Heatwave|Cold wave|Drought|Sunshine|Rainbow|Temperature|Thermometer|Humidity|Pressure|Breeze|Gust|Cyclone|Typhoon|Monsoon|Flood".split("|"),"Severe|Light|Heavy|Strong|Cold|Warm|Hot|Winter|Summer|Tropical|Coastal|Storm|Morning|Evening|Extreme"),
holidays:expand("Christmas|Halloween|Thanksgiving|Birthday|Easter|Valentine|New Year|Fireworks|Parade|Costume|Gift|Turkey|Pumpkin|Santa|Reindeer|Snowman|Stocking|Ornament|Wreath|Candy|Chocolate|Easter egg|Easter bunny|Party|Cake|Candles|Balloons|Confetti|Graduation|Wedding".split("|"),"Family|Holiday|Annual|Winter|Summer|Spring|Fall|National|Religious|School|Birthday|Festival|Community|Traditional|Special"),
};
WORDS.mixed=[...new Set(Object.keys(WORDS).filter(k=>k!=="mixed").flatMap(k=>WORDS[k]))];

const $ = id => document.getElementById(id);

const state = {
  players: 5, imposters: 1, category: "mixed", time: 90, timeLeft: 90,
  word: "", roles: [], current: 0, voted: null, timer: null, started: false
};

function el(id) { return document.getElementById(id); }

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const target = el(id);
  if (target) target.classList.add("active");
}

function updatePlayerCount() {
  const slider = el("playerCount");
  const label = el("playerCountLabel");
  if (!slider || !label) return;
  const value = Math.round(Number(slider.value));
  if (!Number.isFinite(value)) return;
  state.players = Math.max(3, Math.min(20, value));
  label.textContent = state.players;
}

function hintFor(word) {
  const hints = {
    shark:"Ocean",pizza:"Food",guitar:"Music",volcano:"Nature",library:"Books",
    basketball:"Sport",castle:"Fortress",watermelon:"Fruit",penguin:"Bird",
    elephant:"Large",dolphin:"Marine",tiger:"Striped",airport:"Travel",
    popcorn:"Movies",robot:"Machine",camping:"Outdoors",sushi:"Japanese",
    hamburger:"Food",taco:"Mexican",spaghetti:"Pasta",donut:"Sweet",
    pineapple:"Tropical",beach:"Sand",hospital:"Medicine",camera:"Photos",
    bicycle:"Wheels",telescope:"Stars",umbrella:"Rain",pencil:"Writing",
    mirror:"Reflection",compass:"Direction",swimming:"Water",dancing:"Music",
    fishing:"Fish",cooking:"Kitchen",painting:"Art",hiking:"Trails",
    soccer:"Sport",football:"Sport",baseball:"Sport",tennis:"Sport",
    hockey:"Sport",skiing:"Winter",surfing:"Ocean",cinema:"Movies",
    actor:"Movies",villain:"Movies",doctor:"Medicine",firefighter:"Emergency",
    chef:"Kitchen",pilot:"Flying",farmer:"Farming",car:"Vehicle",bus:"Transit",
    train:"Transit",airplane:"Flying",computer:"Technology",phone:"Technology",
    headphones:"Music",piano:"Music",drums:"Music",violin:"Music",concert:"Music",
    coffee:"Drink",lemonade:"Drink",smoothie:"Drink",water:"Drink",
    couch:"Furniture",lamp:"Lighting",refrigerator:"Kitchen",oven:"Kitchen",
    shirt:"Clothing",jeans:"Clothing",shoes:"Clothing",planet:"Space",
    star:"Space",astronaut:"Space",rocket:"Space",rain:"Weather",snow:"Weather",
    lightning:"Storm",christmas:"Holiday",halloween:"Holiday"
  };
  const text = String(word || "").toLowerCase();
  return hints[text] || hints[text.split(" ").pop()] || "General";
}

function shuffle(a) {
  for (let i=a.length-1;i>0;i--) {
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function startGame() {
  const slider=el("playerCount"), category=el("category"), roundTime=el("roundTime");
  if (!slider || !category || !roundTime) return;

  updatePlayerCount();
  state.players=Math.max(3,Math.min(20,Number(slider.value)||5));
  state.category=category.value||"mixed";
  state.time=Math.max(10,Number(roundTime.value)||90);
  state.timeLeft=state.time;
  state.current=0;
  state.voted=null;
  state.started=true;

  const pool=Array.isArray(WORDS[state.category])&&WORDS[state.category].length
    ? WORDS[state.category] : WORDS.mixed;
  state.word=pool[Math.floor(Math.random()*pool.length)];

  const maxImposters=Math.max(1,Math.floor(state.players/3));
  state.imposters=Math.floor(Math.random()*maxImposters)+1;
  state.roles=Array(state.players).fill(false);

  shuffle(Array.from({length:state.players},(_,i)=>i))
    .slice(0,state.imposters)
    .forEach(i=>state.roles[i]=true);

  el("passName").textContent="Player 1";
  el("passNumber").textContent="PLAYER 1";
  showScreen("pass");
}

function revealRole() {
  if (!state.started) return;
  const imposter=!!state.roles[state.current];
  el("roleIcon").textContent=imposter?"?":"✓";
  el("roleKicker").textContent=imposter?"YOU ARE":"THE SECRET WORD IS";
  el("roleTitle").textContent=imposter?"IMPOSTER":"YOU ARE A REAL PLAYER";
  el("wordBox").style.display=imposter?"none":"block";
  el("secretWord").textContent=state.word;
  el("roleHint").textContent=imposter
    ? "Hint: "+hintFor(state.word)+" — figure out the exact word."
    : "Describe the word without saying it directly.";
  showScreen("role");
}

function nextPlayer() {
  if (!state.started) return;
  state.current++;
  if (state.current<state.players) {
    el("passName").textContent="Player "+(state.current+1);
    el("passNumber").textContent="PLAYER "+(state.current+1);
    showScreen("pass");
  } else {
    startDiscussion();
  }
}

function renderTimer() {
  const seconds=Math.max(0,Math.floor(state.timeLeft));
  el("timer").textContent=Math.floor(seconds/60)+":"+String(seconds%60).padStart(2,"0");
}

function startDiscussion() {
  clearInterval(state.timer);
  state.timeLeft=state.time;
  renderTimer();
  showScreen("play");
  state.timer=setInterval(()=>{
    state.timeLeft--;
    renderTimer();
    if(state.timeLeft<=0) showVoting();
  },1000);
}

function showVoting() {
  clearInterval(state.timer);
  state.timer=null;
  state.voted=null;
  const grid=el("voteGrid"), reveal=el("revealBtn");
  if(!grid||!reveal)return;
  grid.replaceChildren();
  reveal.disabled=true;
  for(let i=0;i<state.players;i++){
    const b=document.createElement("button");
    b.type="button"; b.className="vote-btn"; b.textContent="Player "+(i+1);
    b.addEventListener("click",()=>{
      grid.querySelectorAll(".vote-btn").forEach(x=>x.classList.remove("selected"));
      b.classList.add("selected"); state.voted=i; reveal.disabled=false;
    });
    grid.appendChild(b);
  }
  showScreen("vote");
}

function revealVote() {
  if(state.voted===null)return;
  const caught=!!state.roles[state.voted];
  el("votedPlayer").textContent="PLAYER "+(state.voted+1);
  el("resultMessage").innerHTML=caught?"<strong>They were an IMPOSTER.</strong>":"<strong>They were NOT an imposter.</strong>";
  el("imposterWinActions").classList.toggle("hidden",!caught);
  el("guessResult").classList.add("hidden");
  el("guessInput").value="";
  el("nextRoundBtn").classList.toggle("hidden",caught);
  showScreen("reveal");
}

function submitGuess() {
  const input=el("guessInput"), result=el("guessResult");
  if(!input)return;
  const guess=input.value.trim();
  if(!guess){input.focus();return;}
  el("imposterWinActions").classList.add("hidden");
  result.classList.remove("hidden");
  result.textContent=guess.toLowerCase()===String(state.word).toLowerCase()
    ?"🎯 Correct! The imposter wins the round."
    :"❌ Wrong! The real players win. The word was “"+state.word+"”.";
  el("nextRoundBtn").classList.remove("hidden");
}

function resetGame() {
  clearInterval(state.timer);
  state.timer=null; state.started=false; state.roles=[]; state.word=""; state.current=0;
  showScreen("setup"); updatePlayerCount();
}

function bindGame() {
  const slider=el("playerCount");
  const start=el("startBtn");
  if(!slider||!start) throw new Error("Game controls are missing from the page.");

  const syncSlider = () => {
    const value = Number(slider.value);
    if (!Number.isFinite(value)) return;
    state.players = Math.max(3, Math.min(20, Math.round(value)));
    el("playerCountLabel").textContent = String(state.players);
  };
  slider.addEventListener("input", syncSlider, {passive:true});
  slider.addEventListener("change", syncSlider, {passive:true});
  slider.addEventListener("pointermove", syncSlider, {passive:true});
  slider.addEventListener("keydown", syncSlider);
  slider.addEventListener("keyup", syncSlider);
  start.addEventListener("click",startGame);
  el("readyBtn").addEventListener("click",revealRole);
  el("hideRoleBtn").addEventListener("click",nextPlayer);
  el("finishDiscussionBtn").addEventListener("click",showVoting);
  el("revealBtn").addEventListener("click",revealVote);
  el("guessBtn").addEventListener("click",submitGuess);
  el("nextRoundBtn").addEventListener("click",resetGame);
  el("resetBtn").addEventListener("click",resetGame);
  updatePlayerCount();
  slider.value = String(state.players);
}

function boot() {
  try { bindGame(); }
  catch(e) {
    console.error("Imposter startup failed:",e);
    const setup=el("setup");
    if(setup) {
      const msg=document.createElement("p");
      msg.textContent="Game failed to start: "+e.message;
      msg.style.cssText="color:#ff475f;font-weight:800;padding:12px";
      setup.appendChild(msg);
    }
  }
}

if(document.readyState==="loading") {
  document.addEventListener("DOMContentLoaded",boot,{once:true});
} else {
  boot();
}
