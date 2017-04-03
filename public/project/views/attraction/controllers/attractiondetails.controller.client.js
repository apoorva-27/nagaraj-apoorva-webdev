/**
 * Created by hiresave on 4/2/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("attractiondetailsController", attractiondetailsController);

    function attractiondetailsController($location, placeService,$routeParams) {
        var vm = this;
        // vm.login = login;
        vm.attractionId=$routeParams['pid']

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
    }
    init();
    }})();