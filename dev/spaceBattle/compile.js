/**
 * Created by pahlavaubivca on 11.09.2016.
 */
var compileObj = {};

/**
 *
* */
compileObj.field = function () {
    if(!compileObj.canvas){compileObj.canvas = document.getElementById("canvas");}
    compileObj.canvas.width = compileObj.defaults.field.width;/*window.innerWidth;*/
    compileObj.canvas.height = compileObj.defaults.field.height;
    compileObj.canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';
};

/**
 * det json with defaults value, and convert to object
 * @constructor
* */
compileObj.defaults = function (resp) {
    if(resp){
        compileObj.defaults = JSON.parse(resp);
        compileObj.compileDefauls(compileObj.defaults);
        compileObj.registerAction();
        compileObj.field();
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

compileObj.compileDefauls = function(obj){
    var obj = obj || {};
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            if(obj[key].constructor == String) {
                if(obj[key].match(/(&&&)/)){
                    obj[key] = obj[key].replace(/&&&/,'');
                } else {
                    obj[key] = new Function("return " + obj[key] + "")();
                }
            } else if(obj[key].constructor==Object){
                compileObj.compileDefauls(obj[key]);
            }
        }
    }
};


compileObj.draw = function () {
    var ship = compileObj.canvas.getContext("2d");
    var unitParam = compileObj.defaults.unit;
    for (var key in unitParam) {
        if (unitParam.hasOwnProperty(key) && unitParam[key].active) {
            ship.fillStyle = unitParam[key].physicalCharact.texture;
            ship.fillRect(unitParam[key].physicalCharact.position.x, unitParam[key].physicalCharact.position.y, unitParam[key].physicalCharact.width, unitParam[key].physicalCharact.height);
            ship.fill();
        }
    }
};

compileObj.collision = function(){

};
compileObj.random = function(wat){
  if(wat == "color"){
      var hex = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','f','e'];
      var color = '#';
      while(color.length<4){color+=hex[Math.floor(Math.random()*(hex.length-0)+0)]};
      return color
  }
  if(wat == "position"){

  }
};

compileObj.generatorElements = function (type) {
    if (type == "enemy") {
        compileObj.defaults.unit['enemy' + new Date().getTime()] = {
            "active": false,
            "physicalCharact": {
                "width": 25,
                "height": 15,
                "weight": 1,
                "texture": compileObj.random("color"),
                "position": compileObj.random("position"),
                "step": 1,
                "leftM": false,
                "rightM": false,
                "topM": false,
                "downM": false,
                "fire": false
            },
            "level": {}
        }
    }
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
            compileObj.du[key]['physicalCharact']['leftMove'] == true ? compileObj.du[key]['physicalCharact'].position.x -= compileObj.du[key]['physicalCharact'].stepx : 0;
            compileObj.du[key]['physicalCharact']['rightMove'] == true ? compileObj.du[key]['physicalCharact'].position.x += compileObj.du[key]['physicalCharact'].stepx : 0;
            compileObj.du[key]['physicalCharact']['topMove'] == true ? compileObj.du[key]['physicalCharact'].position.y -= compileObj.du[key]['physicalCharact'].stepy : 0;
            compileObj.du[key]['physicalCharact']['downMove'] == true ? compileObj.du[key]['physicalCharact'].position.y += compileObj.du[key]['physicalCharact'].stepy : 0;
        }
    }
};

/**
 * draw all elements : GG, enemys, nps, bullets
 * @constructor
* */
compileObj.runOnce = function(){
    compileObj.defaults();
};
compileObj.runOnce();


compileObj.finish = function () {
    if(compileObj.canvas) {
        compileObj.field();
        compileObj.move();
        compileObj.draw();
    }
    window.requestAnimationFrame(function(event){
        compileObj.finish();
        if(!lastCalledTime) {
            lastCalledTime = Date.now();
            fps = 0;
            return;
        }
        delta = (Date.now() - lastCalledTime)/1000;
        lastCalledTime = Date.now();
        fps = 1/delta;
    });
};
compileObj.finish();


var fps = 0,lastCalledTime=0;
var divfps = document.getElementById('fps');
setInterval(function(){divfps.innerHTML = fps;},500);




