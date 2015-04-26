ifeelaApp.controller('RegistrationController',
  function($scope, $firebaseAuth, $location, Authentication) {

  var ref = new Firebase('https://ifeelaapp.firebaseio.com/');
  var auth = $firebaseAuth(ref);

  $scope.login = function() {
    Authentication.login($scope.user)
    .then(function(user) {
      $location.path('/chat');
    }).catch(function(error) {
      $scope.message = error.message;
    });
  }; //login



	$scope.register = function() {
		Authentication.register($scope.user)
			.then(function(user) {
				Authentication.login($scope.user);
				$location.path('/login');
			}).catch(function(error) {
				$scope.message = error.message;
			});
	}; //register

}); //RegistrationController