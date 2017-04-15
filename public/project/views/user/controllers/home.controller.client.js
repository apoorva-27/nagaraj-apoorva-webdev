/**
 * Created by hiresave on 3/31/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("homeController", homeController);

    function homeController($location,attractionService,suggestionService,userService,$cookies, loggedin) {

        var vm = this;
        vm.searchPlace = searchPlace;
        vm.detailsPage=detailsPage;

        vm.userId = loggedin.data[0]._id;
        // console.log(loggedin.data[0]._id)
        // console.log($rootScope);
        // vm.findSuggestionsForCity=findSuggestionsForCity;
        var idfound;
        vm.suggestions;
        vm.switch;
        // vm.slide = slide;
        vm.logout = logout;
        function logout(){
            userService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $cookies.put('location', undefined);
                        $location.url("/login");
                    }
                )
        }
        function init() {
            var locationCookie = $cookies.get('location');

            if (locationCookie!=undefined){
                searchPlace(locationCookie);
            }
        }
        init();

        function detailsPage(attractionId) {
            console.log("details page home controller")
            $location.url("/attraction/"+attractionId);
            // if (vm.userId==undefined) {
            //
            // }
            // else {
            //     $location.url("/user/attraction/"+attractionId);
            // }
        }

        function searchPlace(searchText) {
            $cookies.put('location', undefined);

            var promise = attractionService
                .findPlaceByText(searchText);
            promise
                .success(function (usr) {
                    if (usr) {
                        var array = usr.response.destinations;
                        array.forEach(function (i) {
                            if (i.name.toLowerCase() == searchText.toLowerCase()) {
                                // console.log(i.name);
                                idfound = i.id;
                                var promise2 = attractionService
                                    .findAttractionsInCity(i.id)
                                promise2
                                    .success(function (places) {
                                        if (places) {
                                            // $cookies.put('location', searchText.toLowerCase());
                                            // console.log(searchText.toLowerCase(),"setting cookie");
                                            vm.attractions = places.response.venues;
                                            $cookies.put('location', searchText.toLowerCase());

                                        }
                                        else {
                                            vm.error = "Attractions not found"
                                        }
                                    })
                            }
                        })
                    } else {
                        vm.error = 'Place not found';
                    }
                })

            vm.location = searchText;
            var promise3 = suggestionService
                .findSuggestionsForCity(searchText);
            promise3
                .success(function (usr) {
                    console.log("success")
                    var name=null;
                    for (var i=0; i< usr.length;i++){
                        if (usr[i].userId==vm.userId) {
                            usr[i].switch='EDIT'
                            usr[i].username = loggedin.data[0]._id;
                        }
                        else {
                            usr[i].switch='NONE'
                            console.log(usr[i].userId)
                            // var name=null;
                            usr[i].username = undefined;
                            userService.findUserById(usr[i].userId)
                                .success(function (u) {
                                    console.log("Not matched users",u[0].username)
                                    name = u[0].username;
                                })
                            console.log(name);
                            // usr[i].username = name
                        }
                    }
                    vm.suggestions=usr;
                })
        }
    }})();