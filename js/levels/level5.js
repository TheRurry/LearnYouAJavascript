//test is just a little hint of how to add stuff

var game = new Phaser.Game(700, 600, Phaser.AUTO, 'gameUI', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('spaceship', 'js/levels/assets/player_ship.png');
    game.load.image('collectable', 'js/levels/assets/collectable2.png');
    game.load.image('planet', 'js/levels/assets/planet2.png');
    game.load.image('stars', 'js/levels/assets/starmap.png');
    game.load.image('test', 'js/levels/assets/obs.png');
    game.load.image('testo', 'js/levels/assets/obsh.png');
    game.load.image('hole', 'js/levels/assets/warmhole.png');
}
var walls;
var player;
var move;
var temp;

var collectable;
var relics;

var wormhole1;
var wormhole2;

var completed = 0;
var goal = 3; //change this to amount of collectables in level.

var speed = 0.2;
var initialX = 350;
var initialY = 500;

function create() {
    // Background
    game.add.image(game.world.centerX, game.world.centerY, 'stars').anchor.set(0.5);
    game.add.image(250, 300, 'planet').anchor.set(0.5);

    // Player
    player = game.add.sprite(initialX, initialY, 'spaceship');
    player.anchor.setTo(0.5, 0.5);
    player.scale.setTo(0.07, 0.07);
    move = game.add.tween(player);

    relics = game.add.group();

    //Collectable
    collectable = game.add.sprite(350, 390, 'collectable');
    collectable.anchor.setTo(0.5, 0.5);
    collectable.enableBody = true;
    collectable.scale.setTo(0.07, 0.07);
    relics.add(collectable);

    //Collectable
    collectable = game.add.sprite(450, 280, 'collectable');
    collectable.anchor.setTo(0.5, 0.5);
    collectable.enableBody = true;
    collectable.scale.setTo(0.07, 0.07);
    relics.add(collectable);

    //Collectable
    collectable = game.add.sprite(250, 190, 'collectable');
    collectable.anchor.setTo(0.5, 0.5);
    collectable.enableBody = true;
    collectable.scale.setTo(0.07, 0.07);
    relics.add(collectable);

    //Collectable
    collectable = game.add.sprite(150, 80, 'collectable');
    collectable.anchor.setTo(0.5, 0.5);
    collectable.enableBody = true;
    collectable.scale.setTo(0.07, 0.07);
    relics.add(collectable);

    //Collectable
    collectable = game.add.sprite(450, 190, 'collectable');
    collectable.anchor.setTo(0.5, 0.5);
    collectable.enableBody = true;
    collectable.scale.setTo(0.07, 0.07);
    relics.add(collectable);

    //wetholes

    warmhole1 = game.add.sprite(550, 210, 'hole');
    warmhole1.enableBody = true;
    warmhole1.anchor.setTo(0.5, 0.5);
    warmhole1.scale.setTo(0.1, 0.1);

    warmhole2 = game.add.sprite(game.world.width-350, 300, 'hole');
    warmhole2.enableBody = true;
    warmhole2.anchor.setTo(0.5, 0.5);
    warmhole2.scale.setTo(0.1, 0.1);

    warmhole3 = game.add.sprite(60, 80, 'hole');
    warmhole3.enableBody = true;
    warmhole3.anchor.setTo(0.5, 0.5);
    warmhole3.scale.setTo(0.1, 0.1);

    warmhole4 = game.add.sprite(250, 80, 'hole');
    warmhole4.enableBody = true;
    warmhole4.anchor.setTo(0.5, 0.5);
    warmhole4.scale.setTo(0.1, 0.1);

    walls = game.add.group();

    //Test object
    newSprite(300, 400, 0.05, 0.3, 'test');
    newSprite(400, 450, 0.05, 0.05, 'test');
    newSprite(350, 350, 0.3, 0.05, 'testo');
    newSprite(450, 430, 0.3, 0.05, 'testo');

    //ifbaownfawu9fhaweioaewiwh ownfp eana owuevioua wnaewuaibvprieawubroaiwubraobra
    var diggle = 100;
    newSprite(300+diggle, 400-diggle-15, 0.05, 0.3, 'test');
    newSprite(400+diggle, 450-diggle+15, 0.05, 0.3, 'test');
    newSprite(350+diggle, 350-diggle-15, 0.3, 0.05, 'testo');
    newSprite(450+diggle, 430-diggle-15, 0.3, 0.05, 'testo');

    //jifawieb aiuawp rhar  iabaiwbfweivrwaibraiwba
    var niggle = 200;
    //Test object
    newSprite(400+niggle, 450-niggle, 0.05, 0.3, 'test');
    newSprite(300+niggle, 400-niggle+10, 0.05, 0.1, 'test');

    //fnilufnlaifun afipfpuwf a ;zipabfpiaf wf uwfboaiwuf pie
    newSprite(350+diggle-niggle/2, 350-diggle-15, 0.3, 0.05, 'testo');
    newSprite(350-niggle/2, 350, 0.3, 0.05, 'testo');
    newSprite(300+diggle-niggle, 400-diggle-15, 0.05, 0.3, 'test');
    newSprite(300+diggle-niggle/2, 400-diggle-110, 0.05, 0.2, 'test');

    //jelhfapfa augvl aai uliufifbe vibeial aiv bfliebav
    newSprite(350-niggle, 350-diggle-15, 0.3, 0.05, 'testo');
    newSprite(350-niggle/2, 350-niggle, 0.3, 0.05, 'testo');
    newSprite(300-niggle, 400-(2*diggle)-30, 0.05, 0.3, 'test');
    newSprite(300-niggle/2, 400-(2*diggle)-105, 0.05, 0.25, 'test');
    newSprite(350-niggle, 350-diggle-niggle-15, 0.3, 0.05, 'testo');

    newSprite(350-niggle/2+niggle, 350-niggle, 0.3, 0.05, 'testo');
    newSprite(300-niggle/2+niggle, 400-(2*diggle)-105, 0.05, 0.25, 'test');


}

