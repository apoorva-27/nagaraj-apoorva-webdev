/**
 * Created by hiresave on 3/31/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("homeController", homeController);


    function homeController($location,attractionService,suggestionService,userService, $rootScope,$route,
                            $cookies, loggedin) {

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
        vm.location = null;
        // vm.slide = slide;

        vm.logout = logout;
        function logout(){
            userService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                )
        }
        function init() {
            var locationCookie = loggedin;
            console.log(locationCookie,"cookie");
            // searchPlace('asd')

            if (locationCookie!=null){
                searchPlace(locationCookie);
            }
        }
        init();

        function detailsPage(attractionId) {
            console.log("details page home controller")
            $location.url("/attraction/"+attractionId);

        }


        function searchPlace(searchText) {

            console.log("what is searchText",searchText)
          attractionService
                .findPlaceByText(searchText)
                .success(function (usr) {
                    if (usr) {

                        if (vm.userId) {
                            $cookies.put('location', searchText.toLowerCase());
                        }

                        var array = usr.response.destinations;
                        array.forEach(function (i) {
                            if (i.name.toLowerCase() == searchText.toLowerCase()) {
                                idfound = i.id;
                                attractionService
                                    .findAttractionsInCity(i.id)
                                    .success(function (places) {
                                        if (places) {
                                            // $cookies.put('location', searchText.toLowerCase());
                                            // console.log(searchText.toLowerCase(),"setting cookie");
                                            vm.attractions = places.response.venues;
                                            $rootScope.location = searchText.toLowerCase();
                                        }
                                        else {
                                            vm.error = "Attractions not found"
                                        }
                                    })
                            }
                        })
                    }

                    else {
                        vm.error = 'Place not found';
                    }
                });


            vm.location = searchText;
            suggestionService
                .findSuggestionsForCity(searchText).success(function (usr) {
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