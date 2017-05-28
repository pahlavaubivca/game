/**
 * Created by pahlavaubivca on 30.04.2017.
 */
(function () {
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = "rgba(0,0,0,0.1)";

    var ctx = canvas.getContext("2d");

    var shapes = []
    var count = 0;
    var left = 10;
    var random = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    };

    var reDrawField = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.background = "rgba(0,0,0,0.1)";
    };

    var generateShape = function () {
        left = left < window.innerWidth - 200 ? left + random(100, 60) : 10;
        var randomName = "shape" + count;
        var width = random(60, 40);
        var height = random(60, 40);
        var top = random(100, 60);
        shapes.push({
            width: width,
            height: height,
            centerX: left + width / 2,
            centerY: top + height / 2,
            background: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
            left: left,
            top: top,
            stepX: Math.random() * (2 - 0.8) + 0.8,
            stepY: Math.random() * (2 - 0.8) + 0.8,
            distanceToCorner: Math.sqrt((Math.pow((left + width / 2) - left, 2) + Math.pow((top + height / 2) - top, 2))),
            distansToNearest: 0,
        });

        count++;
    };

    for (var i = 0; i < 5000; i++) {
        generateShape();
    }
    var distance = function (x, y, x1, y1) {
        return Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2))
    };

    var collision = function () {
        for (var i = 0; i < shapes.length; i++) {
            if (shapes[i].left + shapes[i].width > window.innerWidth || shapes[i].left < 0) {
                shapes[i].stepX *= -1;
            }
            if (shapes[i].top + shapes[i].height > window.innerHeight || shapes[i].top < 0) {
                shapes[i].stepY *= -1;
            }
            move(i);
        }
        /*for (var key in shapes) {
         if (shapes.hasOwnProperty(key)) {
         /!*for (var key2 in shapes) {
         if (shapes.hasOwnProperty(key2) && key2 != key) {
         if (distance(shapes[key].centerX, shapes[key].centerY, shapes[key2].centerX, shapes[key2].centerY) <=
         shapes[key].distanceToCorner + shapes[key2].distanceToCorner) {
         //console.log("alarm!")
         } else {

         }
         }
         }*!/
         if (shapes[key].left + shapes[key].width > window.innerWidth || shapes[key].left < 0) {
         shapes[key].stepX *= -1;
         }
         if (shapes[key].top + shapes[key].height > window.innerHeight || shapes[key].top < 0) {
         shapes[key].stepY *= -1;
         }
         move(key);
         }
         }*/
    };

    var move = function (shape) {
        shapes[shape].left += shapes[shape].stepX;
        shapes[shape].top += shapes[shape].stepY;
        shapes[shape].centerX += shapes[shape].stepX / 2;
        shapes[shape].centerY += shapes[shape].stepY / 2;
    };

    var draw = function () {
        ctx = canvas.getContext("2d");
        for (var key = 0; key < shapes.length; key++) {
            ctx.fillRect(shapes[key].left, shapes[key].top, shapes[key].width, shapes[key].height);
            ctx.fillStyle = shapes[key].background;
            ctx.fill();
        }
        /*
         for (var key in shapes) {
         if (shapes.hasOwnProperty(key)) {
         ctx.fillRect(shapes[key].left, shapes[key].top, shapes[key].width, shapes[key].height);
         ctx.fillStyle = shapes[key].background;
         ctx.fill();
         }
         }*/
    };

    var fps = 0, lastCalledTime = 0;
    var fpsDiv = document.getElementById("fps");
    var requestAnimation = function () {
        reDrawField();
        collision();
        draw();


        window.requestAnimationFrame(requestAnimation);
        if (!lastCalledTime) {
            lastCalledTime = Date.now();
            fps = 0;
            return;
        }
        delta = (Date.now() - lastCalledTime) / 1000;
        lastCalledTime = Date.now();
        fps = 1 / delta;
        fpsDiv.innerHTML = fps;
    };
    requestAnimation();

})();