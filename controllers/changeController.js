(function(){
    "use strict";

    var changeController = function($scope, $http, $location){

        function getLoginData(){
            $http.get("php/change.php").then(onLoggedIn, onLoggedInError);
        }

        $scope.isLoggedIn = false;
        $scope.isChanged = true;

        $scope.change = function(user){

            if($scope.original != user.password1){
                $scope.showPass1 = true;
            }else {
                $scope.showPass1 = false;
            }

            if($scope.original == user.password2){
                $scope.showPass2 = true;
            }else {
                $scope.showPass2 = false;
            }

            if($scope.showPass1 == false && $scope.showPass2 == false){
                $scope.isLoggedIn = true;
                updateUser(user.password2);
            }

        };

        var updateUser = function(password){
            var data = {"name": $scope.name, "password": password};
            $http.post("php/update.php", data).then(onUpdated, onUpdateError);
        };

        var onUpdated = function(response){
            $location.path("/verslag");
        };

        var onUpdateError = function(err){
            console.log(err);
        };

        var onLoggedIn = function(response){
            if(response.data[0].name == null){
                $location.path("/");
            }
            if(response.data[0].changed == 1 && response.data[0].name != null){
                $location.path("/verslag")
            }
            $scope.original = response.data[0].password;
            $scope.name = response.data[0].name;
        };

        var onLoggedInError = function(err){
            console.log(err);
        };
        getLoginData();

        $scope.getClass = function (path) {
            if ($location.path().substr(0, path.length) === path) {
                return 'active';
            } else {
                return '';
            }
        }
    };




    angular.module("app").controller("changeController", ["$scope", "$http", "$location", changeController]);

})();