//test is just a little hint of how to add stuff

var game = new Phaser.Game(700, 600, Phaser.AUTO, 'gameUI', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('spaceship', 'js/levels/assets/player_ship.png');
    game.load.image('collectable', 'js/levels/assets/collectable2.png');
    game.load.image('planet', 'js/levels/assets/planet1.png');
    game.load.image('stars', 'js/levels/assets/starmap.png');
}
var player;
var move;
var test;

var relics;

var completed = 0;
var goal = 1; //change this to amount of collectables in level.

var speed = 0.2;
var initialX = 350;
var initialY = 500;

var direction = 0;

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
    newSprite(initialX, 100, 0.07, 0.07, 'collectable', relics);
}

function newSprite(sprX, sprY, widthScale, heightScale, image, spriteGroup) {
    temp = game.add.sprite(sprX, sprY, image);
    temp.anchor.setTo(0.5, 0.5);
    temp.enableBody = true;
    temp.scale.setTo(widthScale, heightScale);
    spriteGroup.add(temp);
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

function helper() {
    console.log("Tutorial Loaded");

    swal({
        title: "Lesson 1",
        text: "Use the 'goForward' to move the spaceship towards the collectible, in order to proceed to the next level. The parameter of the function, is how many units to move up by. You need to find the right distance. Click the icon in the top left for the documentation in order to get more information. \n\ngoForward(10);\nThis will make the spaceship go 10 spaces forward.",
        type: "info",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Got it!",
        closeOnConfirm: true }, null);
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
