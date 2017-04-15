/**
 * Created by hiresave on 2/14/2017.
 */
(function(){
    angular
        .module("Travelogue")
        .config(configuration);

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        return $http.get('/api/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user[0];
            }
        });
    };

    

    function configuration($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }

            })
            .when("/myCarousel", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin", {
                templateUrl: "views/user/templates/adminhome.view.client.html",
                controller: "adminhomeController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/home", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/default", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }

            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user", {
                templateUrl: "views/user/templates/userhome.view.client.html",
                controller: "userhomeController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/view/:uname", {
                templateUrl: "views/user/templates/friendprofile.view.client.html",
                controller: "friendController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:uid/settings", {
                templateUrl: "views/user/templates/settings.view.client.html",
                controller: "settingsController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/attraction", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:uid/attraction", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/attraction/:aid", {
                templateUrl: "views/attraction/templates/attractiondetails.view.client.html",
                controller: "attractiondetailsController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:uid/attraction/:aid", {
                templateUrl: "views/attraction/templates/attractiondetails.view.client.html",
                controller: "attractiondetailsController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/user/attraction/:aid/entry", {
                templateUrl: "views/entry/templates/diaryentry.view.client.html",
                controller: "diaryentryController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/attraction/:aid/entry/:eid", {
                templateUrl: "views/entry/templates/diaryentry.view.client.html",
                controller: "diaryentryController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            // .when("/suggestion", {
            //     templateUrl: "views/suggestion/templates/expertlogin.view.client.html",
            //     controller: "expertloginController",
            //     controllerAs: "model",
            //     resolve: {
            //         loggedin: checkLoggedin
            //     }
            // })

            .when("/suggestion", {
                templateUrl: "views/suggestion/templates/suggestion.view.client.html",
                controller: "suggestionController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }

            })
            .when("/suggestion/:uid/suggestion", {
                templateUrl: "views/suggestion/templates/suggestion.view.client.html",
                controller: "suggestionController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/suggestion/:uid/suggestion/:sid", {
                templateUrl: "views/suggestion/templates/suggestion.view.client.html",
                controller: "suggestionController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
    }
})();