/**
 * Created by pahlavaubivca on 11.09.2016.
 */
var compileObj = {};

/**
 *
 * */
compileObj.initField = function () {
    if (!compileObj.canvas) {
        compileObj.canvas = document.getElementById("canvas");
    }
    compileObj.canvas.width = compileObj.field.width;
    /*window.innerWidth;*/
    compileObj.canvas.height = compileObj.field.height;
    compileObj.canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';
};

/**
 * det json with defaults value, and convert to object
 * @constructor
 * */
compileObj.defaults = function (resp, callback) {
    callback ? this.callback = callback : null;
    if (resp) {
        compileObj.compileDefauls(compileObj, JSON.parse(resp));
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
    drawTime = performance.now();
    var ship = compileObj.canvas.getContext("2d");
    for (var key in compileObj.unit) {
        if (compileObj.unit.hasOwnProperty(key) && compileObj.unit[key].active) {
            ship.fillStyle = compileObj.unit[key].physicalCharact.texture;
            ship.fillRect(compileObj.unit[key].physicalCharact.position.x, compileObj.unit[key].physicalCharact.position.y, compileObj.unit[key].physicalCharact.width, compileObj.unit[key].physicalCharact.height);
            ship.fill();
        }
    }

    drawTime = performance.now() - drawTime;
};

compileObj.collision = function (/*currentUnit, key*/) {
    collisionTime = performance.now();
    var xDif = 0;
    var yDif = 0;
    var bH = 0;
    var bW = 0;

    for (var key in compileObj.unit) {
        if (compileObj.unit.hasOwnProperty(key) && compileObj.unit[key].active) {
            var CDUP = compileObj.unit[key]['physicalCharact'];

            if (key == "mainHero") {
                if (CDUP.position.x < 0 || CDUP.position.x > compileObj.field.width - CDUP.width) {
                    CDUP.position.x = CDUP.position.x < 0 ? CDUP.position.x = 0 : CDUP.position.x = compileObj.field.width - CDUP.width;
                }
                if (CDUP.position.y < 0 || CDUP.position.y > compileObj.field.height - CDUP.height) {
                    CDUP.position.y = CDUP.position.y < 0 ? CDUP.position.y = 0 : CDUP.position.y = compileObj.field.height - CDUP.height;
                }
            } else {
                if (CDUP.position.x < 0 || CDUP.position.x > compileObj.field.width - CDUP.width) {
                    CDUP.position.x = CDUP.position.x < 0 ? CDUP.position.x = 0 : CDUP.position.x = compileObj.field.width - CDUP.width;
                    CDUP.leftMove *= -1;
                    CDUP.rightMove *= -1;
                }
                if (CDUP.position.y < 0 || CDUP.position.y > compileObj.field.height - CDUP.height) {
                    CDUP.position.y = CDUP.position.y < 0 ? CDUP.position.y = 0 : CDUP.position.y = compileObj.field.height - CDUP.height;
                    CDUP.topMove *= -1;
                    CDUP.downMove *= -1;
                }

                for (var k in compileObj.unit) {
                    if (compileObj.unit.hasOwnProperty(k) && compileObj.unit[k].active && k != key && compileObj.unit[k].checked == false) {
                        var CDUP2 = compileObj.unit[k].physicalCharact;

                        bW = CDUP2.position.x - CDUP.position.x > 0 ? CDUP.width : CDUP2.width;
                        /**/
                        bH = CDUP2.position.y - CDUP.position.y > 0 ? CDUP.height : CDUP2.height;
                        xDif = Math.abs(CDUP2.position.x - CDUP.position.x) - bW;
                        yDif = Math.abs(CDUP2.position.y - CDUP.position.y) - bH;

                        if (xDif < 0 && yDif < 0) {
                            xDif *= -1;
                            yDif *= -1;
                            if (xDif < yDif) { // collision x coordinate
                                CDUP2.position.x + xDif - CDUP.position.x >= bW ? CDUP.position.x -= xDif : CDUP.position.x += xDif;
                                CDUP2.leftMove == CDUP.leftMove ? CDUP.leftMove *= -1 : (function () {
                                    if (k != "mainHero")CDUP2.leftMove *= -1;
                                    CDUP.leftMove *= -1
                                })();
                                CDUP2.rightMove == CDUP.rightMove ? CDUP.rightMove *= -1 : (function () {
                                    if (k != "mainHero")CDUP2.rightMove *= -1;
                                    CDUP.rightMove *= -1;
                                })();
                            }
                            else if (xDif >= yDif) {
                                CDUP2.position.y + yDif - CDUP.position.y >= bH ? CDUP.position.y -= yDif : CDUP.position.y += yDif;
                                CDUP2.topMove == CDUP.topMove ? CDUP.topMove *= -1 : (function () {
                                    if (k != "mainHero")CDUP2.topMove *= -1;
                                    CDUP.topMove *= -1;
                                })();
                                CDUP2.downMove == CDUP.downMove ? CDUP.downMove *= -1 : (function () {
                                    if (k != "mainHero")CDUP2.downMove *= -1;
                                    CDUP.downMove *= -1;
                                })();
                            }
                        }
                    }
                }
            }
            CDUP.checked = true;
        }
    }
    collisionTime = performance.now() - collisionTime;

};

compileObj.random = function (what) {
    if (what == "color") {
        var hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'f', 'e'];
        var color = '#';
        while (color.length < 4) {
            color += hex[Math.floor(Math.random() * (hex.length - 0) + 0)]
        }
        ;
        return color
    }
    if (what == "enemyPosition") {
        return {
            "x": (function () {
                return Math.random() * ((compileObj.field.width - 100) - 0) + 0;//remove 100 its hardcode
            })(),
            "y": (function () {
                return Math.random() * ((compileObj.field.height / 2) - 0) + 0;
            })()
        }
    }
    if (what == "step") {
        return Math.floor(Math.random() * (3 - 1) + 1);
    }
    if (what == "size") {
        return Math.floor(Math.random() * (30 - 15) + 15);
    }
};

