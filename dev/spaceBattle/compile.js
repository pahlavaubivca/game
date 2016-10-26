/**
 * Created by pahlavaubivca on 11.09.2016.
 */
var compileObj = {};

/**
 *
* */
compileObj.initField = function () {
    if(!compileObj.canvas){compileObj.canvas = document.getElementById("canvas");}
    compileObj.canvas.width = compileObj.field.width;/*window.innerWidth;*/
    compileObj.canvas.height = compileObj.field.height;
    compileObj.canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';
};

/**
 * det json with defaults value, and convert to object
 * @constructor
* */
compileObj.defaults = function (resp,callback) {
    callback? this.callback = callback : null;
    if(resp){
        compileObj.compileDefauls(compileObj,JSON.parse(resp));
        compileObj.registerAction();
        compileObj.initField();
        this.callback();
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

compileObj.compileDefauls = function (parentObj, obj) {
    var obj = obj || {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {

            if (obj[key].constructor == String) {
                if (obj[key].match(/(&&&)/)) {
                    obj[key] = obj[key].replace(/&&&/, '');
                } else {
                    obj[key] = new Function("return " + obj[key] + "")();
                }
                parentObj[key] = obj[key];
            } else if (obj[key].constructor == Object) {
                parentObj[key] = {};
                compileObj.compileDefauls(parentObj[key], obj[key]);
            } else {
                parentObj[key] = obj[key];
            }
        }
    }
};


compileObj.draw = function () {
    var ship = compileObj.canvas.getContext("2d");
    var unitParam = compileObj.unit;
    for (var key in unitParam) {
        if (unitParam.hasOwnProperty(key) && unitParam[key].active) {
            ship.fillStyle = unitParam[key].physicalCharact.texture;
            ship.fillRect(unitParam[key].physicalCharact.position.x, unitParam[key].physicalCharact.position.y, unitParam[key].physicalCharact.width, unitParam[key].physicalCharact.height);
            ship.fill();
        }
    }
};

compileObj.collision = function () {
    var xDif = 0;
    var yDif = 0;
    var bH = 0;
    var bW = 0;
    for (var key in compileObj.unit) {
        if (compileObj.unit.hasOwnProperty(key) && compileObj.unit[key].active) {
            var CDUP = compileObj.unit[key].physicalCharact;
            if (key == "mainHero") {
                if(CDUP.position.x<0 || CDUP.position.x>compileObj.field.width - CDUP.width){
                    CDUP.position.x = CDUP.position.x<0?CDUP.position.x=0:CDUP.position.x=compileObj.field.width - CDUP.width;
                }
                if(CDUP.position.y<0 || CDUP.position.y>compileObj.field.height - CDUP.height){
                    CDUP.position.y = CDUP.position.y<0?CDUP.position.y=0:CDUP.position.y=compileObj.field.height - CDUP.height;
                }

            } else {
                if(CDUP.position.x<0 || CDUP.position.x>compileObj.field.width - CDUP.width){
                    CDUP.position.x = CDUP.position.x<0?CDUP.position.x=0:CDUP.position.x=compileObj.field.width - CDUP.width;
                    CDUP.leftMove *= -1;
                    CDUP.rightMove *= -1;
                }
                if(CDUP.position.y<0 || CDUP.position.y>compileObj.field.height - CDUP.height){
                    CDUP.position.y = CDUP.position.y<0?CDUP.position.y=0:CDUP.position.y=compileObj.field.height - CDUP.height;
                    CDUP.topMove *= -1;
                    CDUP.downMove *= -1;
                }

                for (var k in compileObj.unit) {
                    if (compileObj.unit.hasOwnProperty(k) && compileObj.unit[k].active && k!=key) {
                        var CDUP2 = compileObj.unit[k].physicalCharact;

                        bW = CDUP2.position.x-CDUP.position.x>0?CDUP.width:CDUP2.width;
                        bH = CDUP2.position.y-CDUP.position.y>0?CDUP.height:CDUP2.height;
                        xDif = Math.abs(CDUP2.position.x-CDUP.position.x)-bW;
                        yDif = Math.abs(CDUP2.position.y-CDUP.position.y)-bH;

                        if(xDif<0 && yDif<0) {
                            xDif *= -1;
                            yDif *= -1;
                            if (xDif < yDif) { // collision x coordinate
                                CDUP2.position.x + xDif - CDUP.position.x >= bW ? CDUP.position.x -= xDif : CDUP.position.x += xDif;
                                if(k!="mainHero")CDUP2.leftMove*=-1;
                                if(k!="mainHero")CDUP2.rightMove*=-1;
                                CDUP.leftMove *=-1;
                                CDUP.rightMove*=-1;
                            }
                            else if (xDif >= yDif) {
                                CDUP2.position.y + yDif - CDUP.position.y >= bH ? CDUP.position.y -= yDif : CDUP.position.y += yDif;
                                if(k!="mainHero")CDUP2.topMove *=-1;
                                if(k!="mainHero")CDUP2.downMove *=-1;
                                CDUP.topMove *=-1;
                                CDUP.downMove *=-1;
                            }
                        }
                    }
                }
            }
        }
    }
};
compileObj.random = function(wat){
  if(wat == "color"){
      var hex = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','f','e'];
      var color = '#';
      while(color.length<4){color+=hex[Math.floor(Math.random()*(hex.length-0)+0)]};
      return color
  }
  if(wat == "enemyPosition"){
      return {
          "x": (function () {
              return Math.random() * ((compileObj.field.width - 100) - 0) + 0;//remove 100 its hardcode
          })(),
          "y": (function () {
              return Math.random() * ((compileObj.field.height / 2) - 0) + 0;
          })()
      }
  }
  if(wat == "step"){
      return Math.floor(Math.random()*(3-1)+1);
  }
  if(wat == "size"){
      return Math.floor(Math.random()*(30-15)+15);
  }
};

compileObj.generatorEnemy = function () {
    compileObj.unit['enemy' + new Date().getTime()] = {
        "active": true,
        "physicalCharact": {
            "width": compileObj.random("size"),
            "height": compileObj.random("size"),
            "weight": 1,
            "texture": compileObj.random("color"),
            "position": compileObj.random("enemyPosition"),
            "stepx": compileObj.random("step"),
            "stepy":compileObj.random("step"),
            "leftMove": -1,
            "rightMove": 1,
            "topMove": -1,
            "downMove": 1,
            "fire": false
        },
        "level": {}
    }
};

/**
 * register button action from player
 * @constructor
* */
compileObj.registerAction = function () {
    var action = compileObj.unit.mainHero.physicalCharact;
    window.addEventListener('keydown', function (event) {
        event.keyCode == 65 ? action.leftMove = 1 : action.leftMove;
        event.keyCode == 68 ? action.rightMove = 1 : action.rightMove;
        event.keyCode == 87 ? action.topMove = 1 : action.topMove;
        event.keyCode == 83 ? action.downMove = 1 : action.downMove;
    });
    window.addEventListener("click", function () {
        action.fire = true;
    });
    window.addEventListener('keyup', function (event) {
        event.keyCode == 65 ? action.leftMove = -1 : action.leftMove;
        event.keyCode == 68 ? action.rightMove = -1 : action.rightMove;
        event.keyCode == 87 ? action.topMove = -1 : action.topMove;
        event.keyCode == 83 ? action.downMove = -1 : action.downMove;
    })
};

/**
* determine move unit, if is active
 * @constructor
* */
compileObj.move = function () {
    if(!compileObj.du) compileObj.du = compileObj.unit;
    for(var key in compileObj.du){
        if(compileObj.du.hasOwnProperty(key) && compileObj.du[key].active){
            compileObj.du[key]['physicalCharact']['leftMove'] == 1 ? compileObj.du[key]['physicalCharact'].position.x -= compileObj.du[key]['physicalCharact'].stepx : 0;
            compileObj.du[key]['physicalCharact']['rightMove'] == 1 ? compileObj.du[key]['physicalCharact'].position.x += compileObj.du[key]['physicalCharact'].stepx : 0;
            compileObj.du[key]['physicalCharact']['topMove'] == 1 ? compileObj.du[key]['physicalCharact'].position.y -= compileObj.du[key]['physicalCharact'].stepy : 0;
            compileObj.du[key]['physicalCharact']['downMove'] == 1 ? compileObj.du[key]['physicalCharact'].position.y += compileObj.du[key]['physicalCharact'].stepy : 0;
        }
    }
};

/**
 * draw all elements : GG, enemys, nps, bullets
 * @constructor
* */
compileObj.runOnce = function(){
    function callback() {
        var count = 1;
        var interval = setInterval((function () {
            if (compileObj.constructor == Object) {
                compileObj.generatorEnemy();
                console.log('enemy');
                if (count > 40) {
                    clearInterval(interval);
                }
                count++;
            }
        }), 10)
    }
    compileObj.defaults(undefined,callback);
};
compileObj.runOnce();


compileObj.finish = function () {
    if(compileObj.canvas) {
        compileObj.initField();
        compileObj.move();
        compileObj.collision();
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




