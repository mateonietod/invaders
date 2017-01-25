angular.module('app').controller("InstrucionesCtrl", function($scope, $state, $user) {
    var ctrl = this;

    ctrl.startgame = function() {
        console.log("S");
        if (!$user.id) {
            return $state.go("init");
        } else {
            return $state.go("juego");
        }
    };

});
