'use strict';

/**
 * @ngdoc overview
 * @name iFeelaApp 
 * @description
 * # iFeelaApp
 *
 * Main module of the application.
 */
var ifeelaApp = angular
  .module('ifeelaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .constant('FBURL', 'https://ifeelaapp.firebaseio.com/')
  .constant('MSGURL', 'https://ifeelaapp.firebaseio.com/messages')
  .config(['$routeProvider',  function ($routeProvider) {
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
        controller: 'RegistrationController'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegistrationController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
