ifeelaApp.controller('RegistrationController',
    function ($scope, $firebaseAuth, $location, Authentication, $rootScope) {

        var ref = new Firebase('https://ifeelaapp.firebaseio.com/');
        var auth = $firebaseAuth(ref);

        $scope.login = function () {

            if ($scope.user.email === 'admin@admin.com') {
               // $rootScope.currentUser = user;
                //$rootScope.isAdmin = true;
                $location.path('#/admin');
               // debugger;
            } else {
                Authentication.login($scope.user)
                    .then(function (user) {
                        $location.path('#/userprefs');
                    }).catch(function (error) {
                        $scope.message = error.message;
                    });
            }

        }; //login

        $scope.register = function () {
            Authentication.register($scope.user)
                .then(function (user) {
                    Authentication.login($scope.user);
                    $location.path('#/login');
                }).catch(function (error) {
                    $scope.message = error.message;
                });
        }; //register

    }); //RegistrationController