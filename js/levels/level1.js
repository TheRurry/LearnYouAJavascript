var game = new Phaser.Game(700, 600, Phaser.AUTO, 'gameUI', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('spaceship', 'js/levels/assets/player_ship.png');
    game.load.image('collectable', 'js/levels/assets/collectable2.png');
    game.load.image('planet', 'js/levels/assets/planet1.png');
    game.load.image('stars', 'js/levels/assets/starmap.png')

}
var player
var move;

var collectable;
var completed = 0;

var speed = 0.2;

var initialX = 350;
var initialY = 500;

function create() {
    // Background
    game.add.image(game.world.centerX, game.world.centerY, 'stars').anchor.set(0.5);
    game.add.image(250, 300, 'planet').anchor.set(0.5);

    // The player and its settings
    player = game.add.sprite(initialX, initialY, 'spaceship');
    player.anchor.setTo(0.5, 0.5);
    player.scale.setTo(0.07, 0.07);

    nextX = player.x;
    nextY = player.y;

    move = game.add.tween(player);

    collectable = game.add.sprite(initialX, 100, 'collectable');
    collectable.enableBody = true;
    collectable.anchor.setTo(0.5, 0.5);
    collectable.scale.setTo(0.07, 0.07);
}

function update() {
    if (player.x < 0 || player.x > game.world.width || player.y < 0 || player.y > game.world.height) {
        didFailLevel();
    }
    if (areClose(player, collectable, 20) && completed++ == 0) {
        didCollect();
    }
}

function didCollect()
{
    collectable.kill();
    didCompleteLevel();
    move.pause();
}

function areClose(agent, objective, threshold)
{
    return Math.sqrt(Math.pow(objective.position.x-agent.position.x, 2)
    + Math.pow(objective.position.y-agent.position.y, 2)) <= threshold;
}

function resetGame() {
    move.pause();
    game.tweens.removeAll();
    move = game.add.tween(player);
    player.x = initialX;
    player.y = initialY;
}

function goForward(distance, callback) {    
    distance = typeof distance !== 'undefined' ? distance : 5;
    var time = momeDirections(0, -distance);
    callback(false);

    setTimeout(callback, time, true);
}

function goRight(distance, callback) {
    distance = typeof distance !== 'undefined' ? distance : 5;
    var time = momeDirections(distance, 0);
    callback(false);

    setTimeout(callback, time, true);
}

function goLeft(distance, callback) {
    distance = typeof distance !== 'undefined' ? distance : 5;
    var time = momeDirections(-distance, 0);
    callback(false);

    setTimeout(callback, time, true);
}

function goBack(distance, callback) {
    distance = typeof distance !== 'undefined' ? distance : 5;
    var time = momeDirections(0, distance);
    callback(false);

    setTimeout(callback, time, true);
}

function momeDirections(x, y) {
    move.pause();
    move = game.add.tween(player);
    var time = (Math.sqrt(x*x+y*y)*10)/speed;
    move.to({x: player.x+x*10, y: player.y+y*10}, time, Phaser.Easing.In);
    move.start();

    return time+500;
}
