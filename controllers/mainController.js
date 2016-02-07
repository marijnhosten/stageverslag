(function(){
    "use strict";

    var mainController = function($scope, $http, $location){

        $scope.isLoggedIn = false;
        $scope.login = function(user){
            var data = {"name": user.name, "password": user.password};
            $http.post('php/form.php', data).then(onLoggedIn, onLoggedInError);

        };

        var onLoggedIn = function(response){
            getLoginData();
        };

        var onLoggedInError = function(err){
            console.log(err);
        };

        function getLoginData(){
            $http.get("php/change.php").then(onData, onDataError);
        }

        var onData = function(response){
            if(response.data[0].changed == 0){
                $location.path("/change");
            }else {
                $location.path("/verslag");
            }
        };

        var onDataError = function(err){
            console.log(err);
        };

        $scope.getClass = function (path) {
            if ($location.path().substr(0, path.length) === path) {
                return 'active';
            } else {
                return '';
            }
        };
    };

    angular.module("app").controller("mainController", ["$scope", "$http", "$location", mainController]);

})();