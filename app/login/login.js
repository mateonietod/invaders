angular.module('app').controller("LoginCtrl", function($state, _mocifire, $user) {
    var ctrl = this;

    ctrl.cedula = "";
    ctrl.error = false;

    ctrl.login = function() {
        _mocifire.database().ref('usuarios').child('user' + ctrl.cedula).once('value').then(function(snap) {
            if (!snap.val()) {
                ctrl.error = "Para ingresar primero debe registrarse";
                return;
            }

            $user.id = 'user' + ctrl.cedula;
            $state.go('juego');
        });
    }


});
