/**
 * Created by hiresave on 4/5/2017.
 */


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
                        $cookies.put('location', undefined);

                        $location.url("/login");
                    }
                )
        }

        function detailsPage(cityId) {
            console.log("details page home controller")
            $location.url("/attractiondetails/"+cityId);
        }

        function deleteSuggestion() {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                suggestionService
                    .deleteSuggestion(vm.suggestionId)
                    .success(function () {
                        console.log("entry deleted successfully")
                        // $location.url("/user/"+vm.userId+"/attraction");
                    })
                    .error(function () {
                        vm.error = 'unable to remove entry';
                    });
            }
        }

        function updateSuggestion(suggestion) {
            console.log("update entry in controller :",suggestion)
            suggestionService
                .updateSuggestion(vm.suggestionId,suggestion)
                .success(function (entry) {
                    // $location.url("/user/"+vm.userId+"/attraction");
                    // console.log(entry);
                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                    //console.log("error");
                })
        }

        function init() {

            userService.findUserById(vm.userId)
                .success(function (usr) {
                    console.log("firstname :",usr)
                    vm.userName = usr.firstname;
                });

            if ((vm.suggestionId!=undefined) || (vm.suggestionId!=null)) {
                suggestionService
                    .findSuggestionById(vm.suggestionId)
                    .success(function (entry) {
                        console.log("Created new suggestion", entry)
                        vm.suggestion=entry;
                        console.log(entry);
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
                    console.log("Created new suggestion", entry)
                    // $location.url("/user/" + newuser._id);
                    console.log(entry);
                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                    console.log("error");
                })


        }

        function searchPlace(searchText) {
            console.log("controller : findplacebytext")
            console.log("searchtext ",searchText)

            var promise = attractionService
                .findPlaceByText(searchText);
            promise
                .success(function (usr) {
                    if (usr) {
                        // $location.url("/user/" + usr._id);
                        console.log("home controller")
                        // console.log(usr)
                        var array=usr.response.destinations;
                        // console.log(array)
                        array.forEach( function(i){
                            // console.log(i)
                            console.log("vm.searchplace : ",searchText)
                            if (i.name.toLowerCase()==searchText.toLowerCase()) {
                                console.log(i.name);
                                idfound=i.id;
                                console.log("match :",i);

                                var promise2=attractionService
                                    .findAttractionsInCity(i.id)
                                promise2
                                    .success( function (places) {
                                        if (places) {
                                            console.log("places found")
                                            console.log(places)
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
    }})();
