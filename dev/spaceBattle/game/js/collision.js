/**
 * Created by pahlavaubivca on 30.04.2017.
 */
(function () {
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = "rgba(0,0,0,0.1)";

    var ctx = canvas.getContext("2d");

    var shapes = {};
    var count = 0;
    var left = 10;

    var generateShape = function () {
        left = left + 60;
        var randomName = "shape"+count;
        shapes[randomName] = {
            width: 50,
            height: 50,
            background: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
            left: left,
            top: 50
        };
        count++;
    };

    for (var i = 0; i < 5; i++) {
        generateShape();
    }

    var collision = function(){
        for(var key in shapes){
            if(shapes.hasOwnProperty(key)){
                for(var key2 in shapes){
                    if(shapes.hasOwnProperty(key2) && key2 != key){

                    }
                }
            }
        }
    };

    var draw = function () {
        for (var key in shapes) {
            if (shapes.hasOwnProperty(key)) {
                ctx.fillRect(shapes[key].left, shapes[key].top, shapes[key].width, shapes[key].height);
                ctx.fillStyle = shapes[key].background;
                ctx.fill();
            }
        }
    };

    var requestAnimation = function () {
        draw();
        window.requestAnimationFrame(requestAnimation)
    };
    requestAnimation();

})();