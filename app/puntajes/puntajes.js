angular.module('app').controller("PuntajesCtrl", function ($scope, $state, _mocifire, $user) {
    var ctrl = this;

    ctrl.user = $user;
    ctrl.scores = {};

    _mocifire.database().ref('usuarios').orderByChild('score').limitToLast(9).once('value', function (snapshot) {
        ctrl.scores = snapshot.val();
        $scope.$apply();
    });
});
