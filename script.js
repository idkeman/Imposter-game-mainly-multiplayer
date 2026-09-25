const expand=(words,tags)=>[...new Set([...words,...tags.flatMap(t=>words.map(w=>t+" "+w))])].slice(0,205);
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
WORDS.mixed=[...new Set(Object.keys(WORDS).flatMap(k=>WORDS[k]))];Object.keys(WORDS).filter(k=>k!=="mixed").forEach(k=>WORDS.mixed.push(...WORDS[k]));
const $ = id => document.getElementById(id);

const state = {
  players: 5,
  imposters: 1,
  category: "mixed",
  time: 90,
  word: "",
  roles: [],
  current: 0,
  voted: null,
  timer: null,
  timeLeft: 0
};

const screens = ["setup","pass","role","play","vote","reveal"];

function show(id) {
  screens.forEach(screen => {
    const el = $(screen);
    if (el) el.classList.toggle("active", screen === id);
  });
  window.scrollTo(0, 0);
}

function getImposterHint(word) {
  const hints = {
    volcano:"Nature", pancake:"Breakfast", library:"Books", shark:"Ocean",
    airport:"Travel", basketball:"Sport", rainbow:"Sky", popcorn:"Movies",
    robot:"Machine", castle:"Fortress", camping:"Outdoors", guitar:"Music",
    subway:"Transit", watermelon:"Fruit", fireworks:"Celebration", sushi:"Japanese",
    hamburger:"Food", "ice cream":"Dessert", taco:"Mexican", spaghetti:"Pasta",
    donut:"Sweet", pretzel:"Snack", pineapple:"Tropical", penguin:"Bird",
    elephant:"Large", giraffe:"Tall", dolphin:"Marine", tiger:"Striped",
    octopus:"Tentacles", kangaroo:"Hopping", butterfly:"Insect", crocodile:"Reptile",
    owl:"Night", panda:"Bear", beach:"Sand", hospital:"Medicine", restaurant:"Dining",
    desert:"Dry", mountain:"Climbing", backpack:"School", umbrella:"Rain",
    camera:"Photos", bicycle:"Wheels", telescope:"Stars", toothbrush:"Teeth",
    clock:"Time", pencil:"Writing", mirror:"Reflection", compass:"Direction",
    swimming:"Water", dancing:"Music", fishing:"Fish", skateboarding:"Wheels",
    cooking:"Kitchen", painting:"Art", singing:"Voice", hiking:"Trails",
    bowling:"Pins", reading:"Books", thunderstorm:"Lightning", snowflake:"Winter",
    ocean:"Water", waterfall:"Nature", forest:"Trees", sunset:"Evening",
    tornado:"Storm", moon:"Night", glacier:"Ice", river:"Water", textbook:"School",
    locker:"Storage", calculator:"Math", teacher:"School", cafeteria:"Food",
    recess:"Break", homework:"School", "science lab":"Science", gym:"Exercise",
    soccer:"Sport", football:"Sport", baseball:"Sport", tennis:"Sport",
    volleyball:"Sport", hockey:"Sport", golf:"Sport", boxing:"Sport",
    wrestling:"Sport", surfing:"Ocean", skiing:"Winter", archery:"Target",
    cinema:"Movies", director:"Movies", actor:"Movies", villain:"Movies",
    hero:"Movies", sequel:"Movies", trailer:"Movies", costume:"Clothing",
    script:"Writing", scene:"Movies", premiere:"Movies", doctor:"Medicine",
    firefighter:"Emergency", chef:"Kitchen", pilot:"Flying", farmer:"Farming",
    mechanic:"Repair", dentist:"Teeth", artist:"Art", engineer:"Building",
    "police officer":"Law", photographer:"Photos", car:"Vehicle", bus:"Transit",
    train:"Transit", airplane:"Flying", helicopter:"Flying", boat:"Water",
    motorcycle:"Wheels", submarine:"Ocean", tractor:"Farming", ambulance:"Emergency",
    rocket:"Space", computer:"Technology", phone:"Technology", tablet:"Technology",
    keyboard:"Typing", mouse:"Computer", internet:"Online", battery:"Power",
    headphones:"Music", printer:"Paper", console:"Gaming", website:"Online",
    password:"Security", piano:"Music", drums:"Music", violin:"Music",
    trumpet:"Music", flute:"Music", microphone:"Music", concert:"Music",
    singer:"Music", melody:"Music", rhythm:"Music", playlist:"Music",
    water:"Drink", lemonade:"Drink", milkshake:"Drink", smoothie:"Drink",
    coffee:"Drink", tea:"Drink", soda:"Drink", "hot chocolate":"Drink",
    juice:"Drink", milk:"Drink", slushie:"Drink", cocoa:"Drink", couch:"Furniture",
    lamp:"Lighting", refrigerator:"Kitchen", oven:"Kitchen", pillow:"Bedroom",
    blanket:"Bedding", vacuum:"Cleaning", broom:"Cleaning", spoon:"Kitchen",
    plate:"Kitchen", towel:"Bathroom", shower:"Bathroom", shirt:"Clothing",
    jeans:"Clothing", jacket:"Clothing", hat:"Clothing", shoes:"Clothing",
    socks:"Clothing", dress:"Clothing", gloves:"Clothing", scarf:"Clothing",
    boots:"Clothing", shorts:"Clothing", sweater:"Clothing", planet:"Space",
    star:"Space", comet:"Space", asteroid:"Space", galaxy:"Space",
    astronaut:"Space", sun:"Space", satellite:"Space", spaceship:"Space",
    "black hole":"Space", rain:"Weather", snow:"Weather", wind:"Weather",
    cloud:"Weather", fog:"Weather", lightning:"Storm", thunder:"Storm",
    hurricane:"Storm", heatwave:"Heat", hail:"Weather", christmas:"Holiday",
    halloween:"Holiday", thanksgiving:"Holiday", birthday:"Celebration",
    easter:"Holiday", valentine:"Love", parade:"Celebration", gift:"Present",
    turkey:"Holiday", pumpkin:"Halloween"
  };
  return hints[String(word).toLowerCase()] ||
    ({food:"Food",animals:"Animal",places:"Place",objects:"Object",
      activities:"Activity",nature:"Nature",school:"School",sports:"Sport",
      movies:"Movies",jobs:"Work",vehicles:"Vehicle",technology:"Technology",
      music:"Music",drinks:"Drink",household:"Home",clothing:"Clothing",
      space:"Space",weather:"Weather",holidays:"Holiday",mixed:"General"}[state.category] || "General");
}

