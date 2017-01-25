angular.module('app').controller("PuntajesCtrl", function ($scope, $state, _mocifire, $user) {
    var ctrl = this;

    ctrl.user = $user;
    ctrl.scores = {};

    if(!$user.id)
        return $state.go("init");

    _mocifire.database().ref('scores').orderByChild('score').limitToLast(9).once('value', function (snapshot) {
        ctrl.scores = snapshot.val();
        $scope.$apply();
    });
});
