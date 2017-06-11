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
    var top = 10;
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
        var width = random(6, 14);
        var height = random(6, 14);
        top = top < window.innerHeight - 200 ? top + random(100, 60) : 10;
        shapes.push({
            width: width,
            height: height,
            centerX: left + width / 2,
            centerY: top + height / 2,
            background: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
            leftSide: left,
            topSide: top,
            stepX: Math.random() * (2 - 0.8) + 0.8,
            stepY: Math.random() * (2 - 0.8) + 0.8,
            distanceToCorner: Math.sqrt((Math.pow((left + width / 2) - left, 2) + Math.pow((top + height / 2) - top, 2))),
            distansToNearest: 0,
        });

        count++;
    };

    for (var i = 0; i < 1000; i++) {
        generateShape();
    }
    var distance = function (x, y, x1, y1) {
        return Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2))
    };

    var collision = function () {
        for (var i = 0; i < shapes.length; i++) {
            var si = shapes[i];
            for (var j = i + 1; j < shapes.length; j++) {
                var sj = shapes[j];
                var bW = sj.leftSide - si.leftSide > 0 ? si.width : sj.width;
                var bH = sj.topSide - si.topSide > 0 ? si.height : sj.height;
                var xDif = Math.abs(sj.leftSide - si.leftSide) - bW;
                var yDif = Math.abs(sj.topSide - si.topSide) - bH;
                if (xDif < 0 && yDif < 0) {
                    xDif *= -1;
                    yDif *= -1;
                    if (xDif < yDif) { // collision x coordinate
                        if (sj.stepX > 0 && si.stepX > 0) {
                            sj.leftSide > si.leftSide ? (si.stepX *= -1) : (sj.stepX *= -1);
                        } else if (sj.stepX < 0 && si.stepX < 0) {
                            sj.leftSide > si.leftSide ? (sj.stepX *= -1) : (si.stepX *= -1);
                        } else {
                            sj.stepX *= -1;
                            si.stepX *= -1;
                        }
                    }
                    else if (xDif >= yDif) {
                        if (sj.stepY > 0 && si.stepY > 0) {
                            sj.topSide > si.topSide ? (si.stepY *= -1) : (sj.stepY *= -1);
                        } else if (sj.stepY < 0 && si.stepY < 0) {
                            sj.topSide > si.topSide ? (sj.stepY *= -1) : (si.stepY *= -1);
                        } else {
                            sj.stepY *= -1;
                            si.stepY *= -1;
                        }
                    }
                }
            }
            if (si.leftSide + si.width > window.innerWidth || si.leftSide < 0) {
                shapes[i].stepX *= -1;
            }
            if (si.topSide + si.height > window.innerHeight || si.topSide < 0) {
                si.stepY *= -1;
            }
            move(i);
        }
    };

    var move = function (shape) {
        shapes[shape].leftSide += shapes[shape].stepX;
        shapes[shape].topSide += shapes[shape].stepY;
        shapes[shape].centerX += shapes[shape].stepX / 2;
        shapes[shape].centerY += shapes[shape].stepY / 2;

    };

    var draw = function () {
        ctx = canvas.getContext("2d");
        for (var key = 0; key < shapes.length; key++) {
            ctx.fillRect(shapes[key].leftSide, shapes[key].topSide, shapes[key].width, shapes[key].height);
            ctx.fillStyle = shapes[key].background;
            ctx.fill();
        }

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