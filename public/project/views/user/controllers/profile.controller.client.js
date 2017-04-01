(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, userService,$location) {
        var vm = this;
        // event handlers
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        // vm.deleteUser = deleteUsers;

        function init() {
            var promise = userService.findUserById(userId);
            promise.success(function (user) {
                vm.user = user;
                console.log("vm user",vm.user);
            });
        }
        init();

        function unregisterUser(user) {
            // console.log("do i come here at profile controller?")
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                userService
                    .deleteUser(userId)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'unable to remove user';
                    });
            }
        }

        function updateUser(newuser) {
            console.log("newuser in profile controller"+newuser)
            userService
                .updateUser(userId, newuser)
                .success(function (user) {
                    if (user != null) {
                        vm.message = "User Successfully Updated!"
                    } else {
                        vm.error = "Unable to update user";
                    }
                });
        }
    }
})();