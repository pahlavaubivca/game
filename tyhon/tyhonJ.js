var ctx, x = 0, y = 0, step = 3, topp = false, bottom = false, left = false, right = false, arrX = [], arrY = [];

var myCanvasField = document.getElementById('field');
var face, faceX0 = 3, faceY0 = 2.2, faceX1 = 12, faceY1 = 12;
var leftF = false, upF = false, downF = false, rightF = false;
var rx = 0, ry = 0, c = 0, s = 0, x0 = 0, y0 = 0, angle = 0.78;
var ang135 = false, ang45 = false, ang225 = false, ang315 = false;
var firee=false;

(function () {
    ctx = myCanvasField.getContext('2d');
    face = myCanvasField.getContext('2d');

    var enemy = myCanvasField.getContext('2d');
    var enemyX = 600, enemyY = 50;

    myCanvasField.height = 550;
    myCanvasField.width = 850;

    enemy.fillRect(enemyX,enemyY,50,300);
    enemy.fillStyle = "blue";
    enemy.fill();

    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, 5, 5);
    ctx.fill();
    function pushXY() {
        arrX.push(x);
        arrY.push(y);
    }
    function falseAng(){
        ang135 = false; ang45 = false; ang225 = false; ang315 = false;
    }
    pushXY();face.beginPath();face.moveTo(faceX0, faceY0);face.lineTo(faceX1, faceY1);face.stroke();

    onkeydown = function () {
        event.keyCode == 83 ? bottom = true : bottom;
        event.keyCode == 87 ? topp = true : topp;
        event.keyCode == 65 ? left = true : left;
        event.keyCode == 68 ? right = true : right;

        event.keyCode == 37 ? leftF = true : leftF;
        event.keyCode == 38 ? upF = true : upF;
        event.keyCode == 39 ? rightF = true : rightF;
        event.keyCode == 40 ? downF = true : downF;
        if(event.keyCode == 32){
            fire();
        }
    }
    onkeyup = function () {
        event.keyCode == 83 ? bottom = false : bottom;
        event.keyCode == 87 ? topp = false : topp;
        event.keyCode == 65 ? left = false : left;
        event.keyCode == 68 ? right = false : right;

        event.keyCode == 37 ? leftF = false : leftF;
        event.keyCode == 38 ? upF = false : upF;
        event.keyCode == 39 ? rightF = false : rightF;
        event.keyCode == 40 ? downF = false : downF;
        event.keyCode == 32 ? firee = false : firee;

        falseAng();
    }
    function rotate(alpha) {//обрахунок кута для повороту ствола
        x0 = faceX0 + 10;
        y0 = faceY0;
        rx = x0 - faceX0;
        ry = y0 - faceY0;
        c = Math.cos(alpha);
        s = Math.sin(alpha);
        faceX1 = faceX0 + rx * c - ry * s;
        faceY1 = faceY0 + rx * s + ry * c;
    }

    function drawLineAndRotate() {//функція для відмалювання ствола
        face.beginPath();
        face.moveTo(faceX0, faceY0);
        face.lineTo(faceX1, faceY1);
        face.stroke();
    }

var faceX1copy= 0,faceY1copy= 0,angleCopy=0;
var kill=0;
    var flyInterv=0;
    function fire() {
            function fly(pointX,pointY,ang){
                var bullet = myCanvasField.getContext('2d');
                bullet.fillStyle = "blue";
                var rx = 0, ry = 0, c = 0, s = 0, targX = 0, targY = 0, x0 = 0, y0 = 0, r = 1;
                function innerFly() {
                    bullet.clearRect(targX - 5, targY - 5, 15, 15);
                    x0 = pointX + r;
                    y0 = pointY;
                    rx = x0 - pointX;
                    ry = y0 - pointY;
                    c = Math.cos(ang);
                    s = Math.sin(ang);
                    targX = pointX + rx * c - ry * s;
                    targY = pointY + rx * s + ry * c;
                    bullet.fillRect(targX, targY, 3, 3);
                    bullet.fill();
                    r = r + 8;
                    flyInterv = setTimeout(innerFly,25);
                    if(r>1000){
                        clearInterval(flyInterv);
                    }

                    if(targX>=enemyX && targY>=enemyY && targY<=enemyY+300 && kill==0){
                        enemy.clearRect(enemyX,enemyY,50,300);
                        kill=1;
                        clearInterval(flyInterv);
                    }
                }
                innerFly();
            }
            fly(faceX1,faceY1,angle);
    }


    function loopF() {//  повороти ствола
        if (upF && leftF && angle!=-2.35) {//повороти під 45 град
            rotate(-2.35);angle = -2.35;drawLineAndRotate();ang135 = true;}
        if (upF && rightF) {rotate(-0.78);angle = -0.78;drawLineAndRotate();ang45 = true;}
        if (rightF && downF) {rotate(0.78); angle = 0.78;drawLineAndRotate();ang315 = true;}
        if (leftF && downF) {rotate(2.35);angle = 2.35;drawLineAndRotate();ang225 = true;}

        if (upF && !ang135 && !ang45) {//плавний поворот вверх
            if (faceY0 >= faceY1 && (angle >= -1.5 || angle <= -1.6)) {
                if (faceX0 < faceX1) {angle -= 0.1;}
                if (faceX0 > faceX1) {angle += 0.1;}
                rotate(angle);drawLineAndRotate();
            }
            if (angle <= -1.5 && angle >= -1.6) {//коли ствол підходить в верхню точку він фіксується
                faceX1 = faceX0;faceY1 = faceY0 - 10;angle = -1.6;
            }
            if (faceY0 < faceY1) {//якщо ствол знаходиться в протилежній півсфері відбувається митьевий поворот до верху
                faceX1 = faceX0;faceY1 = faceY0 - 10;angle = -1.6;drawLineAndRotate();
            }
        }

        if (leftF && !ang135 && !ang225) {// поворот наліво
            if (faceX0 >= faceX1 && angle != -3.14) {
                if (faceY0 > faceY1) {angle -= 0.1;}
                if (faceY0 < faceY1) {angle += 0.1;}
                rotate(angle); drawLineAndRotate();
            }
            if ((angle <= -3 && angle >= -3.2) || (angle > 3 && angle < 3.2)) {
                faceX1 = faceX0 - 10;faceY1 = faceY0;angle = -3.14;
            }
            if (faceX0 <= faceX1) {
                faceX1 = faceX0 - 10;faceY1 = faceY0;drawLineAndRotate();angle = -3.14;
            }
        }
        if (rightF && !ang45 && !ang315) {//поворот вправо
            if (faceX0 <= faceX1) {
                if (faceY0 > faceY1) {angle += 0.1;}
                if (faceY0 < faceY1) {angle -= 0.1;}
                rotate(angle);drawLineAndRotate();
            }
            if ((angle < 0.1 && angle > -0.001) || (angle > -0.1 && angle <= 0)) {
                faceX1 = faceX0 + 10;faceY1 = faceY0;angle = 0;
            }
            if (faceX0 > faceX1) {
                faceX1 = faceX0 + 10;faceY1 = faceY0;drawLineAndRotate();angle = 0;
            }
        }
        if (downF && !ang315 && !ang225) {//поворот вниз
            if (faceY0 <= faceY1 && (angle <= 1.5 || angle >= 1.6) || angle == -3.14) {
                if (faceX0 < faceX1) {angle += 0.1;}
                if (faceX0 > faceX1) {
                    if (angle < 0) {angle = angle * -1;angle -= 0.1;}
                    if (angle > 0) {angle -= 0.1;}
                }
                rotate(angle);drawLineAndRotate();
            }
            if (angle >= 1.45 && angle <= 1.65) {
                faceX1 = faceX0;faceY1 = faceY0 + 10;angle = 1.6;
            }
            if (faceY0 > faceY1) {
                faceX1 = faceX0;faceY1 = faceY0 + 10;angle = 1.6;drawLineAndRotate();
            }
        }
        setTimeout(loopF, 15);
    }
    loopF();
    function loop() {//рух точки
        ctx.clearRect(arrX[arrX.length - 1], arrY[arrY.length - 1], 5, 5);
        if (bottom && y < myCanvasField.height - 5) {
            ctx.fillRect(x, y + step, 5, 5);y += step;
            ctx.fill();face.beginPath();
            face.moveTo(faceX0, faceY0 + step);
            face.lineTo(faceX1, faceY1 + step);
            faceY0 += step;faceY1 += step;
            face.stroke();pushXY();
        }
        ctx.clearRect(arrX[arrX.length - 1], arrY[arrY.length - 1], 5, 5);
        if (topp && y > 0) {
            ctx.fillRect(x, y - step, 5, 5);y -= step;
            ctx.fill();face.beginPath();
            face.moveTo(faceX0, faceY0 - step);
            face.lineTo(faceX1, faceY1 - step);
            faceY0 -= step;faceY1 -= step;
            face.stroke();pushXY();
        }
        ctx.clearRect(arrX[arrX.length - 1], arrY[arrY.length - 1], 5, 5);
        if (left && x > 0) {
            ctx.fillRect(x - step, y, 5, 5);x -= step;
            ctx.fill();face.beginPath();
            face.moveTo(faceX0 - step, faceY0);
            face.lineTo(faceX1 - step, faceY1);
            faceX0 -= step;faceX1 -= step;
            face.stroke();pushXY();
        }
        ctx.clearRect(arrX[arrX.length - 1], arrY[arrY.length - 1], 5, 5);
        face.clearRect(x - 20, y - 20, 45, 45);
        if (right && x < myCanvasField.width - 5) {
            ctx.fillRect(x + step, y, 5, 5);x += step;
            ctx.fill();face.beginPath();
            face.moveTo(faceX0 + step, faceY0);
            face.lineTo(faceX1 + step, faceY1);
            faceX0 += step;faceX1 += step;
            face.stroke();pushXY();
        }
        else {
            ctx.fillRect(x, y, 5, 5);ctx.fill();face.beginPath();
            face.moveTo(faceX0, faceY0);
            face.lineTo(faceX1, faceY1);
            face.stroke();
        }
        setTimeout(loop, 25);
    }

    loop();
})
();