/**
 * Created by hiresave on 4/2/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("attractiondetailsController", attractiondetailsController);

    function attractiondetailsController($location,entryService, placeService,$routeParams) {
        var vm = this;
        // vm.login = login;
        vm.attractionId=$routeParams['aid']
        vm.userId=$routeParams['uid']
        vm.entries;
        vm.entry;

    function init() {
        var newplace = placeService
            .findAttraction(vm.attractionId)
            .success(function (newuser) {
                // $location.url("/user/" + newuser._id);
                console.log(newuser);
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