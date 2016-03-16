var canRun = true;

function runGame()
{
    resetGame();
    interpreter = null;
    var interpreter = new Interpreter(editor.getValue(), initApi);
    nextStep(interpreter);
}

function didCompleteLevel()
{
    console.log("Level Complete!");

    swal({
        title: "You've successfully completed this level!",
        text: "Do you want to go to the next one?",
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, go!",
        closeOnConfirm: true }, null);
}

function nextStep(interpreter)
{
    if (canRun && interpreter.step()) {
    }
    window.setTimeout(nextStep, 0, interpreter);
}

function initApi(interpreter, scope)
{
    var wrapper = function(dist) {
        return interpreter.createPrimitive(goForward(dist, function(finished){
            if (!finished) canRun = false;
            else canRun = true;
        }));
    };
    interpreter.setProperty(scope, 'goForward',
    interpreter.createNativeFunction(wrapper));

    wrapper = function(dist) {
        return interpreter.createPrimitive(goBack(dist, function(finished){
            if (!finished) canRun = false;
            else canRun = true;
        }));
    };
    interpreter.setProperty(scope, 'goBack',
    interpreter.createNativeFunction(wrapper));

    wrapper = function(dist) {
        return interpreter.createPrimitive(goLeft(dist, function(finished){
            if (!finished) canRun = false;
            else canRun = true;
        }));
    };
    interpreter.setProperty(scope, 'goLeft',
    interpreter.createNativeFunction(wrapper));

    wrapper = function(dist) {
        return interpreter.createPrimitive(goRight(dist, function(finished){
            if (!finished) canRun = false;
            else canRun = true;
        }));
    };
    interpreter.setProperty(scope, 'goRight',
    interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        return interpreter.createPrimitive(player.x);
    };
    interpreter.setProperty(scope, 'playerX',
    interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        return interpreter.createPrimitive(player.y);
    };
    interpreter.setProperty(scope, 'playerY',
    interpreter.createNativeFunction(wrapper));
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

function hasCollided(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        return true;
    }
}

function didCollect(collectable, move, completed, goal) {
    collectable.kill();
    if (completed == goal) {
        didCompleteLevel();
        move.pause();
    }
}