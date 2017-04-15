(function () {
    angular
        .module("Travelogue")
        .controller("settingsController", settingsController);

    function settingsController($routeParams, userService,$location,loggedin) {
        var vm = this;
        // event handlers
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        vm.userId=loggedin.data[0]._id;
        vm.userId = userId;
        vm.openNav=openNav;
        vm.closeNav=closeNav;
        // vm.deleteUser = deleteUsers;
        vm.followers = null;

        function init() {
            console.log("init settings");
            var promise = userService.findUserById(userId);
            promise.success(function (user) {
                vm.user = user;
                console.log("vm user",vm.user);
                var followers = null;

                for(var i =0; i< user.followers.length; i++){
                    userService.findUserById( user.followers[i])
                        .success(function (us) {
                            followers.append(us)
                        });

                }
                vm.followers = followers;
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