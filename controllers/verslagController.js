(function(){
    "use strict";

    var verslagController = function($scope, $http, $location){

        function getLoginData(){
            $http.get("php/change.php").then(onLoggedIn, onLoggedInError);
        }

        $scope.isLoggedIn = true;

        $scope.getClass = function (path) {
            if ($location.path().substr(0, path.length) === path) {
                return 'active';
            } else {
                return '';
            }
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

        var onLoggedIn = function(response){
            if(response.data[0].name == null){
                $location.path("/");
            }
            $scope.original = response.data[0].password;
        };

        var onLoggedInError = function(err){
            console.log(err);
        };

        getLoginData();
    };



    angular.module("app").controller("verslagController", ["$scope", "$http", "$location", verslagController]);

})();