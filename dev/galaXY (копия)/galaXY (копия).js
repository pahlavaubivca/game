(function () {
    var leftS = false, rightS = false, positionShipX = 150, positionShipY = 450, step = 0;
    var arrEnemyX = [], arrEnemyY = [];
    var lives = 3;
    var livesDiv = document.getElementById('lives');
    var startButt = document.getElementById('start');
    startButt.onclick = function(){start();startButt.style.display='none';lives = 3;livesDiv.innerHTML = lives;};

    livesDiv.innerHTML = lives;

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
            var enemy = field.getContext('2d');

            for (var i = 0; i < 10; i++) {

                function
                enemy.fillRect(posEnemyX, posEnemyY, 50, 10);
                enemy.fill();

                arrEnemyX.push(posEnemyX);
                posEnemyX += 70;
            }
        }

        enemy();

        function enemyBulletF(posEnemyX) {
            var enemyBullet = field.getContext('2d');
            var posEnemyY = 30;
            var enemyBulletFlyTime = 0;

            var count = false;

            function flyEnemyBullet() {
                enemyBullet.clearRect(posEnemyX, posEnemyY, 6, 6);
                posEnemyY += 5;
                enemyBullet.fillRect(posEnemyX, posEnemyY, 4, 4);
                enemyBullet.fill();
                enemyBulletFlyTime = setTimeout(flyEnemyBullet, 40);
                if(!startGame){
                    enemyBullet.clearRect(posEnemyX, posEnemyY, 6, 6);
                    clearInterval(enemyBulletFlyTime);
                }
                if (posEnemyY > 500 && startGame) {
                    enemyBullet.clearRect(posEnemyX, posEnemyY, 6, 6);
                    clearInterval(enemyBulletFlyTime);
                }
                if (posEnemyX >= positionShipX - 4/*4 its width enemy bullet*/ && posEnemyX <= positionShipX + 40 && posEnemyY >= positionShipY && posEnemyY <= positionShipY + 20 && !count) {
                    enemyBullet.clearRect(posEnemyX, posEnemyY, 6, 6);
                    clearInterval(enemyBulletFlyTime);
                    count = true;
                    lives--;
                    livesDiv.innerHTML = lives;
                    if(lives<0){
                        startGame = false;
                        startButt.style.display='block';
                    }

                }
            }

            flyEnemyBullet();
        }

        function enemyFire() {
            var randomEnemy = Math.random() * (arrEnemyX.length - 0) + 0;
            for (var i = 0; i < arrEnemyX.length; i++) {
                if (i >= randomEnemy - 1 && i <= randomEnemy && startGame) {
                    enemyBulletF(arrEnemyX[i] + 22);
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
                bullet.clearRect(posX, positionShipY - flyStep + 24, 3, 5);
                bullet.fillRect(posX, positionShipY - flyStep, 3, 3);
                bullet.fill();

                flyStep += 24;
                flyTime = setTimeout(fly, 50);
                if (flyStep > 500 && startGame) {
                    bullet.clearRect(posX - 5, positionShipY - flyStep - 14, 13, 146);
                    clearInterval(flyTime);
                }
                for (var i = 0; i < arrEnemyX.length; i++) {//definition crossing bullet and enemy(position enemy in array arrEnemyX)
                    if (posX >= arrEnemyX[i] && posX <= arrEnemyX[i] + 50 && positionShipY - flyStep <= 20) {

                        bullet.clearRect(arrEnemyX[i], 20, 50, 35);
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