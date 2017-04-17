/**
 * Created by hiresave on 3/31/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("homeController", homeController);
    function homeController($location,attractionService,suggestionService,userService, $rootScope,
                            $cookies, loggedin) {

        var vm = this;
        vm.searchPlace = searchPlace;
        vm.detailsPage=detailsPage;
        vm.userId = loggedin.data[0]._id;
        var idfound;
        vm.suggestions;
        vm.location=' ';
        vm.switch;
        vm.error=null;
        vm.logout = logout;

        function logout(){
            userService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $cookies.put('location', null);
                        $location.url("/login");
                    }
                )
        }
        function init() {
            var locationCookie = $cookies.get('location');
            vm.error = null;
            vm.attractions=null;
            if (locationCookie != 'null' && locationCookie !=null &&
                vm.userId!=undefined && vm.userId != undefined ){
                searchPlace(locationCookie)
            }
        }
        init();

        function detailsPage(attractionId) {
            $location.url("/attraction/"+attractionId);
        }


        function searchPlace(searchText) {
            vm.location = searchText.toLowerCase();
            vm.attractions = null;
            attractionService
                .findPlaceByText(searchText)
                .success(function (usr) {

                    if (usr) {
                        if (vm.userId) {
                            $cookies.put('location', searchText.toLowerCase());
                        }
                        var array = usr.response.destinations;
                        var flag = false;
                        array.forEach(function (i) {
                            if (i.name.toLowerCase() == searchText.toLowerCase())
                                {
                                 flag = true;
                                idfound = i.id;
                                attractionService
                                    .findAttractionsInCity(i.id)
                                    .success(function (places) {
                                        if (places) {
                                            vm.attractions = places.response.venues;
                                        }
                                        else {
                                            vm.error = "Attractions not found"
                                        }
                                    })
                            }
                            if (flag == false ){
                                vm.error = "City not found"
                            }
                            else{
                                vm.error = null;
                            }
                        });

                    }
                    else {
                        vm.error = 'Place not found';
                    }
                });


            suggestionService
                .findSuggestionsForCity(searchText).success(function (usr) {
                var name=null;
                for (var i=0; i< usr.length;i++){
                    if (usr[i].userId==vm.userId) {
                        usr[i].switch='EDIT';
                        usr[i].username = loggedin.data[0]._id;
                    }
                    else {
                        usr[i].switch='NONE';
                        console.log(usr[i].userId);
                        usr[i].username = undefined;
                        userService.findUserById(usr[i].userId)
                            .success(function (u) {
                                console.log("Not matched users",u[0].username)
                                name = u[0].username;
                            });
                        console.log(name);
                    }
                }
                vm.suggestions=usr;
            });

            console.log("what is searchText",searchText, vm.location)

        }
    }})();