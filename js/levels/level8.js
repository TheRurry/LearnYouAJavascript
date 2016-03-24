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
    collectable = game.add.sprite(550, 100, 'collectable');
    collectable.anchor.setTo(0.5, 0.5);
    collectable.enableBody = true;
    collectable.scale.setTo(0.07, 0.07);

    //Test object
    walls = game.add.group();
    newWall(100, 200, 0.05, 1);
    newWall(200, 240, 0.05, 0.8);
    newWall(300, 150, 0.05, 0.8);
    newWall(400, 240, 0.05, 0.8);
    newWall(500, 150, 0.05, 0.8);
    newWall(600, 200, 0.05, 1);
    newWallh(400, 400, 1.05, 0.05);
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

    if (hasCollided(player, collectable)) {
        completed++;
        didCollect(collectable, move, completed, goal);
        move.pause();
    }
}

function helper() {
    console.log("Tutorial Loaded");

    swal({
        title: "Lesson 3",
        text: "This level could be done by altering the move directions within the recursive function. Why don't you give it a go?",
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
