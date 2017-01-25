angular.module('app').controller("JuegoCtrl", function($scope, $state, $user, _mocifire) {

    if(!$user.id)
        return $state.go("init");

    $scope.saveScore = function () {
        _mocifire.database().ref("scores").child($user.id).transaction(function (userRef) {
            if(userRef){
                if(userRef.score < $scope.score){
                    userRef.score = $scope.score;
                    userRef.tiempos = $scope.evidence;
                    userRef.juegos += 1;
                }
            }
            return userRef;
        });

    }

    TurbulenzEngine = WebGLTurbulenzEngine.create({
        canvas: document.getElementById("ship")
    });

    /*      Turbulenz elements      */

    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({});
    var inputDevice = TurbulenzEngine.createInputDevice({});
    var draw2D = Draw2D.create({
        graphicsDevice: graphicsDevice
    });

    /*      Game variables     */

    var sixtyfps = 1000 / 60;
    var universalScore = 0;
    var mvmnt = 0;
    var mvmntSpeed = 2;
    var keyCodes = inputDevice.keyCodes;
    var offsetMovement = 30;                                    // How much to move left/right when pressing arrows
    var enemyOffsetMovementSpeed = 1;                           // How fast enemies move
    var enemySeparation = 400;                                  // Distance between enemies
    var enemyFallSpeed = 0.1;                                   // How much enemies move down every 0.0166666667 seconds
    var downSpace = 30;                                         // Distance from bottom to main character
    var xLeftLimit = 60;                                        // Left limit of "screen"
    var xRightLimit = 560;                                      // Right limit of "screen"
    var x1 = 50;                                                // Black background coordinate
    var y1 = 50;                                                // Black background coordinate
    var x2 = graphicsDevice.width - 50;                         // Black background coordinate
    var y2 = graphicsDevice.height - 50;                        // Black background coordinate
    var bullets = [];                                           // Array that contains all the bullets fired by the main character
    var badBullets = [];                                        // Array that contains all the bullets fired by enemies
    var enemies = [];                                           // Array containing all the enemies
    var rectangle = [x1, y1, x2, y2];                           // Formal figure of the rectangular background
    var bulletSpeed = 5;                                        // How fast the bullets move on each frame
    var badBulletSpeed = 2;                                     // How fast the enemy bullets move on each frame
    var badBulletProbability = 0.96;                            // Probability of an enemy shooting on a given frame. (1 - badBulletProbability)
    var badBulletAmount = 20;                                   // How much enemy bullets can be shown simultaneously
    var reloadTime = 400;                                       // Minimum time between the main character shootings. Avoids spammers
    var reload = 900;                                           // Internal variable for checking if can shoot
    var enemyRowSize = 6;                                       // Size of enemy grid
    var dead = false;                                           // Boolean to chek if character is alive
    var pause = false;                                          // Boolean to enable/disable game pauses
    var level = 0;                                              // Current Level
    var first = true;                                           // Press any key to start boolean
    var shipAsset = "assets/ship2.png";                           // Location of the ship image
    var bulletAsset = "assets/textures/particle_spark.png";     // Location of the bullet image
    var badBulletAsset = "assets/textures/particle_spark.png";  // Location of the bad bullet image
    var enemyAsset = "assets/enemy3.png";                         // Location of the enemy image
    var backgroundAsset = "assets/bg2.png";                       // Location of the background image
    var gogoAsset = "assets/game_over.png";                       // Location of the game over image
    var pauseAsset = "assets/pause.png";                          // Location of the pause image
    var anyKeyAsset = "assets/any_key.png";                       // Location of the intro message image
    var times = [];                                             // Array with all the timestamps of a level change
    var detailedTimes = {};                                     // Object with "level" : "elapsed time" specifications


    function initVars(){

        /*      Game variables     */

        var universalScore = 0;
        var mvmnt = 0;
        var enemyOffsetMovementSpeed = 1;                           // How fast enemies move
        var enemyFallSpeed = 0.1;                                   // How much enemies move down every 0.0166666667 seconds
        var bullets = [];                                           // Array that contains all the bullets fired by the main character
        var badBullets = [];                                        // Array that contains all the bullets fired by enemies
        var enemies = [];                                           // Array containing all the enemies
        var bulletSpeed = 5;                                        // How fast the bullets move on each frame
        var badBulletSpeed = 2;                                     // How fast the enemy bullets move on each frame
        var badBulletProbability = 0.96;                            // Probability of an enemy shooting on a given frame. (1 - badBulletProbability)
        var badBulletAmount = 20;                                   // How much enemy bullets can be shown simultaneously
        var reloadTime = 400;                                       // Minimum time between the main character shootings. Avoids spammers
        var reload = 900;                                           // Internal variable for checking if can shoot
        var dead = false;                                           // Boolean to chek if character is alive
        var pause = false;                                          // Boolean to enable/disable game pauses
        var level = 0;                                              // Current Level
        var first = true;                                           // Press any key to start boolean
        var times = [];                                             // Array with all the timestamps of a level change
        var detailedTimes = {};                                     // Object with "level" : "elapsed time" specifications
    }
    initVars();
    /*      Game Ojects     */

    // User spaceship
    var ship = Draw2DSprite.create({
        width: 30,
        height: 30,
        x: graphicsDevice.width / 2,
        y: graphicsDevice.height - downSpace
    });

    var shipTexture = graphicsDevice.createTexture({
        src: shipAsset,
        mipmaps: true,
        onload: function(texture) {
            if (texture) {
                ship.setTexture(texture);
                ship.setTextureRectangle([0, 0, texture.width, texture.height]);
            }
        }
    });

    //Background image
    var bg = Draw2DSprite.create({
        width: graphicsDevice.width,
        height: graphicsDevice.height,
        x: graphicsDevice.width / 2,
        y: graphicsDevice.height / 2
    });

    var bgTexture = graphicsDevice.createTexture({
        src: backgroundAsset,
        mipmaps: true,
        onload: function(texture) {
            if (texture) {
                bg.setTexture(texture);
                bg.setTextureRectangle([0, 0, texture.width, texture.height]);
            }
        }
    });

    //Game Over image
    var gameOver = Draw2DSprite.create({
        width: graphicsDevice.width,
        height: graphicsDevice.height,
        x: graphicsDevice.width / 2,
        y: graphicsDevice.height / 2
    });

    var gogoTexture = graphicsDevice.createTexture({
        src: gogoAsset,
        mipmaps: true,
        onload: function(texture) {
            if (texture) {
                gameOver.setTexture(texture);
                gameOver.setTextureRectangle([0, 0, texture.width, texture.height]);
            }
        }
    });

    //Pause asset
    var pauseImg = Draw2DSprite.create({
        width: 80,
        height: 30,
        x: graphicsDevice.width / 2,
        y: graphicsDevice.height / 2
    });

    var pauseTExture = graphicsDevice.createTexture({
        src: pauseAsset,
        mipmaps: true,
        onload: function(texture) {
            if (texture) {
                pauseImg.setTexture(texture);
                pauseImg.setTextureRectangle([0, 0, texture.width, texture.height]);
            }
        }
    });

    //Intro asset
    var anyKeyImg = Draw2DSprite.create({
        width: 300,
        height: 30,
        x: graphicsDevice.width / 2,
        y: graphicsDevice.height / 2
    });

    var anyKeyTexture = graphicsDevice.createTexture({
        src: anyKeyAsset,
        mipmaps: true,
        onload: function(texture) {
            if (texture) {
                anyKeyImg.setTexture(texture);
                anyKeyImg.setTextureRectangle([0, 0, texture.width, texture.height]);
            }
        }
    });

    //Listener for keyboard events <- SPACE ->
    var onKeyDown = function onKeyDownFn(keycode) {
        first = false;
        if (keycode === keyCodes.LEFT) {
            moveLeft();
        } else if (keycode === keyCodes.RIGHT) {
            moveRight();
        } else if (keycode === keyCodes.P) {
            if (!pause) {
                pause = true;
                reload = 0;
            } else {
                pause = false;
            }
        } else if (keycode === keyCodes.SPACE) {
            shoot();
        } else if (keycode === keyCodes.F) {
            mvmntSpeed *= 2;
        }
    };

    var onKeyUp = function onKeyUpFn(keycode) {
        if (keycode === keyCodes.LEFT) {
            stop();
        } else if (keycode === keyCodes.RIGHT) {
            stop();
        } else if (keycode === keyCodes.F) {
            mvmntSpeed /= 2;
        }
    };

    $('#shoot-btn').on('click',function(){
        shoot();
    });

    function shoot() {
        first = false;
        if (reload > reloadTime) {
            reload = 0;
            var toadd1 = Draw2DSprite.create({
                width: 2,
                height: 10,
                x: ship.x + 10,
                y: ship.y,
                color: [0.0, 1.0, 0.0, 1.0]
            });
            var toadd2 = Draw2DSprite.create({
                width: 2,
                height: 10,
                x: ship.x - 10,
                y: ship.y,
                color: [0.0, 1.0, 0.0, 1.0]
            });
            bullets.push(toadd1);
            bullets.push(toadd2);
            toadd1 = null;
            toadd2 = null;
        }
    }

    function moveLeft() {
        first = false;
        if (ship.x >= xLeftLimit) {
            mvmnt = -1 * mvmntSpeed;
        }
    }

    function moveRight() {
        first = false;
        if (ship.x <= xRightLimit) {
            mvmnt = mvmntSpeed;
        }
    }

    $('#left-btn').on('click', function() {
        mvmnt = 0;
        first = false;
        if (ship.x >= (xLeftLimit - 20)) {
            ship.x -= offsetMovement;
        }
    });

    $('#right-btn').on('click', function() {
        mvmnt = 0;
        first = false;
        if (ship.x <= (xRightLimit + 20)) {
            ship.x += offsetMovement;
        }
    });

    function stop() {
        mvmnt = 0;
    }

    inputDevice.addEventListener('keydown', onKeyDown);
    inputDevice.addEventListener('keyup', onKeyUp);

    /*
     *   Game functions
     */

    function newEnemy(i, j) {
        var en = Draw2DSprite.create({
            width: 30,
            height: 20,
            x: (enemySeparation * i / enemyRowSize) + (graphicsDevice.width / 4) + (j * 10),
            y: downSpace + (30 * j),
            direction: "right"
        });
        var shipTexture = graphicsDevice.createTexture({
            src: enemyAsset,
            mipmaps: true,
            onload: function(texture) {
                if (texture) {
                    en.setTexture(texture);
                    en.setTextureRectangle([0, 0, texture.width, texture.height]);
                }
            }
        });
        return en;
    }
    // Add new row of @enemyRowSize enemies
    function newLevel() {
        var ref = null;
        if (enemies.length != 0) {
            var ref = enemies.reduce(function(a, b) {
                return a.concat(b);
            });
        }
        if (enemies.length == 0 || ref.length == 0) {
            if (level != 0) {
                var newNow = new Date();
                var oldNow = times[times.length - 1];
                var timeDiff = Math.abs(newNow.getTime() - oldNow.getTime());
                var diffSecs = timeDiff / (1000.0);
                detailedTimes[level] = diffSecs;
            } else {
                var newNow = new Date();
            }
            times.push(newNow);
            level += 1;
            increaseDifficulty();
            for (var j = 0; j < 3; j++) {
                var tempRow = [];
                for (var i = 0; i < enemyRowSize; i++) {
                    tempRow.push(newEnemy(i, j))
                }
                enemies.push(tempRow)
            }
        }
    }

    // Render enemies
    function drawEnemies() {
        for (var i = 0; i < enemies.length; i++) {
            for (var j = 0; j < enemies[i].length; j++) {
                if ((enemies[i][j].y + (enemies[i][j].getHeight() / 2)) > (ship.y - (ship.getHeight() / 2))) {
                    die();
                }
                enemies[i][j].y += enemyFallSpeed;
                draw2D.drawSprite(enemies[i][j]);
            }
        }
    }

    // Delete bullets that went far outside from the canvas
    function deleteForgottenBullets() {
        $.each(bullets, function(key, value) {
            try {
                if (value.y <= 30) {
                    bullets.splice(key, 1);
                }
            } catch (e) {

            } finally {

            }
        });
        $.each(badBullets, function(key, value) {
            try {
                if (value.y > ship.y) {
                    badBullets.splice(key, 1);
                }
            } catch (e) {

            } finally {

            }
        });
    };

    /* Difficulty is defined by:
     *       - How fast enemies fall
     *       - How much bullets enemies shoot
     *       - How fast enemies move sideways
     *  Increased difficulty every 30 seconds
     */
    function increaseDifficulty() {
        if (!dead && !pause && !first) {
            enemyFallSpeed += 0.02;
            badBulletProbability -= 0.01;
            enemyOffsetMovementSpeed += 0.1;
            //reloadTime = reloadTime>=0?reloadTime-50:0;
        }
    }

    // Deletes bullets and enemies if colliding
    function collision() {
        for (var j = 0; j < bullets.length; j++) {
            var bulletPoint = {
                x: bullets[j].x,
                y: bullets[j].y - (bullets[j].getHeight() / 2)
            };
            for (var i = 0; i < enemies.length; i++) {
                for (var k = 0; k < enemies[i].length; k++) {
                    if (bulletPoint.x > enemies[i][k].x - (enemies[i][k].getWidth() / 2) &&
                        bulletPoint.x < enemies[i][k].x + (enemies[i][k].getWidth() / 2) &&
                        bulletPoint.y > enemies[i][k].y - (enemies[i][k].getHeight() / 2) &&
                        bulletPoint.y < enemies[i][k].y + (enemies[i][k].getHeight() / 2)) {
                        bullets.splice(j, 1);
                        enemies[i].splice(k, 1);
                        universalScore += 10;
                        $scope.score = universalScore;
                        $scope.evidence = detailedTimes;
                    }
                }
            }
        }
    }

    //Dies when character collides with enemy bullets
    function dieCollision() {
        for (var i = 0; i < badBullets.length; i++) {
            var badBulletPoint = {
                x: badBullets[i].x,
                y: badBullets[i].y + (badBullets[i].getHeight() / 2)
            };
            if (badBulletPoint.x > ship.x - (ship.getWidth() / 2) &&
                badBulletPoint.x < ship.x + (ship.getWidth() / 2) &&
                badBulletPoint.y > ship.y - (ship.getHeight() / 2) &&
                badBulletPoint.y < ship.y + (ship.getHeight() / 2)) {
                die();
            }
        }
    }

    // Called when main character dies
    function die() {
        dead = true;
        var deathTimer = new Date();
        var recent = times[times.length - 1];

        var timeDiff = Math.abs(deathTimer.getTime() - recent.getTime());
        var diffSecs = timeDiff / (1000.0);
        detailedTimes[level] = diffSecs;
        times.push(deathTimer);
        $scope.saveScore();
        setTimeout(function(){
            $state.go('puntajes');
        },3000);
    }

    function myMove() {
        if (mvmnt > 0) {
            if (ship.x <= (xRightLimit + 20)) {
                ship.x += mvmnt;
            }
        } else if (mvmnt < 0) {
            if (ship.x >= (xLeftLimit - 20)) {
                ship.x += mvmnt;
            }
        }
    }

    // Moves enemies their corresponding direction
    function enemyMove() {
        if (!dead && !pause && !first) {
            for (var i = 0; i < enemies.length; i++) {
                for (var j = 0; j < enemies[i].length; j++) {
                    if (enemies[i][j].direction == "right") {
                        var distance = 1;
                        if ((enemies[i][enemies[i].length - 1].x + (enemies[i][enemies[i].length - 1].getWidth() / 2)) >= xRightLimit) {
                            var distance = -1;
                            enemies[i][j].direction = "left";
                        }
                    } else {
                        var distance = -1;
                        if ((enemies[i][0].x - (enemies[i][0].getWidth() / 2)) <= xLeftLimit) {
                            var distance = 1;
                            enemies[i][j].direction = "right";
                        }
                    }

                    enemies[i][j].x += distance * enemyOffsetMovementSpeed;
                }
            }
        }
    }

    // Fills the enemy bullets array on a given @badBulletProbability chance to shoot or not
    function enemyShoot() {
        if (!dead && !pause && !first) {
            for (var i = 0; i < enemies.length; i++) {
                for (var j = 0; j < enemies[i].length; j++) {
                    if (Math.random() >= badBulletProbability && badBullets.length < badBulletAmount) {
                        var t = Draw2DSprite.create({
                            width: 2,
                            height: 10,
                            x: enemies[i][j].x,
                            y: enemies[i][j].y,
                            color: [1.0, 0.0, 0.0, 1.0]
                        });
                        badBullets.push(t);
                    }
                }
            }
        }
    }

    // Display score and update it every 0.0166666667 seconds
    function updateScore() {
        var lmnt = document.getElementById('score');
        lmnt.innerHTML = "Level " + level + " - " + universalScore + " points";
    }

    // Random generator found on Google :V
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 60 fps main screen updater
    function update() {

        if (graphicsDevice.beginFrame()) {
            draw2D.begin();
            if (!dead) {
                if (first) {
                    draw2D.drawSprite(anyKeyImg);
                } else {
                    draw2D.drawSprite(bg);
                    if (!pause) {

                        $.each(bullets, function(key, value) {
                            value.y -= bulletSpeed;
                            draw2D.drawSprite(value);
                        });
                        $.each(badBullets, function(key, value) {
                            value.y += badBulletSpeed;
                            draw2D.drawSprite(value);
                        });
                        draw2D.drawSprite(ship);
                        drawEnemies();
                        collision();
                        dieCollision();
                        updateScore();
                    } else {
                        draw2D.drawSprite(pauseImg);
                    }
                }
            } else {
                draw2D.drawSprite(gameOver);
            }
            draw2D.end();

            graphicsDevice.endFrame();
        }
    }

    // Set times for each function for when to update. 1000 for 1 second
    TurbulenzEngine.setInterval(enemyShoot, 200);
    TurbulenzEngine.setInterval(newLevel, sixtyfps);
    TurbulenzEngine.setInterval(enemyMove, sixtyfps);
    TurbulenzEngine.setInterval(update, sixtyfps);
    TurbulenzEngine.setInterval(deleteForgottenBullets, 100);
    TurbulenzEngine.setInterval(myMove, sixtyfps);
    TurbulenzEngine.setInterval(function() {
        if (!dead && !pause && !first) {
            reload += 10
        }
    }, 1000 / 100);

});
