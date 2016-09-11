/**
 * Created by kitpes on 11.09.2016.
 */
var compileObj = {};

compileObj.init = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    if(compileObj.defaults){
        var param = compileObj.defaults;
        context.width = param.field.width+'%';
        context.height = param.field.height+'%';
    }
};
compileObj.defaults = (function () {
    return {
        "field": {
            "obstruction":{
                "meteor":{}
            },
            "width": 100,
            "height": 100
        },
        "unit": {
            "enemy": {},
            "nps": {},
            "GG": {
                "size":{
                    "width":50,
                    "height":25,
                    "weight":3
                },
                "level":{
                    "life":3,
                    "speed":1,
                    "armor":1,
                    "weapon":"",
                    "shield":0,
                    "hull":"standart"
                }
            },
            "hull":{
                "standart":{},
                "light":{},
                "middle":{},
                "heavy":{},
                "terminator":{}
            },
            "weapon":{
                "standart":{},
                "atomatic":{},
                "shotgun":{},
                "epicShotgun":{},
                "missile":{},
                "laser":{},
                "mrp":{},
                "doom":{}
            }

        }
    }
})();

compileObj.GG = function(){

};
compileObj.draw = function(){

};
compileObj.callMethods = (function () {
    compileObj.init();
    //compileObj.GG();
})();