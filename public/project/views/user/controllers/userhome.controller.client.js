/**
 * Created by hiresave on 4/1/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("userhomeController", userhomeController);

    function userhomeController($routeParams) {
        var vm=this;
         vm.userId=$routeParams['uid'];
    }
})();