function updatePlayerCount() {
  const slider = $("playerCount");
  const label = $("playerCountLabel");
  if (!slider || !label) return;
  const value = Math.max(3, Math.min(20, Number(slider.value) || 5));
  slider.value = String(value);
  label.textContent = String(value);
}

function startGame() {
  const slider = $("playerCount");
  const category = $("category");
  const roundTime = $("roundTime");
  if (!slider || !category || !roundTime) return;

  state.players = Math.max(3, Math.min(20, Number(slider.value) || 5));
  state.imposters = Math.max(1, Math.floor(Math.random() * Math.max(1, Math.floor(state.players / 3))) + 1);
  state.category = WORDS[category.value] ? category.value : "mixed";
  state.time = Math.max(30, Number(roundTime.value) || 90);

  const list = WORDS[state.category] || WORDS.mixed;
  state.word = list[Math.floor(Math.random() * list.length)];
  state.roles = Array(state.players).fill(false);

  const ids = Array.from({length: state.players}, (_, i) => i);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  ids.slice(0, state.imposters).forEach(i => state.roles[i] = true);

  state.current = 0;
  $("passName").textContent = "Player 1";
  $("passNumber").textContent = "PLAYER 1";
  show("pass");
}

function revealRole() {
  const imp = !!state.roles[state.current];
  $("roleIcon").textContent = imp ? "?" : "✓";
  $("roleKicker").textContent = imp ? "YOU ARE" : "THE SECRET WORD IS";
  $("roleTitle").textContent = imp ? "IMPOSTER" : "YOU ARE A REAL PLAYER";
  $("wordBox").style.display = imp ? "none" : "block";
  $("secretWord").textContent = state.word;
  $("roleHint").textContent = imp
    ? "Hint: " + getImposterHint(state.word) + " — Blend in, listen carefully, and figure out the exact word."
    : "Describe the word without saying it or giving away too much.";
  show("role");
}

