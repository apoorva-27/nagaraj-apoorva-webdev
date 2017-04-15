/**
 * Created by hiresave on 4/5/2017.
 */


(function () {
    angular
        .module("Travelogue")
        .controller("suggestionController", suggestionController);

    function suggestionController($location,attractionService,suggestionService,$routeParams,
                                        userService,loggedin,$cookies) {
        var vm = this;
        // vm.login = login;
        vm.attractionId=$routeParams['aid']
        vm.userId=loggedin.data[0]._id;
        vm.suggestionId=$routeParams['sid']
        var vm = this;
        vm.searchPlace = searchPlace;
        vm.detailsPage=detailsPage;
        vm.createSuggestion=createSuggestion;
        vm.updateSuggestion=updateSuggestion;
        vm.deleteSuggestion=deleteSuggestion;
        vm.entryId=$routeParams['eid']
        var idfound;
        vm.userName;

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

        function detailsPage(cityId) {
            $location.url("/attractiondetails/"+cityId);
        }

        function deleteSuggestion() {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                suggestionService
                    .deleteSuggestion(vm.suggestionId)
                    .success(function () {
                        console.log("Suggestion deleted successfully")
                    })
                    .error(function () {
                        vm.error = 'Unable to remove suggestion';
                    });
            }
        }

        function updateSuggestion(suggestion) {
            suggestionService
                .updateSuggestion(vm.suggestionId,suggestion)
                .success(function (entry) {
                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                })
        }

        function init() {
            userService.findUserById(vm.userId)
                .success(function (usr) {
                    vm.userName = usr.firstname;
                });

            if ((vm.suggestionId!=undefined) || (vm.suggestionId!=null)) {
                suggestionService
                    .findSuggestionById(vm.suggestionId)
                    .success(function (entry) {
                        vm.suggestion=entry;
                    })
                    .error(function (err) {
                        vm.error = 'Unable to register';
                        console.log("error");
                    })
            }
        }
        init();

        function createSuggestion(entry) {
            console.log("create entry controller")

            var newEntry={
                title:entry.title,
                userId:vm.userId,
                city:entry.city.toLowerCase(),
                suggestion:entry.suggestion,
                firstname: vm.userName
            };
            console.log("newentry",newEntry)
            suggestionService
                .createSuggestion(vm.userId,newEntry)
                .success(function (entry) {
                    console.log(entry);
                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                })
        }

        function searchPlace(searchText) {

            var promise = attractionService
                .findPlaceByText(searchText);
            promise
                .success(function (usr) {
                    if (usr) {
                        var array=usr.response.destinations;
                        array.forEach( function(i){
                            if (i.name.toLowerCase()==searchText.toLowerCase()) {
                                console.log(i.name);
                                idfound=i.id;
                                var promise2=attractionService
                                    .findAttractionsInCity(i.id)
                                promise2
                                    .success( function (places) {
                                        if (places) {
                                            vm.attractions=places.response.venues;
                                        }
                                        else {
                                            vm.error ="Attractions not found"
                                        }
                                    });
                            }
                        })
                    } else {
                        vm.error = 'Place not found';
                    }
                })
        }
    }
})();
