(function () {
    var left = false, right = false, spaceShipPositionX = 150, spaceShipPositionY = 420, step = 3;

    var field = document.getElementById('field');
    field.width = 800;
    field.height = 500;

    var spaceShip = field.getContext('2d');
    var img = new Image;
    img.onload = function () {
        spaceShip.drawImage(img, spaceShipPositionX, spaceShipPositionY);
    };
    img.src = 'spaceShip.png';


    onkeydown = function () {
        event.keyCode == 37 ? left = true : left;
        event.keyCode == 39 ? right = true : right;
        if (event.keyCode == 32) {
            fire();
        }
    };
    onkeyup = function () {
        event.keyCode == 37 ? left = false : left;
        event.keyCode == 39 ? right = false : right;
    };

    function fire() {
        function fly(posX) {
            var bullet = field.getContext('2d');
            var step = 0, timeFly = 0;
            bullet.fillStyle = 'red';
            function flyBull() {
                bullet.clearRect(posX, spaceShipPositionY - step, 5, 5);
                bullet.fillRect(posX, spaceShipPositionY - step, 2, 2);
                bullet.fill();

                timeFly = setTimeout(flyBull, 10);
                if (step > 500) {
                    clearInterval(timeFly);
                    bullet.clearRect(posX, spaceShipPositionY - step, 5, 5);
                }
                step += 3;
            }
            flyBull();
        }
        fly(spaceShipPositionX + 19);
    }

    function loopMove() {
        if (left && spaceShipPositionX >= 0) {
            spaceShip.clearRect(spaceShipPositionX - 10, spaceShipPositionY - 10, 60, 40);
            spaceShipPositionX -= step;
            spaceShip.drawImage(img, spaceShipPositionX, spaceShipPositionY);
        }
        if (right && spaceShipPositionX <= 760) {
            spaceShip.clearRect(spaceShipPositionX - 10, spaceShipPositionY - 10, 60, 40);
            spaceShipPositionX += step;
            spaceShip.drawImage(img, spaceShipPositionX, spaceShipPositionY);
        }
        else {
            spaceShip.drawImage(img, spaceShipPositionX, spaceShipPositionY);
        }
        setTimeout(loopMove, 15);
    }
    loopMove();
})();