(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var vm = this;

        // event handlers
        vm.login = login;

        function login(user) {
            var user = userService
                .findUserByCredentials(user.username, user.password);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.error = 'User not found';
            }
        }
    }
})();