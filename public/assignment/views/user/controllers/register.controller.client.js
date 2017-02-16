/**
 * Created by hiresave on 2/14/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, userService) {
        var vm = this;

        vm.create = create;
        function init() {


        }

        init();

        // event handlers
        function create(user) {
            var newuser = userService
                .createUser(user);
            if (newuser) {
                $location.url("/user/" + newuser._id);
            } else {
                vm.error = 'User not found';
            }
        }
    }
})();
