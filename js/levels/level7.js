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
    collectable = game.add.sprite(initialX - 30, 220, 'collectable');
    collectable.anchor.setTo(0.5, 0.5);
    collectable.enableBody = true;
    collectable.scale.setTo(0.07, 0.07);

    //Test object
    test2 = game.add.sprite(500, 225, 'test');
    test2.anchor.setTo(0.5, 0.5);
    test2.enableBody = true;
    test2.scale.setTo(0.05, 1);

    test1 = game.add.sprite(310, 25, 'testh');
    test1.anchor.setTo(0.5, 0.5);
    test1.enableBody = true;
    test1.scale.setTo(1, 0.05);

    test0 = game.add.sprite(120, 225, 'test');
    test0.anchor.setTo(0.5, 0.5);
    test0.enableBody = true;
    test0.scale.setTo(0.05, 1);

    test3 = game.add.sprite(370, 420, 'testh');
    test3.anchor.setTo(0.5, 0.5);
    test3.enableBody = true;
    test3.scale.setTo(0.7, 0.05);

    test4 = game.add.sprite(240, 290, 'test');
    test4.anchor.setTo(0.5, 0.5);
    test4.enableBody = true;
    test4.scale.setTo(0.05, 0.7);

    test5 = game.add.sprite(320, 160, 'testh');
    test5.anchor.setTo(0.5, 0.5);
    test5.enableBody = true;
    test5.scale.setTo(0.35, 0.05);

    test6 = game.add.sprite(380, 230, 'test');
    test6.anchor.setTo(0.5, 0.5);
    test6.enableBody = true;
    test6.scale.setTo(0.05, 0.4);

    //game.physics.enable([ test0, test1, test2, test3, test4, test5, test6 ], Phaser.Physics.ARCADE);
    //game.physics.enable(player, Phaser.Physics.ARCADE);



}

function update() {

    if (player.x < 0 || player.x > game.world.width || player.y < 0 || player.y > game.world.height) {
        didFailLevel();
          move.pause();
    }

    if(hasCollided(player,test0) || hasCollided(player,test1) || hasCollided(player,test2) || hasCollided(player,test3) ||
        hasCollided(player,test4) || hasCollided(player,test5) || hasCollided(player,test6)){
        move.pause();
        didFailLevel();
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
        title: "Lesson 7",
        text: "Can you do this level while only making minimal changes to the answer to the previous level?",
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
