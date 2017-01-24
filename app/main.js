var app = angular.module('app', ['ui.router', 'angular.filter']);

app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/init');
  
  $stateProvider.state('init', {
    url: '/init',
    templateUrl: 'app/init/init.html',
    controller: 'InitCtrl'
  }); 
  
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'app/home/home.html',
    controller: 'HomeCtrl'
  });

  $stateProvider.state('registro', {
    url: '/registro',
    templateUrl: 'app/registro/registro.html',
    controller: 'RegistroCtrl'
  });

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'app/login/login.html',
    controller: 'LoginCtrl'
  });

  $stateProvider.state('puntajes', {
    url: '/puntajes',
    templateUrl: 'app/puntajes/puntajes.html',
    controller: 'PuntajesCtrl'
  });

  $stateProvider.state('instruciones', {
    url: '/instruciones',
    templateUrl: 'app/instruciones/instruciones.html',
    controller: 'InstrucionesCtrl'
  });

  $stateProvider.state('juego', {
    url: '/juego',
    templateUrl: 'app/juego/juego.html',
    controller: 'JuegoCtrl'
  });

});