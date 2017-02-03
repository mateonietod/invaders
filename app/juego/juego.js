angular.module('app').controller("JuegoCtrl", function($scope, $state, $user, _mocifire) {
    if (!$user.id) return $state.go("init");
    TurbulenzEngine = WebGLTurbulenzEngine.create({
        canvas: document.getElementById("ship")
    });
    var oiuh6dtwfdq = TurbulenzEngine.createGraphicsDevice({});
    var poijd8duiwq = TurbulenzEngine.createInputDevice({});
    var draw2D = Draw2D.create({
        graphicsDevice: oiuh6dtwfdq
    });
    var qiwudhbc = 1000 / 60;
    var qwoie31 = 0;
    var sco7dwqles = 0;
    var sco7dwqlesSpeed = 2;
    var kqdyteqwd2 = poijd8duiwq.keyCodes;
    var qwjdhhqw72 = 30;
    var djiw98wd38 = 1;
    var qpowd83dqw = 400;
    var cbewoidh37 = 0.03;
    var cbus7d9q8d = 30;
    var duh8371dg3 = 60;
    var ddw8hu9qwd = 560;
    var b93yd17qgg = [];
    var idwjw83dd7 = [];
    var isjds8912e = [];
    var ud8wuiqdd9 = 5;
    var badBulletSpeed = 2;
    var badBulletProbability = 0.96;
    var badBulletAmount = 20;
    var dpowd81u2h = 400;
    var uwdloq837q = 900;
    var wudh092dd7 = 6;
    var ndw8dhuiqo = !1;
    var pause = !1;
    var id9w8duiqo = 0;
    var pd9wi1ud7i = !0;
    var shipAsset = "assets/ship2.png";
    var bulletAsset = "assets/textures/particle_spark.png";
    var badBulletAsset = "assets/textures/particle_spark.png";
    var enemyAsset = "assets/enemy3.png";
    var backgroundAsset = "assets/bg2.png";
    var gogoAsset = "assets/game_over.png";
    var pauseAsset = "assets/pause.png";
    var anyKeyAsset = "assets/any_key.png";
    var times = [];
    var detailedTimes = {};

    function initVars() {
        var qwoie31 = 0;
        var sco7dwqles = 0;
        var djiw98wd38 = 1;
        var cbewoidh37 = 0.1;
        var b93yd17qgg = [];
        var idwjw83dd7 = [];
        var isjds8912e = [];
        var ud8wuiqdd9 = 5;
        var badBulletSpeed = 2;
        var badBulletProbability = 0.96;
        var badBulletAmount = 20;
        var dpowd81u2h = 400;
        var uwdloq837q = 900;
        var ndw8dhuiqo = !1;
        var pause = !1;
        var id9w8duiqo = 0;
        var pd9wi1ud7i = !0;
        var times = [];
        var detailedTimes = {}
    }
    initVars();
    var ship = Draw2DSprite.create({
        width: 30,
        height: 30,
        x: oiuh6dtwfdq.width / 2,
        y: oiuh6dtwfdq.height - cbus7d9q8d
    });
    var shipTexture = oiuh6dtwfdq.createTexture({
        src: shipAsset,
        mipmaps: !0,
        onload: function(texture) {
            if (texture) {
                ship.setTexture(texture);
                ship.setTextureRectangle([0, 0, texture.width, texture.height])
            }
        }
    });
    var bg = Draw2DSprite.create({
        width: oiuh6dtwfdq.width,
        height: oiuh6dtwfdq.height,
        x: oiuh6dtwfdq.width / 2,
        y: oiuh6dtwfdq.height / 2
    });
    var bgTexture = oiuh6dtwfdq.createTexture({
        src: backgroundAsset,
        mipmaps: !0,
        onload: function(texture) {
            if (texture) {
                bg.setTexture(texture);
                bg.setTextureRectangle([0, 0, texture.width, texture.height])
            }
        }
    });
    var gameOver = Draw2DSprite.create({
        width: oiuh6dtwfdq.width,
        height: oiuh6dtwfdq.height,
        x: oiuh6dtwfdq.width / 2,
        y: oiuh6dtwfdq.height / 2
    });
    var gogoTexture = oiuh6dtwfdq.createTexture({
        src: gogoAsset,
        mipmaps: !0,
        onload: function(texture) {
            if (texture) {
                gameOver.setTexture(texture);
                gameOver.setTextureRectangle([0, 0, texture.width, texture.height])
            }
        }
    });
    var pauseImg = Draw2DSprite.create({
        width: 80,
        height: 30,
        x: oiuh6dtwfdq.width / 2,
        y: oiuh6dtwfdq.height / 2
    });
    var pauseTExture = oiuh6dtwfdq.createTexture({
        src: pauseAsset,
        mipmaps: !0,
        onload: function(texture) {
            if (texture) {
                pauseImg.setTexture(texture);
                pauseImg.setTextureRectangle([0, 0, texture.width, texture.height])
            }
        }
    });
    var anyKeyImg = Draw2DSprite.create({
        width: 300,
        height: 30,
        x: oiuh6dtwfdq.width / 2,
        y: oiuh6dtwfdq.height / 2
    });
    var anyKeyTexture = oiuh6dtwfdq.createTexture({
        src: anyKeyAsset,
        mipmaps: !0,
        onload: function(texture) {
            if (texture) {
                anyKeyImg.setTexture(texture);
                anyKeyImg.setTextureRectangle([0, 0, texture.width, texture.height])
            }
        }
    });
    var onKeyDown = function onKeyDownFn(keycode) {
        pd9wi1ud7i = !1;
        if (keycode === kqdyteqwd2.LEFT) {
            ois9diyb2()
        } else if (keycode === kqdyteqwd2.RIGHT) {
            moveRight()
        } else if (keycode === kqdyteqwd2.SPACE) {
            huq6w90()
        } else if (keycode === kqdyteqwd2.F) {
            sco7dwqlesSpeed *= 2
        }
    };
    var onKeyUp = function onKeyUpFn(keycode) {
        if (keycode === kqdyteqwd2.LEFT) {
            stop()
        } else if (keycode === kqdyteqwd2.RIGHT) {
            stop()
        } else if (keycode === kqdyteqwd2.F) {
            sco7dwqlesSpeed /= 2
        }
    };
    $('#shoot-btn').on('touchstart', function() {
        huq6w90()
    });

    function huq6w90() {
        pd9wi1ud7i = !1;
        if (uwdloq837q > dpowd81u2h) {
            uwdloq837q = 0;
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
            b93yd17qgg.push(toadd1);
            b93yd17qgg.push(toadd2);
            toadd1 = null;
            toadd2 = null
        }
    }

    function ois9diyb2() {
        pd9wi1ud7i = !1;
        if (ship.x >= duh8371dg3) {
            sco7dwqles = -1 * sco7dwqlesSpeed
        }
    }

    function moveRight() {
        pd9wi1ud7i = !1;
        if (ship.x <= ddw8hu9qwd) {
            sco7dwqles = sco7dwqlesSpeed
        }
    }
    $('#left-btn').on('touchstart', function() {
        ois9diyb2()
    });
    $('#right-btn').on('touchstart', function() {
        moveRight()
    });
    $('#left-btn').on('touchend', function() {
        stop()
    });
    $('#right-btn').on('touchend', function() {
        stop()
    });

    function stop() {
        sco7dwqles = 0
    }
    poijd8duiwq.addEventListener('keydown', onKeyDown);
    poijd8duiwq.addEventListener('keyup', onKeyUp);

    function newEnemy(i, j) {
        var en = Draw2DSprite.create({
            width: 30,
            height: 20,
            x: (qpowd83dqw * i / wudh092dd7) + (oiuh6dtwfdq.width / 4) + (j * 10),
            y: cbus7d9q8d + (30 * j),
            direction: "right"
        });
        var shipTexture = oiuh6dtwfdq.createTexture({
            src: enemyAsset,
            mipmaps: !0,
            onload: function(texture) {
                if (texture) {
                    en.setTexture(texture);
                    en.setTextureRectangle([0, 0, texture.width, texture.height])
                }
            }
        });
        return en
    }

    function newLevel() {
        var ref = null;
        if (isjds8912e.length != 0) {
            var ref = isjds8912e.reduce(function(a, b) {
                return a.concat(b)
            })
        }
        if (isjds8912e.length == 0 || ref.length == 0) {
            if (id9w8duiqo != 0) {
                var newNow = new Date();
                var oldNow = times[times.length - 1];
                var timeDiff = Math.abs(newNow.getTime() - oldNow.getTime());
                var diffSecs = timeDiff / (1000.0);
                detailedTimes[id9w8duiqo] = diffSecs
            } else {
                var newNow = new Date()
            }
            times.push(newNow);
            id9w8duiqo += 1;
            increaseDifficulty();
            for (var j = 0; j < 3; j++) {
                var tempRow = [];
                for (var i = 0; i < wudh092dd7; i++) {
                    tempRow.push(newEnemy(i, j))
                }
                isjds8912e.push(tempRow)
            }
        }
    }

    function drawEnemies() {
        for (var i = 0; i < isjds8912e.length; i++) {
            for (var j = 0; j < isjds8912e[i].length; j++) {
                if ((isjds8912e[i][j].y + (isjds8912e[i][j].getHeight() / 2)) > (ship.y - (ship.getHeight() / 2))) {
                    ksoqi9wudw0q()
                }
                isjds8912e[i][j].y += cbewoidh37;
                draw2D.drawSprite(isjds8912e[i][j])
            }
        }
    }

    function deleteForgottenBullets() {
        $.each(b93yd17qgg, function(key, value) {
            try {
                if (value.y <= 30) {
                    b93yd17qgg.splice(key, 1)
                }
            } catch (e) {} finally {}
        });
        $.each(idwjw83dd7, function(key, value) {
            try {
                if (value.y > ship.y) {
                    idwjw83dd7.splice(key, 1)
                }
            } catch (e) {} finally {}
        })
    };

    function increaseDifficulty() {
        if (!ndw8dhuiqo && !pause && !pd9wi1ud7i) {
            if (id9w8duiqo < 25) {
                cbewoidh37 += 0.02
            }
            badBulletProbability -= 0.03;
            djiw98wd38 += 0.03
        }
    }

    function collision() {
        for (var j = 0; j < b93yd17qgg.length; j++) {
            var bulletPoint = {
                x: b93yd17qgg[j].x,
                y: b93yd17qgg[j].y - (b93yd17qgg[j].getHeight() / 2)
            };
            for (var i = 0; i < isjds8912e.length; i++) {
                for (var k = 0; k < isjds8912e[i].length; k++) {
                    if (bulletPoint.x > isjds8912e[i][k].x - (isjds8912e[i][k].getWidth() / 2) && bulletPoint.x < isjds8912e[i][k].x + (isjds8912e[i][k].getWidth() / 2) && bulletPoint.y > isjds8912e[i][k].y - (isjds8912e[i][k].getHeight() / 2) && bulletPoint.y < isjds8912e[i][k].y + (isjds8912e[i][k].getHeight() / 2)) {
                        b93yd17qgg.splice(j, 1);
                        isjds8912e[i].splice(k, 1);
                        qwoie31 += 200;
                        $scope.jidow9frq = qwoie31
                    }
                }
            }
        }
    }

    function owdid91wd() {
        for (var i = 0; i < idwjw83dd7.length; i++) {
            var badBulletPoint = {
                x: idwjw83dd7[i].x,
                y: idwjw83dd7[i].y + (idwjw83dd7[i].getHeight() / 2)
            };
            if (badBulletPoint.x > ship.x - (ship.getWidth() / 2) && badBulletPoint.x < ship.x + (ship.getWidth() / 2) && badBulletPoint.y > ship.y - (ship.getHeight() / 2) && badBulletPoint.y < ship.y + (ship.getHeight() / 2)) {
                ksoqi9wudw0q()
            }
        }
    }

    function ksoqi9wudw0q() {
        ndw8dhuiqo = !0;
        var yhd8w712d7 = new Date();
        var okd92i29 = times[times.length - 1];
        var timeDiff = Math.abs(yhd8w712d7.getTime() - okd92i29.getTime());
        var diffSecs = timeDiff / (1000.0);
        detailedTimes[id9w8duiqo] = diffSecs;
        times.push(yhd8w712d7);
        $scope.u8wudh1mnd = detailedTimes;
        $scope.iw9018undw();
        setTimeout(function() {
            $state.go('puntajes')
        }, 3000)
    }
    $scope.iw9018undw = function() {
        _mocifire.database().ref("scores").child($user.id).transaction(function(p0w9dnd1) {
            if (p0w9dnd1) {
                if (p0w9dnd1.score < $scope.jidow9frq) {
                    p0w9dnd1.score = $scope.jidow9frq;
                    p0w9dnd1.tiempos = $scope.u8wudh1mnd;
                    p0w9dnd1.juegos += 1
                }
            }
            return p0w9dnd1
        });
        _mocifire.database().ref("usuarios").child($user.id).child("score").transaction(function(p0mki8hne) {
            return ($scope.jidow9frq > p0mki8hne) ? $scope.jidow9frq : p0mki8hne
        })
    }

    function myMove() {
        if (sco7dwqles > 0) {
            if (ship.x <= (ddw8hu9qwd + 20)) {
                ship.x += sco7dwqles
            }
        } else if (sco7dwqles < 0) {
            if (ship.x >= (duh8371dg3 - 20)) {
                ship.x += sco7dwqles
            }
        }
    }

    function enemyMove() {
        if (!ndw8dhuiqo && !pause && !pd9wi1ud7i) {
            for (var i = 0; i < isjds8912e.length; i++) {
                for (var j = 0; j < isjds8912e[i].length; j++) {
                    if (isjds8912e[i][j].direction == "right") {
                        var distance = 1;
                        if ((isjds8912e[i][isjds8912e[i].length - 1].x + (isjds8912e[i][isjds8912e[i].length - 1].getWidth() / 2)) >= ddw8hu9qwd) {
                            var distance = -1;
                            isjds8912e[i][j].direction = "left"
                        }
                    } else {
                        var distance = -1;
                        if ((isjds8912e[i][0].x - (isjds8912e[i][0].getWidth() / 2)) <= duh8371dg3) {
                            var distance = 1;
                            isjds8912e[i][j].direction = "right"
                        }
                    }
                    isjds8912e[i][j].x += distance * djiw98wd38
                }
            }
        }
    }

    function enemyShoot() {
        if (!ndw8dhuiqo && !pause && !pd9wi1ud7i) {
            for (var i = 0; i < isjds8912e.length; i++) {
                for (var j = 0; j < isjds8912e[i].length; j++) {
                    if (Math.random() >= badBulletProbability && idwjw83dd7.length < badBulletAmount) {
                        var t = Draw2DSprite.create({
                            width: 2,
                            height: 10,
                            x: isjds8912e[i][j].x,
                            y: isjds8912e[i][j].y,
                            color: [1.0, 0.0, 0.0, 1.0]
                        });
                        idwjw83dd7.push(t)
                    }
                }
            }
        }
    }

    function updateScore() {
        var lmnt = document.getElementById('score');
        lmnt.innerHTML = "Level " + id9w8duiqo + " - " + qwoie31 + " points"
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    function update() {
        if (oiuh6dtwfdq.beginFrame()) {
            draw2D.begin();
            if (!ndw8dhuiqo) {
                if (pd9wi1ud7i) {
                    draw2D.drawSprite(anyKeyImg)
                } else {
                    draw2D.drawSprite(bg);
                    if (!pause) {
                        $.each(b93yd17qgg, function(key, value) {
                            value.y -= ud8wuiqdd9;
                            draw2D.drawSprite(value)
                        });
                        $.each(idwjw83dd7, function(key, value) {
                            value.y += badBulletSpeed;
                            draw2D.drawSprite(value)
                        });
                        draw2D.drawSprite(ship);
                        drawEnemies();
                        collision();
                        owdid91wd();
                        updateScore()
                    } else {
                        draw2D.drawSprite(pauseImg)
                    }
                }
            } else {
                draw2D.drawSprite(gameOver)
            }
            draw2D.end();
            oiuh6dtwfdq.endFrame()
        }
    }
    TurbulenzEngine.setInterval(enemyShoot, 200);
    TurbulenzEngine.setInterval(newLevel, qiwudhbc);
    TurbulenzEngine.setInterval(enemyMove, qiwudhbc);
    TurbulenzEngine.setInterval(update, qiwudhbc);
    TurbulenzEngine.setInterval(deleteForgottenBullets, 100);
    TurbulenzEngine.setInterval(myMove, qiwudhbc);
    TurbulenzEngine.setInterval(function() {
        if (!ndw8dhuiqo && !pause && !pd9wi1ud7i) {
            uwdloq837q += 10
        }
    }, 1000 / 100)
})
