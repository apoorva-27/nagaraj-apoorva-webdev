/**
 * Created by hiresave on 4/1/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("userhomeController", userhomeController);

    function userhomeController($routeParams,userService,$location) {
        var vm=this;
         vm.userId=$routeParams['uid'];
         vm.deleteUser=deleteUser;


    function deleteUser(user) {
        console.log("delete User userhomecontroller")
        var answer = confirm("Are you sure?");
        console.log(answer);
        if(answer) {
            userService
                .deleteUser(vm.userId)
                .success(function () {
                    $location.url("/login");
                })
                .error(function () {
                    vm.error = 'unable to remove user';
                });
        }
    }}
})();