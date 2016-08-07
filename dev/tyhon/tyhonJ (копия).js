var ctx, x = 0, y = 0, step = 3, topp = false, bottom = false, left = false, right = false, arrX = [], arrY = [];
var arrFX0=[],arrFX1=[],arrFY0=[],arrFY1=[];
var myCanvasField = document.getElementById('field');
var face, faceX0=2, faceY0=2,faceX1=12,faceY1=12;
var leftF=false,upF=false,downF=false,rightF=false,leftFdirect=false,upFdirect=false,rightFdirect=false,downFdirect=false;
(function () {
    ctx = myCanvasField.getContext('2d');
    face = myCanvasField.getContext('2d');
    myCanvasField.height = 550;
    myCanvasField.width = 850;

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(x, y, 5, 5);
    ctx.fill();
    function pushXY() {
        arrX.push(x);
        arrY.push(y);
    }
    pushXY();
    face.beginPath();
    face.moveTo(faceX0, faceY0);
    face.lineTo(faceX1, faceY1);
    face.stroke();
//<-37 | up - 38 -> 39  |-down - 40

    onkeydown = function () {
        //console.log(event.keyCode);
        event.keyCode == 83 ? bottom = true : bottom;
        event.keyCode == 87 ? topp = true : topp;
        event.keyCode == 65 ? left = true : left;
        event.keyCode == 68 ? right = true : right;

        event.keyCode == 37 ? leftF=true:leftF;
        event.keyCode == 38 ? upF=true:upF;
        event.keyCode == 39 ? rightF=true:rightF;
        event.keyCode == 40 ? downF=true:downF;
    }
    onkeyup = function () {
        event.keyCode == 83 ? bottom = false : bottom;
        event.keyCode == 87 ? topp = false : topp;
        event.keyCode == 65 ? left = false : left;
        event.keyCode == 68 ? right = false : right;

        event.keyCode == 37 ? leftF=false:leftF;
        event.keyCode == 38 ? upF=false:upF;
        event.keyCode == 39 ? rightF=false:rightF;
        event.keyCode == 40 ? downF=false:downF;
    }
    function loopF(){
        if(faceY0==faceY1){
            leftFdirect=true;
        }
        else if(faceY0!=faceY1){
            leftFdirect=false;
        }

        if(upF){

        }
        if(leftF){

            if(faceY0<=faceY1 && !leftFdirect){
                face.beginPath();
                face.moveTo(faceX0-0.5, faceY0+1);
                face.lineTo(faceX1+0.5, faceY1-1);
                faceX0-=0.5;faceX1+=0.5;faceY0+=1;faceY1-=1;
                face.stroke();
            }
            else if(faceY0>faceY1 && !leftFdirect){
                face.beginPath();
                face.moveTo(faceX0+0.5, faceY0+1);
                face.lineTo(faceX1-0.5, faceY1-1);
                faceX0+=0.5;faceX1-=0.5;faceY0+=1;faceY1-=1;
                face.stroke();
            }
        }
        if(rightF){
            if(faceY0>=faceY1){
                face.beginPath();
                face.moveTo(faceX0-0.5, faceY0-1);
                face.lineTo(faceX1+0.5, faceY1+1);
                faceX0-=0.5;faceX1+=0.5;faceY0-=1;faceY1+=1;
                face.stroke();
            }
            else if(faceY0<faceY1){
                face.beginPath();
                face.moveTo(faceX0+0.5, faceY0-1);
                face.lineTo(faceX1-0.5, faceY1+1);
                faceX0+=0.5;faceX1-=0.5;faceY0-=1;faceY1+=1;
                face.stroke();
            }
        }
        if(downF){

        }
        setTimeout(loopF,15);
    }
    loopF();
    function loop() {

        ctx.clearRect(arrX[arrX.length - 1], arrY[arrY.length - 1], 5, 5);

        if (bottom && y<myCanvasField.height-5) {
            ctx.fillRect(x, y + step, 5, 5);
            y += step;
            ctx.fill();
            face.beginPath();
            face.moveTo(faceX0, faceY0+step);
            face.lineTo(faceX1, faceY1+step);
            faceY0+=step;faceY1+=step;
            face.stroke();
            pushXY();
        }
        ctx.clearRect(arrX[arrX.length - 1], arrY[arrY.length - 1], 5, 5);

        if (topp && y>0) {
            ctx.fillRect(x, y - step, 5, 5);
            y -= step;
            ctx.fill();
            face.beginPath();
            face.moveTo(faceX0, faceY0-step);
            face.lineTo(faceX1, faceY1-step);
            faceY0-=step;faceY1-=step;
            face.stroke();
            pushXY();
        }
        ctx.clearRect(arrX[arrX.length - 1], arrY[arrY.length - 1], 5, 5);
        if (left && x>0) {
            ctx.fillRect(x - step, y, 5, 5);
            x -= step;
            ctx.fill();
            face.beginPath();
            face.moveTo(faceX0-step, faceY0);
            face.lineTo(faceX1-step, faceY1);
            faceX0-=step;faceX1-=step;
            face.stroke();
            pushXY();
        }
        ctx.clearRect(arrX[arrX.length - 1], arrY[arrY.length - 1], 5, 5);
        face.clearRect(x-20, y-20, 45, 45);
        if (right && x<myCanvasField.width-5) {
            ctx.fillRect(x + step, y, 5, 5);
            x += step;
            ctx.fill();
            face.beginPath();
            face.moveTo(faceX0+step, faceY0);
            face.lineTo(faceX1+step, faceY1);
            faceX0+=step;faceX1+=step;
            face.stroke();
            pushXY();
        }
        else {
            ctx.fillRect(x, y, 5, 5);
            ctx.fill();
            face.beginPath();
            face.moveTo(faceX0, faceY0);
            face.lineTo(faceX1, faceY1);
            face.stroke();
        }
        setTimeout(loop, 25);
    }
    loop();
})();