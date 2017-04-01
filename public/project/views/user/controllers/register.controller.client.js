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

        function create(user) {
            /*userService
                .findUserByUsername(user.username)
                .success(function (user) {
                    vm.message = "That username is already taken";
                })
                .error(function(err) {
                    vm.message = "Available";
                });*/
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
