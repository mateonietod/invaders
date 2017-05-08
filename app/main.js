var app = angular.module('app', ['ui.router', 'angular.filter']);

app.constant("_mocifire", firebase.initializeApp({
    apiKey: "AIzaSyB1TxeeOhgv5sGenpndYzG-WPT5DdxESso",
    authDomain: "mocionfep.firebaseapp.com",
    databaseURL: "https://mocionfep.firebaseio.com",
    projectId: "mocionfep",
    storageBucket: "mocionfep.appspot.com",
    messagingSenderId: "1057022132795"
}, "Secondary"));

app.run(function(_mocifire, $state) {
    _mocifire.auth().signInAnonymously();
    $state.go('init');
});

app.config(function($stateProvider, $urlRouterProvider) {

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
        controller: 'RegistroCtrl as ctrl'
    });

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl as ctrl'
    });

    $stateProvider.state('puntajes', {
        url: '/puntajes',
        templateUrl: 'app/puntajes/puntajes.html',
        controller: 'PuntajesCtrl as ctrl'
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