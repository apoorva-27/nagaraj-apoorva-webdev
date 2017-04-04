/**
 * Created by hiresave on 4/2/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("diaryentryController", diaryentryController);

    function diaryentryController($location, placeService,entryService,$routeParams) {
        var vm = this;
        // vm.login = login;
        vm.attractionId=$routeParams['aid']
        vm.userId=$routeParams['uid']
        var vm = this;
        vm.searchPlace = searchPlace;
        vm.detailsPage=detailsPage;
        vm.createEntry=createEntry;
        vm.updateEntry=updateEntry;
        vm.entryId=$routeParams['eid']
        var idfound;

        function detailsPage(cityId) {
            console.log("details page home controller")
            $location.url("/attractiondetails/"+cityId);
        }

        function updateEntry(entry) {
            entryService
                .updateEntry(vm.userId,vm.attractionId,entry)
                .success(function (entry) {
                    // $location.url("/user/" + newuser._id);
                    console.log(entry);
                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                    //console.log("error");
                })
        }

        function init() {

            if  (vm.entryId.length>0) {

                entryService
                    .findEntryByEntryId(vm.userId,vm.attractionId,vm.entryId)
                    .success(function (entry) {
                        console.log("success init ",entry)
                        vm.entry=entry[0];
                    })
                        .error(function (err) {
                            vm.error="error"
                        })
                }

        }
        init();

        function createEntry(entry) {
            console.log("create entry controller")
            var newEntry={
                title:entry.title,
                date:entry.date,
                story:entry.story,
            }
            entryService
                .createEntry(vm.userId,vm.attractionId,newEntry)
                .success(function (entry) {
                    // $location.url("/user/" + newuser._id);
                    console.log(entry);
                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                    //console.log("error");
                })


        }

        function searchPlace(searchText) {
            console.log("controller : findplacebytext")
            console.log("searchtext ",searchText)

            var promise = placeService
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

                                var promise2=placeService
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
                                    })
                                // break;
                            }
                        })
                    } else {
                        vm.error = 'Place not found';
                    }
                })

        }

    }})();
