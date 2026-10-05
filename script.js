(function(){
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
window.IMPOSTER_WORDS=WORDS;

const $ = id => document.getElementById(id);

const state = {
  players: 5, imposters: 1, category: "mixed", time: 90, timeLeft: 90,
  word: "", roles: [], current: 0, voted: null, timer: null, started: false,
  playerNames: []
};

function el(id) { return document.getElementById(id); }

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const target = el(id);
  if (target) target.classList.add("active");
}

function renderPlayerNameInputs(count) {
  const container=el("nameInputs"), section=el("playerNamesSection"), countLabel=el("namesCount");
  if(!container)return;
  const previous=[...state.playerNames];
  state.playerNames=Array.from({length:count},(_,i)=>{
    return String(previous[i]||"");
  });
  container.replaceChildren();
  for(let i=0;i<count;i++){
    const wrap=document.createElement("div");
    wrap.className="name-field";
    const label=document.createElement("label");
    label.htmlFor="playerName"+i;
    label.textContent="Player "+(i+1);
    const input=document.createElement("input");
    input.id="playerName"+i;
    input.type="text";
    input.maxLength=24;
    input.autocomplete="off";
    input.placeholder="Enter name";
    input.value=state.playerNames[i];
    input.addEventListener("input",()=>{
      state.playerNames[i]=input.value;
      const error=el("nameError");
      if(error)error.textContent="";
    });
    wrap.appendChild(label);
    wrap.appendChild(input);
    container.appendChild(wrap);
  }
  if(countLabel)countLabel.textContent=count+" player"+(count===1?"":"s");
  if(section)section.classList.remove("hidden");
}

function updatePlayerCount() {
  const slider = el("playerCount");
  const label = el("playerCountLabel");
  if (!slider || !label) return;
  const value = Math.round(Number(slider.value));
  if (!Number.isFinite(value)) return;
  state.players = Math.max(3, Math.min(20, value));
  label.textContent = state.players;
  renderPlayerNameInputs(state.players);
}

function hintFor(word) {
  const hints = {
    pizza:"Cheese",sushi:"Rice",pancake:"Syrup",popcorn:"Kernel",hamburger:"Patty",taco:"Shell",spaghetti:"Noodles",donut:"Glaze",pretzel:"Twist",pineapple:"Crown",apple:"Orchard",banana:"Peel",orange:"Citrus",strawberry:"Berry",blueberry:"Berry",grape:"Vine",cherry:"Pit",peach:"Fuzzy",pear:"Teardrop",mango:"Tropical",coconut:"Palm",avocado:"Guacamole",tomato:"Sauce",potato:"Tuber",carrot:"Root",broccoli:"Floret",cheese:"Dairy",bacon:"Crispy",chicken:"Poultry",steak:"Beef",
    shark:"Fins",penguin:"Antarctica",elephant:"Trunk",giraffe:"Neck",dolphin:"Echolocation",tiger:"Stripes",octopus:"Tentacles",kangaroo:"Pouch",butterfly:"Wings",crocodile:"Snout",owl:"Hoot",panda:"Bamboo",lion:"Mane",leopard:"Spots",cheetah:"Speed",zebra:"Stripes",gorilla:"Ape",monkey:"Primate",chimpanzee:"Ape",bear:"Hibernation",wolf:"Howl",fox:"Den",coyote:"Howl",deer:"Antlers",moose:"Antlers",bison:"Herd",horse:"Hooves",donkey:"Braying",rabbit:"Burrow",squirrel:"Acorn",
    airport:"Runway",library:"Books",beach:"Sand",museum:"Exhibits",castle:"Moat",school:"Students",hospital:"Doctors",restaurant:"Menu","amusement park":"Rides",subway:"Tracks",desert:"Dunes",mountain:"Summit",park:"Grass",zoo:"Animals",aquarium:"Fish",stadium:"Bleachers",theater:"Stage",cinema:"Screen",mall:"Stores",hotel:"Rooms",campground:"Tents",farm:"Crops",lighthouse:"Beacon",harbor:"Ships",marina:"Boats",bridge:"Span",tunnel:"Underground",bank:"Money",church:"Steeple",garden:"Flowers",
    backpack:"Straps",umbrella:"Canopy",guitar:"Strings",camera:"Lens",bicycle:"Pedals",telescope:"Eyepiece",toothbrush:"Bristles",clock:"Hands",pencil:"Graphite",mirror:"Reflection",robot:"Automation",compass:"North",phone:"Screen",tablet:"Touchscreen",laptop:"Keyboard",computer:"Processor",keyboard:"Keys",mouse:"Cursor",monitor:"Display",printer:"Ink",calculator:"Arithmetic",notebook:"Pages",scissors:"Blades",hammer:"Nail",screwdriver:"Screw",wrench:"Bolts",flashlight:"Beam",lantern:"Glow",candle:"Wax",balloon:"Air",
    camping:"Tent",swimming:"Pool",dancing:"Rhythm",basketball:"Hoop",fishing:"Bait",skateboarding:"Deck",cooking:"Recipe",painting:"Canvas",singing:"Voice",hiking:"Trail",bowling:"Pins",reading:"Books",running:"Jogging",walking:"Steps",jogging:"Running",cycling:"Pedals",surfing:"Waves",skiing:"Slopes",snowboarding:"Board",skating:"Ice",climbing:"Rope",diving:"Depth",rowing:"Oars",sailing:"Sails",golfing:"Clubs",boxing:"Gloves",wrestling:"Mat",archery:"Arrows",soccer:"Goal",gaming:"Controller",
    volcano:"Lava",rainbow:"Prism",thunderstorm:"Lightning",snowflake:"Crystal",ocean:"Waves",waterfall:"Cascade",forest:"Trees",sunset:"Horizon",tornado:"Funnel",moon:"Crater",glacier:"Ice",river:"Current",lake:"Shore",cloud:"Sky",rain:"Drops",snow:"Flakes",wind:"Breeze",lightning:"Bolt",thunder:"Boom",hurricane:"Spiral",fog:"Mist",hail:"Ice",sun:"Heat",star:"Twinkle",desert:"Dunes",canyon:"Cliffs",valley:"Basin",meadow:"Grass",jungle:"Vines",
    pencil:"Graphite",textbook:"Lessons",locker:"Combination",calculator:"Arithmetic",backpack:"Straps",teacher:"Lessons",cafeteria:"Lunch",recess:"Playground",homework:"Assignments","science lab":"Experiments",gym:"Exercise",library:"Books",classroom:"Desks",desk:"Workspace",chair:"Seat",whiteboard:"Marker",notebook:"Pages",binder:"Rings",folder:"Papers",ruler:"Inches",eraser:"Rubber",scissors:"Blades",dictionary:"Definitions",globe:"Earth",map:"Directions",microscope:"Magnification",computer:"Processor",projector:"Screen",lunchbox:"Lunch","school bus":"Yellow",
    soccer:"Goal",football:"Touchdown",baseball:"Diamond",basketball:"Hoop",tennis:"Racket",volleyball:"Net",hockey:"Puck",golf:"Fairway",boxing:"Ring",wrestling:"Mat",swimming:"Pool",diving:"Springboard",surfing:"Waves",skiing:"Slopes",snowboarding:"Board",skateboarding:"Deck",cycling:"Pedals",running:"Track",gymnastics:"Balance",lacrosse:"Stick",cricket:"Wicket",rugby:"Try",badminton:"Shuttlecock","table tennis":"Paddle",handball:"Goal",softball:"Glove",kickball:"Ball",dodgeball:"Throws",archery:"Arrows",fencing:"Foil",
    cinema:"Screen",movie:"Plot",film:"Screen",actor:"Performance",actress:"Performance",director:"Camera",producer:"Studio",screenwriter:"Script",camera:"Lens",screenplay:"Dialogue",script:"Dialogue",scene:"Shot",trailer:"Preview",premiere:"Debut",sequel:"Followup",prequel:"Origin",remake:"Retelling",reboot:"Restart",villain:"Antagonist",hero:"Protagonist",superhero:"Cape",character:"Role",costume:"Outfit",soundtrack:"Music",comedy:"Laughs",drama:"Conflict",horror:"Fear",thriller:"Suspense",action:"Stunts",adventure:"Quest",
    doctor:"Medicine",firefighter:"Hose",chef:"Kitchen",pilot:"Cockpit",farmer:"Crops",mechanic:"Engine",dentist:"Teeth",teacher:"Classroom",artist:"Canvas",engineer:"Blueprints",police officer:"Badge",photographer:"Camera",nurse:"Patients",lawyer:"Court",judge:"Gavel",plumber:"Pipes",electrician:"Wiring",carpenter:"Wood",architect:"Blueprints",scientist:"Experiments",programmer:"Code",designer:"Layouts",writer:"Words",journalist:"News",actor:"Stage",musician:"Instrument",coach:"Team",barber:"Hair",cashier:"Register",accountant:"Numbers",
    car:"Wheels",bus:"Transit",train:"Tracks",airplane:"Wings",helicopter:"Rotor",boat:"Water",motorcycle:"Helmet",bicycle:"Pedals",submarine:"Depth",tractor:"Farm",ambulance:"Emergency",firetruck:"Ladder","police car":"Siren",taxi:"Fare",limousine:"Chauffeur",van:"Cargo",truck:"Hauling",pickup:"Bed",minivan:"Family",suv:"Offroad",jeep:"Trail",racecar:"Speed","go-kart":"Track",scooter:"Handlebars",moped:"Small",sailboat:"Mast",yacht:"Luxury",canoe:"Paddle",kayak:"Paddle",rocket:"Launch",
    computer:"Processor",phone:"Screen",tablet:"Touchscreen",laptop:"Keyboard",keyboard:"Keys",mouse:"Cursor",monitor:"Display",printer:"Ink",scanner:"Document",camera:"Lens",microphone:"Audio",speaker:"Sound",headphones:"Earcups",television:"Screen",radio:"Broadcast",console:"Gaming",controller:"Buttons",joystick:"Stick",server:"Data",router:"Network",modem:"Internet","wi-fi":"Wireless",internet:"Web",website:"Pages",app:"Software",software:"Programs",hardware:"Components",battery:"Power",charger:"Cable",drone:"Propellers",
    piano:"Keys",guitar:"Strings",violin:"Bow",cello:"Bow",viola:"Strings",bass:"Low",drums:"Percussion",trumpet:"Brass",trombone:"Slide",saxophone:"Reed",clarinet:"Reed",flute:"Blowing",harmonica:"Reeds",accordion:"Bellows",banjo:"Strings",ukulele:"Hawaii",harp:"Strings",keyboard:"Keys",synthesizer:"Electronic",microphone:"Vocals",speaker:"Audio",headphones:"Earcups",radio:"Broadcast",record:"Vinyl",concert:"Live",singer:"Vocals",musician:"Instrument",band:"Group",orchestra:"Ensemble",choir:"Voices",
    water:"Hydration",lemonade:"Lemon",milkshake:"Creamy",smoothie:"Blended",coffee:"Caffeine",tea:"Leaves",soda:"Fizz","hot chocolate":"Cocoa",juice:"Fruit",milk:"Dairy",slushie:"Ice",cocoa:"Chocolate",cola:"Fizz","root beer":"Soda","ginger ale":"Ginger","apple juice":"Apple","orange juice":"Citrus","grape juice":"Grape","cranberry juice":"Berry","pineapple juice":"Tropical","coconut water":"Palm","sparkling water":"Bubbles","iced tea":"Cold","sweet tea":"Sugar",cider:"Apple",espresso:"Shot",latte:"Foam",cappuccino:"Foam",mocha:"Chocolate",matcha:"Green",
    couch:"Cushions",sofa:"Cushions",chair:"Seat",table:"Surface",desk:"Workspace",bed:"Mattress",dresser:"Drawers",nightstand:"Bedside",bookshelf:"Books",cabinet:"Storage",drawer:"Handle",shelf:"Storage",lamp:"Light",fan:"Blades",television:"Screen",remote:"Buttons",refrigerator:"Cooling",freezer:"Frozen",oven:"Baking",microwave:"Radiation",toaster:"Bread",blender:"Blades",dishwasher:"Plates",sink:"Drain",faucet:"Water",bathtub:"Soak",shower:"Spray",toilet:"Flush",mirror:"Reflection",towel:"Drying",
    shirt:"Fabric","t-shirt":"Casual",blouse:"Collar",sweater:"Knit",hoodie:"Hood",jacket:"Zipper",coat:"Warmth",raincoat:"Waterproof",vest:"Sleeveless",jeans:"Denim",pants:"Waist",shorts:"Summer",skirt:"Hem",dress:"Formal",suit:"Jacket",tuxedo:"Formal",uniform:"Standard",pajamas:"Sleep",underwear:"Layer",socks:"Feet",shoes:"Laces",sneakers:"Athletic",boots:"Leather",sandals:"Straps",slippers:"Indoor",hat:"Head",cap:"Brim",beanie:"Knit",scarf:"Neck",gloves:"Hands",
    planet:"Orbit",star:"Fusion",sun:"Solar",moon:"Crater",mercury:"Planet",venus:"Clouds",earth:"Home",mars:"Red",jupiter:"Giant",saturn:"Rings",uranus:"Tilted",neptune:"Blue",pluto:"Dwarf",comet:"Tail",asteroid:"Rock",meteor:"Shooting",meteorite:"Impact",galaxy:"Spiral",nebula:"Gas",universe:"Cosmos",astronaut:"Spacesuit",rocket:"Launch",spaceship:"Crew",spacecraft:"Mission",satellite:"Orbit","space station":"ISS",telescope:"Stars","black hole":"Gravity",eclipse:"Shadow",constellation:"Pattern",
    rain:"Drops",snow:"Flakes",wind:"Breeze",cloud:"Sky",fog:"Mist",lightning:"Bolt",thunder:"Boom",hurricane:"Spiral",tornado:"Funnel",hail:"Ice",sleet:"Ice",drizzle:"Light",storm:"Clouds",thunderstorm:"Lightning",blizzard:"Whiteout",heatwave:"Summer","cold wave":"Freeze",drought:"Dryness",sunshine:"Light",rainbow:"Prism",temperature:"Degrees",thermometer:"Mercury",humidity:"Moisture",pressure:"Barometer",breeze:"Gentle",gust:"Strong",cyclone:"Spiral",typhoon:"Pacific",monsoon:"Season",flood:"Water",
    christmas:"Santa",halloween:"Costume",thanksgiving:"Turkey",birthday:"Cake",easter:"Egg",valentine:"Heart","new year":"Midnight",fireworks:"Explosions",parade:"Marching",costume:"Disguise",gift:"Present",turkey:"Thanksgiving",pumpkin:"Gourd",santa:"Reindeer",reindeer:"Antlers",snowman:"Carrot",stocking:"Mantel",ornament:"Tree",wreath:"Door",candy:"Sugar",chocolate:"Cocoa","easter egg":"Shell","easter bunny":"Rabbit",party:"Guests",cake:"Frosting",candles:"Flame",balloons:"Air",confetti:"Paper",graduation:"Diploma",wedding:"Rings"
  };
  const text=String(word||"").toLowerCase().trim();
  if(hints[text])return hints[text];
  const parts=text.split(" ");
  for(let i=parts.length;i>0;i--){
    const base=parts.slice(0,i).join(" ");
    if(hints[base])return hints[base];
  }
  const categoryHints={food:"Ingredient",animals:"Habitat",places:"Location",objects:"Material",activities:"Equipment",nature:"Element",school:"Learning",sports:"Equipment",movies:"Cinema",jobs:"Work",vehicles:"Transport",technology:"Device",music:"Sound",drinks:"Flavor",household:"Furniture",clothing:"Fabric",space:"Astronomy",weather:"Forecast",holidays:"Tradition",mixed:"Category"};
  return categoryHints[state?.category]||"Category";
}
window.IMPOSTER_HINT_FOR=hintFor;

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
  const names=Array.from({length:state.players},(_,i)=>String(state.playerNames[i]||"").trim());
  const error=el("nameError");
  if(names.some(name=>!name)){
    if(error)error.textContent="Enter a name for every player before starting.";
    const firstEmpty=names.findIndex(name=>!name);
    const firstInput=el("playerName"+firstEmpty);
    if(firstInput)firstInput.focus();
    return;
  }
  const normalized=names.map(name=>name.toLowerCase());
  const duplicates=new Set(normalized.filter((name,i)=>normalized.indexOf(name)!==i));
  if(duplicates.size){
    if(error)error.textContent="Each player needs a different name.";
    const duplicateIndex=normalized.findIndex((name,i)=>normalized.indexOf(name)!==i);
    const duplicateInput=el("playerName"+duplicateIndex);
    if(duplicateInput)duplicateInput.focus();
    return;
  }
  state.playerNames=names;
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

  el("passName").textContent=state.playerNames[0];
  el("passNumber").textContent=state.playerNames[0].toUpperCase();
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
    el("passName").textContent=state.playerNames[state.current];
    el("passNumber").textContent=state.playerNames[state.current].toUpperCase();
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
    b.type="button"; b.className="vote-btn"; b.textContent=state.playerNames[i];
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
  el("votedPlayer").textContent=String(state.playerNames[state.voted]||("Player "+(state.voted+1))).toUpperCase();
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

  const syncSlider = () => updatePlayerCount();
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
  if (!el("playerCount") || !el("startBtn")) return;
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

})();
