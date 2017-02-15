(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, userService) {
        var vm = this;

        // event handlers
        vm.updateUser = updateUser;
        // vm.deleteUser = deleteUsers;

        var userId = $routeParams['uid'];
        vm.userId=userId;

        function init() {
            var user = userService.findUserById(userId);
            vm.user = user;
        }
        init();

        function updateUser(newUser) {
            var user = userService.updateUser(userId, newUser);
            if(user != null) {
                vm.message = "User Successfully Updated!"
            } else {
                vm.error = "Unable to update user";
            }
        }
    }
})();