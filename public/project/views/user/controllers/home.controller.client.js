/**
 * Created by hiresave on 3/31/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("homeController", homeController);

    function homeController($location,attractionService,expertService,$routeParams,$cookies) {

        var vm = this;
        vm.searchPlace = searchPlace;
        vm.detailsPage=detailsPage;
        vm.userId=$routeParams['uid'];
        // vm.findSuggestionsForCity=findSuggestionsForCity;
        var idfound;
        vm.suggestions;

        function init() {
            var locationCookie = $cookies.get('location');

            if (locationCookie!=undefined){
                searchPlace(locationCookie);
            }
        }

        init();


        function detailsPage(attractionId) {
            console.log("details page home controller")
            if (vm.userId.length==0) {
                $location.url("/attraction/"+attractionId);
            }
            else {
                $location.url("/user/"+vm.userId+"/attraction/"+attractionId);
            }
        }

        function searchPlace(searchText) {
            console.log("controller : findplacebytext")
            console.log("searchtext ", searchText)

            var promise = attractionService
                .findPlaceByText(searchText);
            promise
                .success(function (usr) {
                    if (usr) {
                        // $location.url("/user/" + usr._id);
                        console.log("home controller")
                        // console.log(usr)
                        var array = usr.response.destinations;
                        // console.log(array)
                        array.forEach(function (i) {
                            // console.log(i)
                            console.log("vm.searchplace : ", searchText)
                            if (i.name.toLowerCase() == searchText.toLowerCase()) {
                                console.log(i.name);
                                idfound = i.id;
                                console.log("match :", i);

                                var promise2 = attractionService
                                    .findAttractionsInCity(i.id)
                                promise2
                                    .success(function (places) {
                                        if (places) {

                                            $cookies.put('location', searchText.toLowerCase());
                                            console.log("places found")
                                            console.log(places)
                                            vm.attractions = places.response.venues;
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
            var promise3 = expertService
                .findSuggestionsForCity(searchText);
            promise3
                .success(function (usr) {
                    console.log("find suggestions by city :",usr)
                    vm.suggestions=usr;
                })
        }
    }})();