var game = new Phaser.Game(700, 600, Phaser.AUTO, 'gameUI', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('spaceship', 'js/levels/assets/player_ship.png');
    game.load.image('collectable', 'js/levels/assets/collectable2.png');
    game.load.image('planet', 'js/levels/assets/planet1.png');
    game.load.image('stars', 'js/levels/assets/starmap.png');
    game.load.image('warmhole', 'js/levels/assets/warmhole.png');
}

var player
var move;

var collectable;
var warmhole1;
var warmhole2;

var completed = 0;

var speed = 0.2;

var initialX = 340;
var initialY = 530;

var wallWidth = 6;
var wall1 = [260, 370, wallWidth, 300]
var wall2 = [260, 370, 200, wallWidth]
var wall3 = [450, 0, wallWidth, 150]
var wall4 = [450, 150, 200, wallWidth]
var walls = [wall, wall2, wall3, wall4]
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

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

    collectable = game.add.sprite(game.world.width-110, 70, 'collectable');
    collectable.enableBody = true;
    collectable.anchor.setTo(0.5, 0.5);
    collectable.scale.setTo(0.07, 0.07);

    warmhole1 = game.add.sprite(100, 100, 'warmhole');
    warmhole1.enableBody = true;
    warmhole1.anchor.setTo(0.5, 0.5);
    warmhole1.scale.setTo(0.1, 0.1);

    warmhole2 = game.add.sprite(game.world.width-200, 70, 'warmhole');
    warmhole2.enableBody = true;
    warmhole2.anchor.setTo(0.5, 0.5);
    warmhole2.scale.setTo(0.1, 0.1);

    var graphics = game.add.graphics(0, 0);
    graphics.beginFill(0xFFFFFF);
    for (var i = 0; i<walls.length; i++) {
        graphics.drawRect(walls[i][0], walls[i][1], walls[i][2], walls[i][3]);
    }
    graphics.endFill();
}

function update() {
    if (player.x < 0 || player.x > game.world.width || player.y < 0 || player.y > game.world.height) {
        didFailLevel();
    }
    if (areClose(player, warmhole1, 20)) {
        move.pause();
        player.position.x = warmhole2.position.x;
        player.position.y = warmhole2.position.y;
    }

    if (areClose(player, collectable, 20) && completed++ == 0) {
        didCollect();
    }

    for (var i = 0; i<walls.length; i++) {
        if (player.position.x>walls[i][0] && player.position.x<walls[i][0]+walls[i][2] && 
            player.position.y>walls[i][1] && player.position.y<walls[i][1]+walls[i][3]) {
                touchedWall();
        }
    }

    warmhole1.angle += 1;
    warmhole2.angle += 1;
}

function touchedWall()
{
    didFailLevel();
    move.pause();
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

function collidedWall(wall)
{
    console.log("hdad")
    
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

function helper() {
    console.log("Tutorial Loaded")

    swal({
        title: "Lesson 3",
        text: "The collectible may look blocked, but don't worry you can still reach it. You may notice that there is a wormhole in the boxed off area with the collectible, and there is another to the left. These wormholes are connected, try going into the one accessible to you!",
        type: "info",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Got it!",
        closeOnConfirm: true }, null);
}

