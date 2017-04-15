/**
 * Created by hiresave on 4/5/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("experthomeController", experthomeController);

    function experthomeController($routeParams,expertService,$location,loggedin,userService,$cookies) {
        var vm=this;
        vm.userId=loggedin.data[0]._id;
        vm.deleteExpert=deleteExpert;
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

        function deleteExpert(user) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                expertService
                    .deleteExpert(vm.userId)
                    .success(function () {
                        $location.url("/expertlogin");
                    })
                    .error(function () {
                        vm.error = 'Unable to remove Expert';
                    });
            }
        }}
})();