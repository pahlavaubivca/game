/**
 * Created by pahlavaubivca on 30.04.2017.
 */
(function () {
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = "rgba(0,0,0,0.1)";

    var ctx = canvas.getContext("2d");
    var init = null;
    var fps = 0, lastCalledTime = 0;
    var fpsDiv = document.getElementById("fps");
    var lastDateFPS = 0;

    var mainHero = null;

    var shapes = [];

    var reDrawField = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.background = "rgba(0,0,0,0.1)";
    };

    var generateShape = function () {
        for (var i = 0; i < 10; i++) {
            shapes.push(init.generateEnemy());
        }
    };

    var collision = function () {
        for (var i = 0; i < shapes.length; i++) {
            var si = shapes[i];
            for (var j = i + 1; j < shapes.length; j++) {
                var sj = shapes[j];
                var bW = sj.left - si.left > 0 ? si.width : sj.width;
                var bH = sj.top - si.top > 0 ? si.height : sj.height;
                var xDif = Math.abs(sj.left - si.left) - bW;
                var yDif = Math.abs(sj.top - si.top) - bH;
                if (xDif < 0 && yDif < 0) {
                    xDif *= -1;
                    yDif *= -1;
                    if (xDif < yDif) { // collision x coordinate
                        if (sj.stepX > 0 && si.stepX > 0) {
                            sj.left > si.left ? (si.stepX *= -1) : (sj.stepX *= -1);
                        } else if (sj.stepX < 0 && si.stepX < 0) {
                            sj.left > si.left ? (sj.stepX *= -1) : (si.stepX *= -1);
                        } else {
                            sj.stepX *= -1;
                            si.stepX *= -1;
                        }
                    }
                    else if (xDif >= yDif) {
                        if (sj.stepY > 0 && si.stepY > 0) {
                            sj.top > si.top ? (si.stepY *= -1) : (sj.stepY *= -1);
                        } else if (sj.stepY < 0 && si.stepY < 0) {
                            sj.top > si.top ? (sj.stepY *= -1) : (si.stepY *= -1);
                        } else {
                            sj.stepY *= -1;
                            si.stepY *= -1;
                        }
                    }
                }
            }
            if (si.left + si.width > window.innerWidth || si.left < 0) {
                shapes[i].stepX *= -1;
            }
            if (si.top + si.height > window.innerHeight || si.top < 0) {
                si.stepY *= -1;
            }
            move(i);
        }
    };

    var move = function (shape) {
        shapes[shape].left += shapes[shape].stepX;
        shapes[shape].top += shapes[shape].stepY;
        draw(shapes[shape]);
    };

    var draw = function (shape) {
        ctx = canvas.getContext("2d");
        ctx.fillRect(shape.left, shape.top, shape.width, shape.height);
        ctx.fillStyle = shape.color;
        ctx.fill();
    };


    var requestAnimation = function () {
        reDrawField();
        collision();

        window.requestAnimationFrame(requestAnimation);
        if (!lastCalledTime) {
            lastCalledTime = Date.now();
            fps = 0;
            return;
        }
        delta = (Date.now() - lastCalledTime) / 1000;
        lastCalledTime = Date.now();
        fps = 1 / delta;

        if(Date.now() - lastDateFPS>300){
            fpsDiv.innerHTML = fps;
            lastDateFPS = Date.now()
        }
    };

    requirejs(["../js/initial.js"],function(initObj){
        init = initObj;
        mainHero = init.mainHero();
        generateShape();
        requestAnimation();
       /* requirejs(["../js/event.js"],function(obj){
            obj.init(mainHero);
        });*/
    });
})();