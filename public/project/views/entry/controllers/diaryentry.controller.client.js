/**
 * Created by hiresave on 4/2/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("diaryentryController", diaryentryController);

    function diaryentryController($location,attractionService,entryService,$routeParams,loggedin,
                                  userService,$cookies,$filter) {
        var vm = this;
        // vm.login = login;
        vm.attractionId=$routeParams['aid']
        vm.userId=loggedin.data[0]._id;
        var vm = this;
        vm.searchPlace = searchPlace;
        vm.detailsPage=detailsPage;
        vm.createEntry=createEntry;
        vm.updateEntry=updateEntry;
        vm.deleteEntry=deleteEntry;
        vm.entryId=$routeParams['eid']
        var idfound;

        function detailsPage(cityId) {
            $location.url("/attractiondetails/"+cityId);
        }

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

        function deleteEntry() {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                entryService
                    .deleteEntry(vm.entryId)
                    .success(function () {
                        $location.url("/attraction/"+vm.attractionId);
                    })
                    .error(function () {
                        $location.url("/attraction/"+vm.attractionId);
                    });
            }
        }

        function updateEntry(entry) {
            entryService
                .updateEntry(vm.entryId,entry)
                .success(function (entry) {
                    $location.url("/attraction/"+vm.attractionId);
                })
                .error(function (err) {
                    vm.error = 'Unable to update';
                    $location.url("/attraction/"+vm.attractionId);

                })
        }

        function init() {

            if  (vm.entryId!=undefined) {

                entryService
                    .findEntryByEntryId(vm.userId,vm.attractionId,vm.entryId)
                    .success(function (entry) {
                        entry[0].date=entry[0].date.slice(0,10);
                        vm.entry=entry[0];
                    })
                    .error(function (err) {
                        vm.error="error"
                    })
            }
        }
        init();

        function createEntry(entry) {
            console.log("create entry controller");
            if(entry.date == null){
                entry.date = Date.now();
            }
            var newEntry={
                title:entry.title,
                date:entry.date,
                story:entry.story,
                username: loggedin.data[0].username
            }
            entryService
                .createEntry(vm.userId,vm.attractionId,newEntry)
                .success(function (entry) {
                    $location.url("/attraction/"+vm.attractionId);
                    console.log(entry);
                })
                .error(function (err) {
                    vm.error = 'Unable to Create Entry';
                    $location.url("/attraction/"+vm.attractionId);
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
                                    })
                            }
                        })
                    } else {
                        vm.error = 'Place not found';
                    }
                })
        }
    }
})();