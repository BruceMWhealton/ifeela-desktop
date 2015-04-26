ifeelaApp.factory('Authentication', function($firebase, $firebaseAuth, $rootScope, $routeParams, $location, FBURL) {

	var ref = new Firebase(FBURL);
	var auth = $firebaseAuth(ref);

	auth.$onAuth(function(authUser) {
		if (authUser) {
			var ref = new Firebase(FBURL + 'users/' + authUser.uid);
			console.log(FBURL + 'users/' + authUser.uid);
			var user = $firebase(ref).$asObject();
			$rootScope.currentUser = user;
		} else {
			$rootScope.currentUser = '';
		}
	});

	// Temporary object
	var myObject = {
		login: function(user) {
			return auth.$authWithPassword({
				email: user.email,
				password: user.password
			}); //authWithPassword
		}, // login

		logout: function(user) {
			return auth.$unauth();
		}, // logout

		register: function(user) {
			return auth.$createUser({
				email: user.email,
				password: user.password
			}).then(function(regUser) {
				var ref = new Firebase(FBURL+'users');
				console.log(FBURL+'users');
				var firebaseUsers = $firebase(ref);

				var userInfo = {
					registrationDate: Firebase.ServerValue.TIMESTAMP,
					regUser: regUser.uid,
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email,
					zipcode: user.zipcode,
					city: user.city,
					state: user.state
				}; // user info

				firebaseUsers.$set(regUser.uid, userInfo);
			}); // promise
		}, // register

		requireAuth: function() {
			return auth.$requireAuth();
		}, // require authentication
		
		waitForAuth: function() {
			return auth.$waitForAuth();
		}, // Wait until user is Authenticated

	}; //myObject
	return myObject;
}); // ifeelaApp Factory