compileObj.generatorEnemy = function () {
    compileObj.unit['enemy' + new Date().getTime()] = {
        "active": true,
        "checked": false,
        "physicalCharact": {
            "width": compileObj.random("size"),
            "height": compileObj.random("size"),
            "weight": 1,
            "texture": compileObj.random("color"),
            "position": compileObj.random("enemyPosition"),
            "stepx": compileObj.random("step"),
            "stepy": compileObj.random("step"),
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
        event.keyCode == 65 ? action.leftMove = 1 : null;
        event.keyCode == 68 ? action.rightMove = 1 : null;
        event.keyCode == 87 ? action.topMove = 1 : null;
        event.keyCode == 83 ? action.downMove = 1 : null;
    });
    window.addEventListener("mousedown", function () {
        action.fire = true;
    });
    window.addEventListener("mouseup", function () {
        action.fire = false;
    });
    window.addEventListener('keyup', function (event) {
        event.keyCode == 65 ? action.leftMove = -1 : null;
        event.keyCode == 68 ? action.rightMove = -1 : null;
        event.keyCode == 87 ? action.topMove = -1 : null;
        event.keyCode == 83 ? action.downMove = -1 : null;
    })
};

/**
 * determine move unit, if is active
 * @constructor
 * */


compileObj.move = function () {
    if (!compileObj.du) compileObj.du = compileObj.unit;
    for (var key in compileObj.du) {
        if (compileObj.du.hasOwnProperty(key) && compileObj.du[key].active) {

            if (compileObj.du[key]['physicalCharact']['leftMove'] == 1) {
                compileObj.du[key]['physicalCharact'].position.x -= compileObj.du[key]['physicalCharact'].stepx;
            } else if (compileObj.du[key]['physicalCharact']['rightMove'] == 1) {
                compileObj.du[key]['physicalCharact'].position.x += compileObj.du[key]['physicalCharact'].stepx;
            }
            if (compileObj.du[key]['physicalCharact']['topMove'] == 1) {
                compileObj.du[key]['physicalCharact'].position.y -= compileObj.du[key]['physicalCharact'].stepy;
            } else if (compileObj.du[key]['physicalCharact']['downMove'] == 1) {
                compileObj.du[key]['physicalCharact'].position.y += compileObj.du[key]['physicalCharact'].stepy;
            }
            compileObj.du[key].checked = false;

        }
    }
};
compileObj.fire = function () {
    if (compileObj.unit.mainHero.physicalCharact.fire) {

    }
};


/**
 * draw all elements : GG, enemys, nps, bullets
 * @constructor
 * */
compileObj.runOnce = function () {
    function callback() {

        var interval = setInterval((function () {
            if (compileObj.constructor == Object) {

                compileObj.generatorEnemy();
                console.log('enemy');
                if (count > 500) {
                    clearInterval(interval);
                }
                count++;
            }
        }), 10)
    }

    compileObj.defaults(undefined, callback);
};
compileObj.runOnce();


compileObj.finish = function () {
    if (compileObj.canvas) {
        fieldDr = performance.now();
        compileObj.initField();
        fieldDr = performance.now() - fieldDr;

        compileObj.collision();

        moveTime = performance.now();
        compileObj.move();
        moveTime = performance.now() - moveTime;

        compileObj.draw();
    }
    window.requestAnimationFrame(function (event) {
        compileObj.finish();
        if (!lastCalledTime) {
            lastCalledTime = Date.now();
            fps = 0;
            return;
        }
        delta = (Date.now() - lastCalledTime) / 1000;
        lastCalledTime = Date.now();
        fps = 1 / delta;

    });
};
compileObj.finish();


var count = 1;
var drawTime = 0;
var collisionTime = 0;
var moveTime = 0;
var fieldDr = 0;
var fps = 0, lastCalledTime = 0;
var divfps = document.getElementById('fps');
var collTime = document.getElementById('collTime');
var drTime = document.getElementById('drTime');
var countI = document.getElementById('count');
var moveT = document.getElementById('moveT');
var fieldD = document.getElementById('fieldD');

setInterval(function () {
    divfps.innerHTML = fps;

    if (collisionTime != 0)   collTime.innerHTML = collisionTime;
    if (drawTime != 0) drTime.innerHTML = drawTime;
    if (moveTime != 0) moveT.innerHTML = moveTime;
    if (fieldDr != 0)fieldD.innerHTML = fieldDr;
    var obj = {
        "fps": fps,
        "collision": collisionTime,
        "draw": drawTime,
        "move": moveTime,
        "field": fieldDr,
        "unitCount": count
    };
    cumulationStat(obj);
    countI.innerHTML = count;
}, 500);

var objectToSend = {};
function cumulationStat(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (!objectToSend[key]) {
                objectToSend[key] = obj[key];
            } else {
                if (key == "unitCount") {
                    objectToSend[key] = obj[key];
                } else {
                    objectToSend[key] = (objectToSend[key] + obj[key]) / 2;
                }
            }
        }
    }
}
/*window.addEventListener('beforeunload',function(){
 var url = 'http://'+location.host+'/stat?'+JSON.stringify(objectToSend);
 (new Image()).src=url;
 });*/


/*var xmlhttp = new XMLHttpRequest();
 xmlhttp.open("HEAD", "/test",true);
 xmlhttp.onreadystatechange=function() {
 if (xmlhttp.readyState==4) {
 session = xmlhttp.getResponseHeader('session');
 console.log(session);
 }
 };
 xmlhttp.send(null);*/




