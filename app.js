(function (){
    "use strict";

    var app = angular.module("app", ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/login.html",
                controller: "mainController"
            })
            .when("/verslag", {
                templateUrl: "views/verslag.html",
                controller: "verslagController"
            })
            .when("/change", {
                templateUrl: "views/change.html",
                controller: "changeController"
            })
            .when("/stage", {
                templateUrl: "views/stage.html",
                controller: "stageController"
            })
            .otherwise({
                redirectTo: "/login"
            });
    });

})();