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
        enemy.width = random(45, 37);
        enemy.height = random(45, 37);
        if (!(enemyPosX + enemy.width + 10 < window.innerWidth)) {
            enemyPosX = 0;
            enemyPosY += 70;
        }
        enemyPosX += enemy.width + 10;
        enemy.left = enemyPosX;
        enemy.top = enemyPosY;
        enemy.stepX = random(0.8,2);
        enemy.stepY = random(0.8,2);
        enemy.color = "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
        return enemy;
    };
    var objJSON = {
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
    };
    return  {
        generateEnemy: generateEnemy,
        objJSON: objJSON,
        random: random

    };
});
