/**
 * Created by kitpes on 11.09.2016.
 */
var compileObj = {};

compileObj.init = function () {
    var canvas = document.getElementById("canvas");
    var field = canvas.getContext("2d");
    compileObj.canvas = canvas;

    if (compileObj.defaults) {
        var param = compileObj.defaults;

        field.fillStyle = param.field.color;
        field.fillRect(0, 0, param.field.width, param.field.height);
        field.fill();
    }
};
compileObj.defaults = (function () {
    return {
        "field": {
            "obstruction": {
                "meteor": {}
            },
            "width": window.innerWidth,
            "height": window.innerHeight,
            "color": "black"
        },
        "unit": {
            "enemy": {},
            "nps": {},
            "GG": {
                "physicalCharact": {
                    "width": 50,
                    "height": 25,
                    "weight": 3,
                    "position": {
                        "x": 600,
                        "y": 100
                    },
                    "leftM": false,
                    "rightM": false,
                    "topM": false,
                    "downM": false,
                    "fire": false

                },
                "level": {
                    "life": 3,
                    "speed": 1,
                    "armor": 1,
                    "weapon": "",
                    "shield": 0,
                    "hull": "standart"
                }
            }

        },
        "hull": {
            "standart": {},
            "light": {},
            "middle": {},
            "heavy": {},
            "terminator": {}
        },
        "weapon": {
            "standart": {},
            "atomatic": {},
            "shotgun": {},
            "epicShotgun": {},
            "missile": {},
            "laser": {},
            "mrp": {},
            "doom": {}
        }
    }
})();

compileObj.GG = function () {
    var ship = compileObj.defaults.canvas.getContext("2d");
    var ggParam = compileObj.defaults.unit.GG;
    var ggPos = ggParam.physicalCharact;
    ship.fillRect(ggPos.position.x, ggPos.position.y, ggPos.width, ggPos.height);
};


compileObj.registerAction = (function () {
    var action = compileObj.defaults.unit.GG.physicalCharact;
    window.addEventListener('keydown', function (event) {
        event.keyCode == 37 ? action.leftM = true : action.leftM;
        event.keyCode == 39 ? action.rightM = true : action.rightM;
        event.keyCode == 87 ? action.topM = true : action.topM;
        event.keyCode == 83 ? action.downM = true : action.downM;
    });
    window.addEventListener("click", function () {
        action.fire = true;
    });
    window.addEventListener('keyUp', function (event) {
        event.keyCode == 37 ? action.leftM = false : action.leftM;
        event.keyCode == 39 ? action.rightM = false : action.rightM;
        event.keyCode == 87 ? action.topM = false : action.topM;
        event.keyCode == 83 ? action.downM = false : action.downM;
    })
})();

compileObj.move = function () {

};

compileObj.draw = function () {

};
compileObj.callMethods = (function () {
    compileObj.init();
    for(var key in compileObj.unit){
        if(compileObj.defaults.unit.hasOwnProperty(key)){
            compileObj.defaults.unit[key]["context"] = compileObj.canvas.getContext('2d');
        }
    }
})();
window.requestAnimationFrame(function(event){
   console.log(event)
});