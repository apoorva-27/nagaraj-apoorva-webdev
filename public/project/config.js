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
            .when("/admin", {
                templateUrl: "views/user/templates/adminhome.view.client.html",
                controller: "adminhomeController",
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
            .when("/user/:uid/attraction/:aid/entry/:eid", {
                templateUrl: "views/entry/templates/diaryentry.view.client.html",
                controller: "diaryentryController",
                controllerAs: "model"
            })
            .when("/expert", {
                templateUrl: "views/expert/templates/expertlogin.view.client.html",
                controller: "expertloginController",
                controllerAs: "model"
            })
            .when("/expertregister", {
                templateUrl: "views/expert/templates/expertregister.view.client.html",
                controller: "expertregisterController",
                controllerAs: "model"
            })
            .when("/expert/:uid", {
                templateUrl: "views/expert/templates/experthome.view.client.html",
                controller: "experthomeController",
                controllerAs: "model"
            })
            .when("/expert/:uid/suggestion", {
                templateUrl: "views/expert/templates/expertsuggestion.view.client.html",
                controller: "expertsuggestionController",
                controllerAs: "model"
            })
    }
})();