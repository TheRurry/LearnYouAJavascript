//test is just a little hint of how to add stuff

var game = new Phaser.Game(700, 600, Phaser.AUTO, 'gameUI', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('spaceship', 'js/levels/assets/player_ship.png');
    game.load.image('collectable', 'js/levels/assets/collectable2.png');
    game.load.image('planet', 'js/levels/assets/planet1.png');
    game.load.image('stars', 'js/levels/assets/starmap.png');
    game.load.image('test', 'js/levels/assets/obs.png');
    game.load.image('testh', 'js/levels/assets/obsh.png');
}
var player;
var move;
var relics;

var test0;
var test1;
var test2;
var test3;
var test4;
var test5;
var test6;

var collectable;

var completed = 0;
var goal = 1; //change this to amount of collectables in level.

var speed = 0.2;
var initialX = 350;
var initialY = 500;

function newSprite(sprX, sprY, widthScale, heightScale, image, spriteGroup) {
    temp = game.add.sprite(sprX, sprY, image);
    temp.anchor.setTo(0.5, 0.5);
    temp.enableBody = true;
    temp.scale.setTo(widthScale, heightScale);
    spriteGroup.add(temp);
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

function create() {
    // Background
    game.add.image(game.world.centerX, game.world.centerY, 'stars').anchor.set(0.5);
    game.add.image(250, 300, 'planet').anchor.set(0.5);

    // Player
    player = game.add.sprite(initialX, initialY, 'spaceship');
    player.anchor.setTo(0.5, 0.5);
    player.scale.setTo(0.07, 0.07);
    move = game.add.tween(player);

    //Collectable
    relics = game.add.group();
    newSprite(150, 80, 0.07, 0.07, 'collectable', relics);

    //Test object
    walls = game.add.group();
    newWall(100, 200, 0.05, 1);
    newWallh(290, 140, 1.0, 0.05);
    newWallh(390, 270, 1.0, 0.05);
    newWallh(290, 400, 1.0, 0.05);
    newWall(600, 200, 0.05, 1);

}

function newWall(wallX, wallY, widthScale, heightScale) {
    temp = game.add.sprite(wallX, wallY, 'test');
    temp.anchor.setTo(0.5, 0.5);
    temp.enableBody = true;
    temp.scale.setTo(widthScale, heightScale);
    walls.add(temp);
}

function newWallh(wallX, wallY, widthScale, heightScale) {
    temp = game.add.sprite(wallX, wallY, 'testh');
    temp.anchor.setTo(0.5, 0.5);
    temp.enableBody = true;
    temp.scale.setTo(widthScale, heightScale);
    walls.add(temp);
}

function update() {

    if (player.x < 0 || player.x > game.world.width || player.y < 0 || player.y > game.world.height) {
        move.pause();
        didFailLevel();
    }

    for (var i = 0; i < walls.children.length; i++) {
    if (hasCollided(player, walls.children[i])) {
        didFailLevel();
        move.pause();
    }
}

for (var i = 0; i < relics.children.length; i++) {
        if (hasCollided(player, relics.children[i])) {
            didCollects(i);
        }
    }
}

function helper() {
    console.log("Tutorial Loaded");

    swal({
        title: "Lesson 10",
        text: "Can you do this level by modifying the move functions?",
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
