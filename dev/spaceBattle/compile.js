/**
 * Created by pahlavaubivca on 11.09.2016.
 */
var compileObj = {};

/**
 *
* */
compileObj.init = function () {
    if(!compileObj.canvas){compileObj.canvas = document.getElementById("canvas");}
    compileObj.canvas.width = window.innerWidth;
    compileObj.canvas.height = window.innerHeight;
    compileObj.canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';
};

/**
 * det json with defaults value, and convert to object
 * @constructor
* */
compileObj.defaults = function (resp) {
    if(resp){
        compileObj.defaults = JSON.parse(resp);
        compileObj.registerAction();
        compileObj.init();
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "init.json");
        xhr.send();
        xhr.onload = function () {
            if (xhr.status == 200) {
                compileObj.defaults(xhr.response);
            }
        };
    }
};
compileObj.defaults();

compileObj.mainHero = function () {
    var ship = compileObj.canvas.getContext("2d");
    var mhParam = compileObj.defaults.unit.mainHero;
    var mhPos = mhParam.physicalCharact;
    ship.fillStyle='red';
    ship.fillRect(mhPos.position.x, mhPos.position.y, mhPos.width, mhPos.height);
    ship.fill();
};

compileObj.enemy = function(){
    var ship = compileObj.defaults.canvas.getContext("2d");
    var enemyParam = compileObj.defaults.unit.enemy;
    var enemyPosition = enemyParam.physicalCharact
};

/**
 * register button action from player
 * @constructor
* */
compileObj.registerAction = function () {
    var action = compileObj.defaults.unit.mainHero.physicalCharact;
    window.addEventListener('keydown', function (event) {

        event.keyCode == 65 ? action.leftMove = true : action.leftMove;
        event.keyCode == 68 ? action.rightMove = true : action.rightMove;
        event.keyCode == 87 ? action.topMove = true : action.topMove;
        event.keyCode == 83 ? action.downMove = true : action.downMove;
    });
    window.addEventListener("click", function () {
        action.fire = true;
    });
    window.addEventListener('keyup', function (event) {

        event.keyCode == 65 ? action.leftMove = false : action.leftMove;
        event.keyCode == 68 ? action.rightMove = false : action.rightMove;
        event.keyCode == 87 ? action.topMove = false : action.topMove;
        event.keyCode == 83 ? action.downMove = false : action.downMove;
    })
};

/**
* determine move unit, if is active
 * @constructor
* */
compileObj.move = function () {
    if(!compileObj.du) compileObj.du = compileObj.defaults.unit;
    for(var key in compileObj.du){
        if(compileObj.du.hasOwnProperty(key) && compileObj.du[key].active){
            compileObj.du[key]['physicalCharact']['leftMove'] == true ? compileObj.du[key]['physicalCharact'].position.x -= compileObj.du[key]['physicalCharact'].step : 0;
            compileObj.du[key]['physicalCharact']['rightMove'] == true ? compileObj.du[key]['physicalCharact'].position.x += compileObj.du[key]['physicalCharact'].step : 0;
            compileObj.du[key]['physicalCharact']['topMove'] == true ? compileObj.du[key]['physicalCharact'].position.y -= compileObj.du[key]['physicalCharact'].step : 0;
            compileObj.du[key]['physicalCharact']['downMove'] == true ? compileObj.du[key]['physicalCharact'].position.y += compileObj.du[key]['physicalCharact'].step : 0;
        }
    }
};

/**
 * draw all elements : GG, enemys, nps, bullets
 * @constructor
* */
compileObj.draw = function () {
    if(compileObj.canvas) {
        compileObj.init();
        compileObj.move();
        compileObj.mainHero();
    }
    window.requestAnimationFrame(function(event){
        compileObj.draw();
    });

};
compileObj.draw();



