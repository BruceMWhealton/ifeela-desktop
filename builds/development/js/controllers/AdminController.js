ifeelaApp
    .controller('AdminController', function ($scope, $firebaseAuth, $firebaseObject, $firebaseArray, FBURL, $location, Authentication, $rootScope) {


        $scope.admin = '';
        var ref = new Firebase(FBURL);
        var obj = $firebaseObject(ref);
        obj.$bindTo($scope, "admin");

        // $scope.admin
    })

;