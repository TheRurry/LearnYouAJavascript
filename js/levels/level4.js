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
var wormholes;


var completed = 0;
var goal = 3;

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

    //collectables
    relics = game.add.group();
    newSprite(350, 390, 0.07, 0.07, 'collectable', relics);
    newSprite(450, 280, 0.07, 0.07, 'collectable', relics);
    newSprite(450, 190, 0.07, 0.07, 'collectable', relics);

    //wormholes
    wormholes = game.add.group();
    newSprite(550, 275, 0.1, 0.1, 'hole', wormholes);
    newSprite(game.world.width-350, 300, 0.1, 0.1, 'hole', wormholes);

    //walls
    walls = game.add.group();
    newSprite(300, 400, 0.05, 0.3, 'test', walls);
    newSprite(400, 450, 0.05, 0.05, 'test', walls);
    newSprite(350, 350, 0.3, 0.05, 'testo', walls);
    newSprite(450, 430, 0.3, 0.05, 'testo', walls);
    newSprite(400, 285, 0.05, 0.3, 'test', walls);
    newSprite(500, 365, 0.05, 0.3,  'test', walls);
    newSprite(450, 235, 0.3, 0.05,  'testo', walls);
    newSprite(550, 315, 0.3, 0.05,  'testo', walls);
    newSprite(300, 200, 0.05, 0.3,  'test', walls);
    newSprite(350, 150, 0.3, 0.05,  'testo', walls);
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

    for (var i = 0; i < walls.children.length; i++) {
        if (hasCollided(player, walls.children[i])) {
            didFailLevel();
            move.pause();
        }
    }

    wormholeJump(wormholes.children[0], wormholes.children[1]);

    for (var i = 0; i < wormholes.children.length; i++) {
        wormholes.children[i].angle += 1;
    }
}

function wormholeJump(startHole, endHole) {
    if (hasCollided(player, startHole, 20)) {
        move.pause();
        player.position.x = endHole.position.x;
        player.position.y = endHole.position.y;
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
        title: "Lesson 4",
        text: "Many programming languages have loops. Loops help you to execute the same section of code multple times without having to repeat it. There are 3 loops you will learn about. The while-loop (when unsure about number of repetitions), the for-loop (when you are sure), and the do-while-loop (when you want the code to execute atleast once).",
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
