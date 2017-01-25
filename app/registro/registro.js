angular.module('app').controller("RegistroCtrl", function ($state, _mocifire, $user, $scope) {
  var ctrl = this;

  ctrl.user = {}
  ctrl.error = false;

  ctrl.registerUser = function () {
    _mocifire.database().ref("scores").child("user" + ctrl.user.cedula).once('value').then(function (snap) {
      if(snap.val()){
        ctrl.error = true;
        ctrl.message = "Ya se encuentra registrado."; console.error("user exist");
        $scope.$apply();
      } else {
        _mocifire.database().ref("scores").child("user" + ctrl.user.cedula).set({score: 0, nombre: ctrl.user.nombre, juegos: 0, tiempos: { 1 : 0}});
        _mocifire.database().ref("usuarios").child("user" + ctrl.user.cedula).set(angular.extend(ctrl.user, {score: 0, fecha: new Date().toString(), juegos: 0}));
        $user.id = 'user' + ctrl.user.cedula;
        $state.go('instruciones');
      }
    });
  }


});
