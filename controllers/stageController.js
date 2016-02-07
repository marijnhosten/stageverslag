(function(){
    "use strict";

    var stageController = function($scope, $http, $location){
        $scope.isLoggedIn = false;

        $scope.getClass = function (path) {
            if ($location.path().substr(0, path.length) === path) {
                return 'active';
            } else {
                return '';
            }
        };

        function getLoginData(){
            $http.get("php/change.php").then(onLoggedIn, onLoggedInError);
        }

        var onLoggedIn = function(response){
            if(response.data[0].name == null){
                $scope.isLoggedIn = false;
            }else {
                $scope.isLoggedIn = true;
            }
        };

        var onLoggedInError = function(err){
            console.log(err);
        };

        $scope.logout = function(){
            var data = {};
            $http.post("php/logout.php", data).then(onLoggedOut, onLoggedOutError);
        };

        var onLoggedOut = function(response){
            $location.path("/");
        };

        var onLoggedOutError = function(err){
            console.log(err);
        };

        getLoginData();
    };

    angular.module("app").controller("stageController", ["$scope", "$http", "$location",stageController]);
})();