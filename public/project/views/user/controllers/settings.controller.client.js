(function () {
    angular
        .module("Travelogue")
        .controller("settingsController", settingsController);

    function settingsController($routeParams, userService,$location) {
        var vm = this;
        // event handlers
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        // vm.deleteUser = deleteUsers;

        function init() {
            console.log("init settings");
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

            var newU=
                {
                    firstname: newuser.firstname ,
                    lastname: newuser.lastname ,
                    email: newuser.email
                }

            console.log("newuser in profile controller"+newU)
            userService
                .updateUser(userId, newU)
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