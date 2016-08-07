(function () {
    var leftS = false, rightS = false, positionShipX = 150, positionShipY = 450, step = 0;
    var arrEnemyX = [], arrEnemyY = [];
    var lives = 3;
    var livesDiv = document.getElementById('lives');
    var startButt = document.getElementById('start');
    startButt.onclick = function(){start();startButt.style.display='none';lives = 3;livesDiv.innerHTML = lives;};

   // livesDiv.innerHTML = lives;

    var startGame = false;
    var stopGame = false;

    var field = document.getElementById('field');
    field.width = '800';
    field.height = '500';

    var spaceShip = field.getContext('2d');
    spaceShip.fillStyle = 'white';
    spaceShip.fillRect(positionShipX, positionShipY, 40, 20);
    spaceShip.fill();

    //context.drawImage(imageObj, imageX, imageY);
    function start() {
        startGame = true;
        onkeydown = function () {
            event.keyCode == 37 ? leftS = true : leftS;
            event.keyCode == 39 ? rightS = true : rightS;
            if (event.keyCode == 32) {
                fire(positionShipX + 18);
            }
        };
        onkeyup = function () {
            event.keyCode == 37 ? leftS = false : leftS;
            event.keyCode == 39 ? rightS = false : rightS;
        };

        function enemy() {// generate enemy
            var posEnemyX = 70, posEnemyY = 20;
           // var enemy = field.getContext('2d');

            for (var i = 0; i < 10; i++) {
               // enemy.fillRect(posEnemyX, posEnemyY, 50, 10);
               // enemy.fill();

                arrEnemyX.push(posEnemyX);
                arrEnemyY.push(posEnemyY);
                posEnemyX += 70;
            }
        }

        enemy();
/////////////////////////////////////////////////////////


        var randomMoveEnemyFigure= 0, counterGenerateMoveEnemy = 0;

        function randomMoveEnemyFigureFunc() {
            randomMoveEnemyFigure = Math.random() * (4.2 - 1) + 1;
        }


        function moveEnemy(positionEnemyX,positionEnemyY,id){
            var smalRandomValue=0;
            function smallRandom(){
                smalRandomValue = Math.random() * (0.3 - 0.01) + 0.01;
            }


            var stepMoveEnemyX = 0, stepMoveEnemyY = 0;
            var enemyFigure = field.getContext('2d');
            var timeMoveEnemyLoop = 0;
            var xStep = 1.5, yStep=0.8;
            randomMoveEnemyFigureFunc();
            if (randomMoveEnemyFigure <= 1.5) {//left down

                stepMoveEnemyX =-xStep;
                stepMoveEnemyY =yStep;
            }
            if (randomMoveEnemyFigure <= 2 && randomMoveEnemyFigure > 1.5) {//right down

                stepMoveEnemyX =xStep;
                stepMoveEnemyY = yStep;
            }
            if(randomMoveEnemyFigure <= 3 && randomMoveEnemyFigure > 2){//right up

                stepMoveEnemyX =xStep;
                stepMoveEnemyY = -yStep;
            }
            if(randomMoveEnemyFigure <= 4 && randomMoveEnemyFigure > 3){//left up

                stepMoveEnemyX =-xStep;
                stepMoveEnemyY = -yStep;
            }
            else if(randomMoveEnemyFigure>4){
                stepMoveEnemyX =-xStep;
                stepMoveEnemyY = -yStep;
            }
            function moveEnemyLoop(){
                if(arrEnemyX[id]>-20) {// if enemy in zone vision(active)
                    enemyFigure.clearRect(arrEnemyX[id] - 1,arrEnemyY[id] - 1, 52, 12);

                    if(positionEnemyX < 0){
                        smallRandom();//random value for step, for speed up or speed down
                        if(Math.abs(stepMoveEnemyX)<2.1 && Math.abs(stepMoveEnemyX)>1.1) {
                            if(smalRandomValue<0.21) {
                                stepMoveEnemyX += smalRandomValue;// change koeficient
                            }
                            else{
                                stepMoveEnemyX -= smalRandomValue;
                            }
                        }
                        stepMoveEnemyX*=-1;
                        positionEnemyX = 0;
                    }
                    if( positionEnemyX+50 > 801){
                        smallRandom();//random value for step, for speed up or speed down
                        if(Math.abs(stepMoveEnemyX)<2.1 && Math.abs(stepMoveEnemyX)>1.1) {
                            if(smalRandomValue<0.21) {
                                stepMoveEnemyX += smalRandomValue;// change koeficient
                            }
                            else{
                                stepMoveEnemyX -= smalRandomValue;
                            }
                        }
                        stepMoveEnemyX*=-1;
                        positionEnemyX = 750;
                    }

                    if(positionEnemyY < 0 ){
                        smallRandom();//random value for step, for speed up or speed down
                        if(Math.abs(stepMoveEnemyY)<1.2 && Math.abs(stepMoveEnemyY)>0.5) {
                            if(smalRandomValue<0.21) {
                                stepMoveEnemyY += smalRandomValue;// change koeficient
                            }
                            else{
                                stepMoveEnemyY -= smalRandomValue;
                            }
                        }
                        stepMoveEnemyY*=-1;
                        positionEnemyY = 0;
                    }
                    if(positionEnemyY+10 > 230){
                        smallRandom();//random value for step, for speed up or speed down
                        if(Math.abs(stepMoveEnemyY)<1.2 && Math.abs(stepMoveEnemyY)>0.5) {
                            if(smalRandomValue<0.21) {
                                stepMoveEnemyY += smalRandomValue;// change koeficient
                            }
                            else{
                                stepMoveEnemyY -= smalRandomValue;
                            }
                        }
                        stepMoveEnemyY*=-1;
                        positionEnemyY = 220;
                    }
                   for(var j=0;j<arrEnemyX.length;j++){
                        if(j!=id){//across enemy
                            /*if((arrEnemyX[id]+50>arrEnemyX[j] && arrEnemyX[id]< arrEnemyX[j]+50) && (arrEnemyY[id]+10>arrEnemyY[j] && arrEnemyY[id]< arrEnemyY[j]+10)){
                                stepMoveEnemyX *= -1;
                                stepMoveEnemyY *= -1;
                                positionEnemyX += stepMoveEnemyX;
                                positionEnemyY += stepMoveEnemyY;
                            }*/
                            if (arrEnemyX[id] + 50 > arrEnemyX[j] && arrEnemyX[id] < arrEnemyX[j] + 50 && arrEnemyY[id] < arrEnemyY[j] + 10 && arrEnemyY[id] > arrEnemyY[j]+5) {//arrEnemyY[j] ���� arrEnemyY[id]
                                smallRandom();
                                if(Math.abs(stepMoveEnemyY)<1.2 && Math.abs(stepMoveEnemyY)>0.5) {//random value for step, for speed up or speed down
                                    if(smalRandomValue<0.21) {
                                        stepMoveEnemyY += smalRandomValue;// change step value
                                    }
                                    else{
                                        stepMoveEnemyY -= smalRandomValue;
                                    }
                                }
                                stepMoveEnemyY *= -1;
                                positionEnemyY += ((arrEnemyY[j] + 10) - arrEnemyY[id])+3;
                            }
                            else if (arrEnemyX[id] + 50 > arrEnemyX[j] && arrEnemyX[id] < arrEnemyX[j] + 50 && arrEnemyY[id]+10 > arrEnemyY[j] && arrEnemyY[id]+10 < arrEnemyY[j]+5) {//arrEnemyY[j] ����� arrEnemyY[id]
                                smallRandom();
                                if(Math.abs(stepMoveEnemyY)<1.2 && Math.abs(stepMoveEnemyY)>0.5) {//random value for step, for speed up or speed down
                                    if(smalRandomValue<0.21) {
                                        stepMoveEnemyY += smalRandomValue;// change step value
                                    }
                                    else{
                                        stepMoveEnemyY -= smalRandomValue;
                                    }
                                }
                                stepMoveEnemyY *= -1;
                                positionEnemyY -= ((arrEnemyY[id]+10) - arrEnemyY[j])+3;
                            }


                            else if (arrEnemyY[id] < arrEnemyY[j] + 10 && arrEnemyY[id] + 10 > arrEnemyY[j] && arrEnemyX[id]+50>arrEnemyX[j] && arrEnemyX[id]+50 < arrEnemyX[j]+25 ) {//arrEnemyX[id] left arrEnemyX[j]
                                smallRandom();
                                if(Math.abs(stepMoveEnemyX)<2.1 && Math.abs(stepMoveEnemyX)>1.1) {//random value for step, for speed up or speed down
                                    if(smalRandomValue<0.21) {
                                        stepMoveEnemyX += smalRandomValue;// change step value
                                    }
                                    else{
                                        stepMoveEnemyX -= smalRandomValue;
                                    }
                                }
                                stepMoveEnemyX *= -1;
                                positionEnemyX -= (arrEnemyX[id]+50) - arrEnemyX[j]+3;
                            }
                            else if (arrEnemyY[id] < arrEnemyY[j] + 10 && arrEnemyY[id] + 10 > arrEnemyY[j] && arrEnemyX[id]<arrEnemyX[j]+50 && arrEnemyX[id] > arrEnemyX[j]+25 ) {//arrEnemyX[id] right arrEnemyX[j]
                                smallRandom();
                                if(Math.abs(stepMoveEnemyX)<2.1 && Math.abs(stepMoveEnemyX)>1.1){//random value for step, for speed up or speed down
                                    if(smalRandomValue<0.21) {
                                        stepMoveEnemyX += smalRandomValue;// change step value
                                    }
                                    else{
                                        stepMoveEnemyX -= smalRandomValue;
                                    }
                                }

                                stepMoveEnemyX *= -1;
                                positionEnemyX += (arrEnemyX[j]+50) - arrEnemyX[id]+3;
                            }
                        }
                    }
                    positionEnemyX += stepMoveEnemyX;
                    positionEnemyY += stepMoveEnemyY;
                    enemyFigure.fillRect(positionEnemyX, positionEnemyY, 50, 10);
                    enemyFigure.fill();
                    arrEnemyX[id] = positionEnemyX;
                    arrEnemyY[id] = positionEnemyY;


                    timeMoveEnemyLoop = setTimeout(moveEnemyLoop, 50);
                }

                if(arrEnemyX[id]<=-20){
                    clearInterval(timeMoveEnemyLoop);
                }
            }
            moveEnemyLoop();

        }

        function moveEnemyForEach(){
            for(var i = 0;i<arrEnemyX.length;i++){
                moveEnemy(arrEnemyX[i],arrEnemyY[i],i);
            }
        }
        moveEnemyForEach();

        /////////////////////

        function enemyBulletF(posEnemyX,posEnemyY) {// overwrite fly enemy bullet
            var enemyBullet = field.getContext('2d');
            //var posEnemyY = 30;
            var enemyBulletFlyTime = 0;

            var count = false;// if false enemy bullet fly, if true bullet hidden

            function flyEnemyBullet() {
                enemyBullet.clearRect(posEnemyX-2, posEnemyY-3, 7, 7);
                posEnemyY += 5;
                enemyBullet.fillRect(posEnemyX, posEnemyY, 4, 4);
                enemyBullet.fill();
                enemyBulletFlyTime = setTimeout(flyEnemyBullet, 40);
                if(!startGame){//if spaceship lost all lives or game not started, enemy bullet not fly
                    enemyBullet.clearRect(posEnemyX, posEnemyY, 6, 6);
                    clearInterval(enemyBulletFlyTime);
                }
                if (posEnemyY > 500 && startGame) {//if position enemy bullet overflow field, bullet stop an clear
                    enemyBullet.clearRect(posEnemyX, posEnemyY, 6, 6);
                    clearInterval(enemyBulletFlyTime);
                }
                if (posEnemyX >= positionShipX - 4/*4 its width enemy bullet*/ && posEnemyX <= positionShipX + 40/*40 its spaceship width*/ && posEnemyY >= positionShipY && posEnemyY <= positionShipY + 20 && !count) {
                    enemyBullet.clearRect(posEnemyX, posEnemyY, 6, 6);
                    clearInterval(enemyBulletFlyTime);
                    count = true;
                    //lives--;

                    if(lives<0){
                        startGame = false;
                        startButt.style.display='block';
                    }
                    livesDiv.innerHTML = lives;
                }
            }

            flyEnemyBullet();
        }

        function enemyFire() {//function that define, enemy what fire
            var randomEnemy = Math.random() * (arrEnemyX.length - 0) + 0;
            for (var i = 0; i < arrEnemyX.length; i++) {
                if (i >= randomEnemy - 1 && i <= randomEnemy && startGame) {
                    enemyBulletF(arrEnemyX[i] + 22,arrEnemyY[i]);
                }
            }
        }
        function randomEnemyFire() {
            if(startGame) {
                enemyFire();
                setTimeout(randomEnemyFire, 200);
            }
        }
        randomEnemyFire();


        function fire(posX) { //function for fire spaceship
            var bullet = field.getContext('2d');
            var flyTime = 0;
            var flyStep = 0;

            function fly() {// loop fly bullet
                bullet.clearRect(posX, positionShipY - flyStep + 1, 3, 7);
                bullet.fillRect(posX, positionShipY - flyStep, 3, 3);
                bullet.fill();

                flyStep += 5;
                flyTime = setTimeout(fly, 20);
                if (flyStep > 500 && startGame) {
                    bullet.clearRect(posX - 5, positionShipY - flyStep - 14, 13, 146);
                    clearInterval(flyTime);
                }
                for (var i = 0; i < arrEnemyX.length; i++) {//definition crossing bullet and enemy(position enemy in array arrEnemyX)
                    if (posX >= arrEnemyX[i] && posX <= arrEnemyX[i] + 50 && positionShipY - flyStep <= arrEnemyY[i]) {

                        bullet.clearRect(arrEnemyX[i]-2, arrEnemyY[i]-5, 55, 39);
                        clearInterval(flyTime);
                        arrEnemyX[i] = -50;
                    }
                }
            }

            fly();
        }

        function loopShipMove() {//loop for check push navigation key <- and -> , for  moving spaceship
            if (leftS && positionShipX >= 0 && startGame) {
                spaceShip.clearRect(positionShipX, positionShipY, 40, 20);
                positionShipX -= step + 3;
                spaceShip.fillRect(positionShipX, positionShipY, 40, 20);
                spaceShip.fill();

            }
            if (rightS && positionShipX <= 760 && startGame) {
                spaceShip.clearRect(positionShipX, positionShipY, 40, 20);
                positionShipX += step + 3;
                spaceShip.fillRect(positionShipX, positionShipY, 40, 20);
                spaceShip.fill();

            }
            else {
                spaceShip.fillRect(positionShipX, positionShipY, 40, 20);
                spaceShip.fill();
            }
            setTimeout(loopShipMove, 15);
        }

        loopShipMove();
    }

})();