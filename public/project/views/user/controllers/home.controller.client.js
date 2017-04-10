/**
 * Created by hiresave on 3/31/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("homeController", homeController);

    function homeController($location,attractionService,suggestionService,$routeParams,$cookies) {

        var vm = this;
        vm.searchPlace = searchPlace;
        vm.detailsPage=detailsPage;
        vm.userId=$routeParams['uid'];
        // vm.findSuggestionsForCity=findSuggestionsForCity;
        var idfound;
        vm.suggestions;
        vm.switch;

        function init() {
            var locationCookie = $cookies.get('location');

            if (locationCookie!=undefined){
                searchPlace(locationCookie);
            }
        }

        init();


        function detailsPage(attractionId) {
            console.log("details page home controller")
            if (vm.userId==undefined) {
                $location.url("/attraction/"+attractionId);
            }
            else {
                $location.url("/user/"+vm.userId+"/attraction/"+attractionId);
            }
        }

        function searchPlace(searchText) {
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
                                            $cookies.put('location', searchText.toLowerCase());
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
            var promise3 = suggestionService
                .findSuggestionsForCity(searchText);
            promise3
                .success(function (usr) {
                    console.log("success")
                    for (var i=0; i< usr.length;i++){
                        if (usr[i].userId==vm.userId) {
                            usr[i].switch='EDIT'
                        }
                        else {
                            usr[i].switch='NONE'
                        }
                    }
                    vm.suggestions=usr;
                })
        }
    }})();