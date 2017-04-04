/**
 * Created by hiresave on 2/14/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("registerController", registerController);

    function registerController($location, userService) {
        var vm = this;

        vm.create = create;
        function init() {
        }

        init();

        function create(user) {

            var newuser = userService
                .createUser(user)
                .success(function (newuser) {
                    $location.url("/user/" + newuser._id);
                    console.log(newuser);
                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                    //console.log("error");
                })

        }
    }
})();
