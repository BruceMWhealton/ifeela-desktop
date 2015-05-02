ifeelaApp.controller('UserprefsController',
  function($scope, $location, $rootScope, FBURL) {

  var ref = new Firebase(FBURL);

  $scope.updateFavoriteFoods = function() {
    Authentication.login($scope.user)
    .then(function(user) {
      $location.path('#/userprefs');
    }).catch(function(error) {
      $scope.message = error.message;
    });
  }; //login

}); //RegistrationController