function newSprite(sprX, sprY, widthScale, heightScale, image) {
    temp = game.add.sprite(sprX, sprY, image);
    temp.anchor.setTo(0.5, 0.5);
    temp.enableBody = true;
    temp.scale.setTo(widthScale, heightScale);
    walls.add(temp);
}

function update() {
    if (player.x < 0 || player.x > game.world.width || player.y < 0 || player.y > game.world.height) {
        didFailLevel();
    }

    for (var i = 0; i < relics.children.length; i++) {
        if (hasCollided(player, relics.children[i])) {
            didCollects(i);
        }
    }

    for (var i = 0; i < walls.children.length; i++) {
      if (hasCollided(player, walls.children[i])) {
        didFailLevel();
        move.pause();
      }
    }

    if (areClose(player, warmhole1, 20)) {
        move.pause();
        player.position.x = warmhole2.position.x;
        player.position.y = warmhole2.position.y;
    }

    if (areClose(player, warmhole3, 20)) {
        move.pause();
        player.position.x = warmhole4.position.x;
        player.position.y = warmhole4.position.y;
    }

    warmhole1.angle += 1;
    warmhole2.angle += 1;
    warmhole3.angle -= 1;
    warmhole4.angle -= 1;
}

function helper() {
    console.log("Tutorial Loaded");

    swal({
        title: "Lesson 5",
        text: "Many programming languages have loops. Loops help you to execute the same section of code multple times without having to repeat it. There are 3 loops you will learn about. The while-loop (when unsure about number of repetitions), the for-loop (when you are sure), and the do-while-loop (when you want the code to execute atleast once).",
        type: "info",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Got it!",
        closeOnConfirm: true }, null);
}

function areClose(agent, objective, threshold)
{
    return Math.sqrt(Math.pow(objective.position.x-agent.position.x, 2)
    + Math.pow(objective.position.y-agent.position.y, 2)) <= threshold;
}

function didCollects(collect) {
   relics.children[collect].kill();
   relics.remove(relics.children[collect]);
   if (goal - relics.children.length == goal) {
       move.pause();
       move = 0;
       didCompleteLevel();
   }
}

function resetGame() {
    move.pause();
    game.tweens.removeAll();
    move = game.add.tween(player);

    player.x = initialX;
    player.y = initialY;
    player.angle = 0;
    direction = 0;
}

function momeDirections(x, y, straight) {
    move.pause();
    move = game.add.tween(player);
    var time = (Math.sqrt(x*x+y*y)*10)/speed;
    var xM = 0;
    var yM = 0;

    if (straight === 1) {
        xM = getXYFromDirection()[0];
        yM =  getXYFromDirection()[1];
    }
    else {
        console.log("not staright")
        yM =  -getXYFromDirection()[0];
        xM =  getXYFromDirection()[1];
    }

    move.to({x: player.x+x*10*xM, y: player.y+y*10*yM}, time, Phaser.Easing.In);
    move.start();

    return time+500;
}

function rotatePlayer(clockwise) {
    direction = mod(direction + clockwise, 4);
    player.angle += clockwise*90;
}
