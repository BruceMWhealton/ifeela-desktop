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
  .constant('MSGURL', 'https://ifeelaapp.firebaseio.com/messages'); // unrelated error

ifeelaApp.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
    if (error === 'AUTH_REQUIRED') {
      $rootScope.message = 'Sorry, you must log in to access that page.';
      $location.path('/login');
    }
  });
}]).config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/chat', {
      templateUrl: 'views/chat.html',
      controller: 'ChatCtrl',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    })
    .when('/userprefs', {
      templateUrl: 'views/userpreferences.html',
      controller: 'UserprefsController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    })
    .when('/admin', {
      templateUrl: 'views/admin.html',
      controller: 'AdminController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    })
    .otherwise({
      redirectTo: '/login'
    });
}]);