function passRole() {
  state.current++;
  if (state.current < state.players) {
    $("passName").textContent = "Player " + (state.current + 1);
    $("passNumber").textContent = "PLAYER " + (state.current + 1);
    show("pass");
  } else {
    startDiscussion();
  }
}

function updateTimer() {
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;
  $("timer").textContent = minutes + ":" + String(seconds).padStart(2, "0");
}

function startDiscussion() {
  clearInterval(state.timer);
  state.timeLeft = state.time;
  updateTimer();
  show("play");
  state.timer = setInterval(() => {
    state.timeLeft--;
    updateTimer();
    if (state.timeLeft <= 0) showVote();
  }, 1000);
}

function showVote() {
  clearInterval(state.timer);
  const grid = $("voteGrid");
  grid.innerHTML = "";
  state.voted = null;
  $("revealBtn").disabled = true;

  for (let i = 0; i < state.players; i++) {
    const button = document.createElement("button");
    button.className = "vote-btn";
    button.textContent = "Player " + (i + 1);
    button.type = "button";
    button.addEventListener("click", () => {
      document.querySelectorAll(".vote-btn").forEach(b => b.classList.remove("selected"));
      button.classList.add("selected");
      state.voted = i;
      $("revealBtn").disabled = false;
    });
    grid.appendChild(button);
  }
  show("vote");
}

function revealVote() {
  if (state.voted === null) return;
  const isImp = !!state.roles[state.voted];
  $("votedPlayer").textContent = "PLAYER " + (state.voted + 1);
  $("resultMessage").innerHTML = isImp
    ? "<strong>They were an IMPOSTER.</strong>"
    : "<strong>They were NOT an imposter.</strong>";
  $("imposterWinActions").classList.toggle("hidden", !isImp);
  $("guessResult").classList.add("hidden");
  $("guessInput").value = "";
  $("nextRoundBtn").classList.toggle("hidden", isImp);
  show("reveal");
}

function submitGuess() {
  const guess = $("guessInput").value.trim();
  if (!guess) return;
  $("guessResult").classList.remove("hidden");
  $("imposterWinActions").classList.add("hidden");
  $("guessResult").textContent = guess.toLowerCase() === String(state.word).toLowerCase()
    ? "🎯 Correct! The imposter wins the round."
    : "❌ Wrong! The real players win. The word was “" + state.word + "”.";
  $("nextRoundBtn").classList.remove("hidden");
}

function bindGame() {
  const slider = $("playerCount");
  if (slider) {
    slider.addEventListener("input", updatePlayerCount);
    slider.addEventListener("change", updatePlayerCount);
    slider.addEventListener("pointermove", event => {
      if (event.buttons) updatePlayerCount();
    });
  }

  $("startBtn").addEventListener("click", startGame);
  $("readyBtn").addEventListener("click", revealRole);
  $("hideRoleBtn").addEventListener("click", passRole);
  $("finishDiscussionBtn").addEventListener("click", showVote);
  $("revealBtn").addEventListener("click", revealVote);
  $("guessBtn").addEventListener("click", submitGuess);
  $("nextRoundBtn").addEventListener("click", () => show("setup"));
  $("resetBtn").addEventListener("click", () => {
    clearInterval(state.timer);
    state.timer = null;
    show("setup");
    updatePlayerCount();
  });

  updatePlayerCount();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bindGame);
} else {
  bindGame();
}
