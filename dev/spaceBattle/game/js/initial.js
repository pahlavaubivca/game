define(function () {
    /*var distance = function (x, y, x1, y1) {
     return Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2))
     };*/
    var random = function (min, max) {
        return Math.random() * (max - min) + min; // Math.floor()
    };

    var enemyPosX = 10;
    var enemyPosY = 10;
    var generateEnemy = function () {
        var enemy = {};// objJSON.unit.enemy();
        enemy.width = random(18, 23);
        enemy.height = random(15, 24);
        if (!(enemyPosX + enemy.width + 10 < window.innerWidth)) {
            enemyPosX = 0;
            enemyPosY += 20;
        }
        enemyPosX += enemy.width + 10;
        enemy.left = enemyPosX;
        enemy.top = enemyPosY;
        enemy.stepX = random(0.8, 2);
        enemy.stepY = random(0.8, 2);
        enemy.color = "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
        enemy.enemy = true;
        enemy.xDif = 0;
        enemy.yDif = 0;
        enemy.yZone = window.innerHeight;
        return enemy;
    };

    var mainHero = function () {
        var mh = {};
        mh.width = 50;
        mh.height = 25;
        mh.left = 100;
        mh.top = 50;
        mh.moveStepX = 4;
        mh.moveStepY = 2;
        mh.color = "red";
        mh.mLeft = null;
       // mh.mRight = false;
        mh.mTop = null;
        //mh.mBottom = false;
        mh.mainHero = true;
        return mh;
    };
    /*var objJSON = {
     field: {
     obstruction: {
     meteor: {}
     },
     width: window.innerWidth,
     height: window.innerHeight,
     color: 0
     },
     unit: {
     nps: function () {
     return {
     active: false,
     physicalCharact: {
     width: 25,
     height: 15,
     weight: 1,
     color: "#" + (Math.random() * 0xFFFFFF << 0).toString(16),
     texture: "",
     left: 10,
     top: 30,
     stepX: 1,
     stepY: 1,
     fire: false
     },
     level: {}
     }
     },
     mainHero: function () {
     return {
     active: true,
     physicalCharact: {
     width: 50,
     height: 50,
     weight: 3,
     color: "#" + (Math.random() * 0xFFFFFF << 0).toString(16),
     texture: "",
     left: 10,
     top: 30,
     stepx: 6,
     stepy: 6,
     leftMove: -1,
     rightMove: -1,
     topMove: -1,
     downMove: -1,
     fire: false
     },
     level: {
     life: 3,
     speed: 1,
     armor: 1,
     weapon: "",
     shield: 0,
     hull: "standart"
     }
     }
     },
     bullet: {
     active: false,
     physicalCharact: {
     width: 5,
     height: 5,
     weight: 1,
     color: "green",
     position: {
     x: 0,
     y: 0
     },
     stepx: 0,
     stepy: 20,
     leftMove: false,
     rightMove: false,
     topMove: false,
     downMove: false
     }
     }
     },
     hull: {
     standart: {},
     light: {},
     middle: {},
     heavy: {},
     terminator: {}
     },
     weapon: {
     standart: {},
     atomatic: {},
     shotgun: {},
     epicShotgun: {},
     missile: {},
     laser: {},
     mrp: {},
     doom: {}
     }
     };*/
    return {
        generateEnemy: generateEnemy,
        random: random,
        mainHero: mainHero

    };
});
