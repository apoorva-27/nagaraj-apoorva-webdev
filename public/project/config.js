/**
 * Created by hiresave on 2/14/2017.
 */
(function(){
    angular
        .module("Travelogue")
        .config(configuration);

    function configuration($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"
            })
            .when("/home", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"
            })
            .when("/default", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/templates/userhome.view.client.html",
                controller: "userhomeController",
                controllerAs: "model"
            })
            .when("/user/:uid/settings", {
                templateUrl: "views/user/templates/settings.view.client.html",
                controller: "settingsController",
                controllerAs: "model"
            })
            .when("/attraction", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"
            })
            .when("/user/:uid/attraction", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"
            })
            .when("/attraction/:aid", {
                templateUrl: "views/attraction/templates/attractiondetails.view.client.html",
                controller: "attractiondetailsController",
                controllerAs: "model"
            })
            .when("/user/:uid/attraction/:aid", {
                templateUrl: "views/attraction/templates/attractiondetails.view.client.html",
                controller: "attractiondetailsController",
                controllerAs: "model"
            })

            .when("/user/:uid/attraction/:aid/entry", {
                templateUrl: "views/entry/templates/diaryentry.view.client.html",
                controller: "diaryentryController",
                controllerAs: "model"
            })

    }
})();