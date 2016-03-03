var game = new Phaser.Game(700, 600, Phaser.AUTO, 'gameUI', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('spaceship', 'js/levels/assets/player_ship.png');
    game.load.image('collectable', 'js/levels/assets/collectable2.png');
    game.load.image('planet', 'js/levels/assets/planet1.png');
    game.load.image('stars', 'js/levels/assets/starmap.png')

}
var player
var move;

var collectable = 0;

var speed = 0.2;

var initialX = 340;
var initialY = 530;

var wallWidth = 6;
var wall1 = [260, 370, wallWidth, 300]
var wall2 = [260, 370, 200, wallWidth]
var wall3 = [420, 100, 230, wallWidth]
var walls = [wall1, wall2, wall3]

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

    collectable = game.add.sprite(game.world.width-150, 50, 'collectable');
    collectable.enableBody = true;
    collectable.anchor.setTo(0.5, 0.5);
    collectable.scale.setTo(0.07, 0.07);

    var graphics = game.add.graphics(0, 0);
    graphics.beginFill(0xFFFFFF);
    graphics.drawRect(wall1[0], wall1[1], wall1[2], wall1[3]);
    graphics.drawRect(wall2[0], wall2[1], wall2[2], wall2[3]);
    graphics.drawRect(wall3[0], wall3[1], wall3[2], wall3[3]);
    graphics.endFill();
}

function update() {
    if (player.x < 0 || player.x > game.world.width || player.y < 0 || player.y > game.world.height) {
        didFailLevel();
    }
    if (areClose(player, collectable, 20) && completed++ == 0) {
        didCollect();
    }

    if (player.position.x>wall1[0] && player.position.x<wall1[0]+wall1[2] &&
        player.position.y>wall1[1] && player.position.y<wall1[1]+wall1[3]) {
        touchedWall();
    }
    if (player.position.x>wall2[0] && player.position.x<wall2[0]+wall2[2] &&
        player.position.y>wall2[1] && player.position.y<wall2[1]+wall2[3]) {
        touchedWall();
    }
    if (player.position.x>wall3[0] && player.position.x<wall3[0]+wall3[2] &&
        player.position.y>wall3[1] && player.position.y<wall3[1]+wall3[3]) {
        touchedWall();
    }
}

function helper() {
    console.log("Tutorial Loaded")

    swal({
        title: "Lesson 2",
        text: "You can now use goLeft(), goRight(), and goBack() to navigate around the white obstacles, be warned that touching these obstacles will make the level restart and wipe your current code, so keep a back up. You can find out more about these new functions in the documentation.",
        type: "info",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Got it!",
        closeOnConfirm: true }, null);
}

function didCollect()
{
    collectable.kill();
    didCompleteLevel();
    move.pause();
}

function touchedWall()
{
    didFailLevel();
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

function momeDirections(x, y) {
    move.pause();
    move = game.add.tween(player);
    var time = (Math.sqrt(x*x+y*y)*10)/speed;
    move.to({x: player.x+x*10, y: player.y+y*10}, time, Phaser.Easing.In);
    move.start();

    return time+500;
}
