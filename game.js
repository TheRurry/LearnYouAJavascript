var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameUI', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

var player;
var move;

var star;

var speed = 0.2;

var initialX = 50;
var initialY = 500;

var nextX;
var nextY;

function create() {
    // The player and its settings
    player = game.add.sprite(initialX, initialY, 'dude');
    player.anchor.setTo(0.5, 0.5);
    player.scale.setTo(1, 1);

    nextX = player.x;
    nextY = player.y;

    move = game.add.tween(player);

    star = game.add.sprite(300, 300, 'star');
    star.anchor.setTo(0.5, 0.5);
    star.scale.setTo(1, 1);

    game.physics.arcade.overlap(player, star, collectStar, null, this);
}

function update() {
}

function resetGame() {
    move.pause();
    game.tweens.removeAll();
    move = game.add.tween(player);
    player.x = initialX;
    player.y = initialY;
    nextX = player.x;
    nextY = player.y;
}

function goForward(distance) {
    distance = typeof distance !== 'undefined' ? distance : 5;
    momeDirections(distance, 0);
}

function goUp(distance) {
    distance = typeof distance !== 'undefined' ? distance : 5;
    momeDirections(0, -distance);
}

function goBack(distance) {
    distance = typeof distance !== 'undefined' ? distance : 5;
    momeDirections(-distance, 0);
}

function goDown(distance) {
    distance = typeof distance !== 'undefined' ? distance : 5;
    momeDirections(0, distance);
}

function momeDirections(x, y) {
    var time = Math.sqrt(x*x+y*y)/speed;
    nextX += x;
    nextY += y;
    move.to({x: nextX, y: nextY}, time, Phaser.Easing.In);

    move.start();
}

function playerPosition() {
    console.log(player.x)
}

function collectStar(player, star) {
    star.kill();
}

