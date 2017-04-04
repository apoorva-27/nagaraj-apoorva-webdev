/**
 * Created by hiresave on 4/2/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("attractiondetailsController", attractiondetailsController);

    function attractiondetailsController($location,entryService, attractionService,$routeParams) {
        var vm = this;
        // vm.login = login;
        vm.attractionId=$routeParams['aid']
        vm.userId=$routeParams['uid']
        vm.entries;
        vm.entry;
        vm.attraction;
        vm.favorite=favorite;
        vm.findEntryByEntryId=findEntryByEntryId;

        function favorite(status) {
            console.log(status)

            attractionService
                .favorite(vm.userId,vm.attractionId,status,vm.attraction)
                .success(function (success) {
                    // $location.url("/user/" + newuser._id);
                    console.log(success);
                    alert("Added to Favorites!")
                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                    alert("Unable to add to Favorites!")

                    //console.log("error");
                })
        }

    function init() {
        var newplace = attractionService
            .findAttraction(vm.attractionId)
            .success(function (newuser) {
                // $location.url("/user/" + newuser._id);
                console.log(newuser);
                vm.attraction=newuser;
                vm.name=newuser.response.venues[0].name;
                vm.reviews=newuser.response.venues[0].reviews;
                vm.opening_hours=newuser.response.venues[0].opening_hours;
                vm.address=newuser.response.venues[0].address;
                vm.tripexpert_score=newuser.response.venues[0].tripexpert_score;
                vm.website=newuser.response.venues[0].website;
            })
            .error(function (err) {
                vm.error = 'Unable to register';
                //console.log("error");
            })

        var entries = entryService
            .findEntriesByAttraction(vm.userId,vm.attractionId)
            .success(function (entries) {
                vm.entries=entries;
            })
            .error (function (err) {
                vm.error="error";
            })
    }
    init();

    function findEntryByEntryId(entryId) {
        // var entry=
        entryService
            .findEntryByEntryId(vm.userId, vm.attractionId, entryId)
            .success(function (entry) {
                vm.entry = entry;
            })
            .error(function (error) {
                vm.error = "error"
            })
    }
    }
})();