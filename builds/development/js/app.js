'use strict';

/**
 * @ngdoc overview
 * @name iFeelaApp 
 * @description
 * # iFeelaApp
 *
 * Main module of the application.
 */
angular
  .module('ifeelaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/login', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      .otherwise({
        redirectTo: '/'
      });
  })
    .constant('FBURL', 'https://ifeelaapp.firebaseio.com/')
    .constant('MSGURL', 'https://ifeelaapp.firebaseio.com/messages');