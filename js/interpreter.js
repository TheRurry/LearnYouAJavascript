var canRun = true;
var interpreter = null;

function runGame()
{
    resetGame();
    interpreter = null;
    interpreter = new Interpreter(editor.getValue(), initApi);
    nextStep(interpreter);
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
