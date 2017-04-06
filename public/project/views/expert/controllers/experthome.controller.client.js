/**
 * Created by hiresave on 4/5/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("experthomeController", experthomeController);

    function experthomeController($routeParams,expertService,$location) {
        var vm=this;
        vm.userId=$routeParams['uid'];
        vm.deleteExpert=deleteExpert;

        function deleteExpert(user) {
            console.log("delete User userhomecontroller")
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                expertService
                    .deleteExpert(vm.userId)
                    .success(function () {
                        $location.url("/expertlogin");
                    })
                    .error(function () {
                        vm.error = 'unable to remove Expert';
                    });
            }
        }}
})();