angular.module('app.services', ['firebase'])
    .factory("Auth", ["$firebaseAuth",
        function ($firebaseAuth) {
            var ref = new Firebase("https://ifeelaapp.firebaseio.com");
            return $firebaseAuth(ref);
        }
    ])
    .factory('$localStorage', ['$window', function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }])
    .factory('User', function ($localStorage, Auth, $firebaseObject) {
        var ref = new Firebase("https://ifeela.firebaseio.com");
        var authData = Auth.$getAuth();

        function isNewUser() {
            if ($localStorage.get('authData')) {
                return false;
            } else {
                return true;
            }
        };

        function getProfile(user, cb) {

            debugger;
            var profile = $firebaseObject(ref.child('users').child(user.uid).child('profile'));
            cb(null, profile.$value);
        };

        function updateProfile(userData) {
           // debugger;
            var profile = $firebaseObject(ref.child('users').child(userData.auth.uid).child('profile'));
            profile.userData = userData.facebook.cachedUserProfile || userData;
            profile.$save().then(function (ref) {
                console.log("Saved?", ref.key() === profile.$id); // true
            }, function (error) {
                console.log("Error:", error);
            });
        };


        function removeProfile(profile) {
            profile.$remove().then(function (ref) {
                return true;
                // data has been deleted locally and in Firebase
            }, function (error) {
                console.log("Error:", error);
            });
        };


        function getLocalData () {
            var userData = JSON.parse($localStorage.get('firebase:session::ifeela'));
            return userData;
        };

        function facebook(cb) {
            // login with Facebook
            Auth.$authWithOAuthPopup("facebook").then(function (authData) {
                $localStorage.set('authData', JSON.stringify(authData));
                cb(null, authData);
                //  $state.go('app.mainMenu');
            }).catch(function (error) {
                console.log("Authentication failed: ", error);
                cb(error, null);
                // $scope.errorMessage = "Could not login with Facebook";
            });
        };

        return {
            isNewUser: isNewUser,
            getProfile: getProfile,
            getLocalData: getLocalData,
            updateProfile: updateProfile,
            facebook: facebook
        };
    });