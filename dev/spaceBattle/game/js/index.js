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
    var collision = null;

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

        if (Date.now() - lastDateFPS > 300) {
            fpsDiv.innerHTML = fps;
            lastDateFPS = Date.now()
        }
    };

    requirejs(["../js/initial.js"], function (initObj) {
        init = initObj;
        mainHero = init.mainHero();
        requirejs(["../js/collision.js"],shapes, function (obj) {
            collision = obj.collision;
            generateShape();
            requestAnimation();
            requirejs(["../js/event.js"], function (obj) {
                obj.init(mainHero);
            });
        })
    });
})();