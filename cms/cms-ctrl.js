var app = angular.module('app', []).controller('cmsCtrl', function($scope) {

    $scope.totalUsuarios = 0;
    $scope.totalIntentos = 0;
    $scope.totalDerrotados = 0;
    $scope.usuarios = [];
    $scope.form = {};
    $scope.cargando = true;
    $scope.logged = false;

    /**
     *
     * USUARIOS
     *
     */

    //Verifica si el usuario ya está logueado
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.logged = true;
            console.log('logged');
            firebase.database().ref('scores').once('value', function(snap) {
                console.log("snap ", snap);
                angular.forEach(snap.val(), function(element) {
                    console.log("contando");
                    $scope.totalIntentos += (element.juegos) ? element.juegos : 0;
                    $scope.totalDerrotados += (element.sz) ? element.sz : 0;
                    $scope.totalUsuarios++;
                    $scope.usuarios.push(element);
                });
                $scope.cargando = false;
                if ($scope.$root && $scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
                    $scope.$apply();
            });
        } else {
            // No user is signed in.
        }
    });

    $scope.login = function() {
        console.log("mail ", $scope.form.email);
        console.log("pass ", $scope.form.pass);

        firebase.auth().signInWithEmailAndPassword($scope.form.email, $scope.form.pass).then(function(user) {
            //Todo bien llevelo al cms
            $scope.logged = true;
        }).catch(function(error) {
            console.log("Nope: ",error);
        });
    }

    $scope.exportar = function() {
        var blob = new Blob([document.getElementById('table-export').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        var date = prettyDate();
        saveAs(blob, "Users" + date + ".xls");
    };

    $scope.clean = function(){
        console.log('Cleaning...');
        firebase.database().ref('usuarios').on('value', function (snapshot) {
            var updates = {};
          snapshot.forEach(function(sn){
            var div = sn.key.split('user');
            if(div.length == 2){
                var text = div[1];
                if(!/^\d+$/.test(text)){
		    console.log('Deleting');
                    updates[sn.key] = null;
                }
            }
        });
        console.log(updates);
        firebase.database().ref('usuarios').update(updates);
        });
    }

    var prettyDate = function(date, startDate) {
        var now = new Date();
        return ((now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear() + " " + now.getHours() + ':' +
            ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
                .getSeconds()) : (now.getSeconds())));
    }
});
