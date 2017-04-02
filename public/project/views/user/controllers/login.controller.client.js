(function () {
    angular
        .module("Travelogue")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var promise = userService
                .findUserByCredentials(user.username, user.password);
            promise
                .success(function (usr) {
                    if (usr) {
                        $location.url("/user/" + usr._id);
                    } else {
                        vm.error = 'User not found';
                    }
                })
        }}})();
                //     if (user) {
                //     //      /console.log("user login function in login controller"+usr)
                //     // console.log("user id:"+user._id)
                //     $location.url("/user/" + usr._id);
                // }})
                // } else {
                // // .error (function(err) {
                // //         vm.error="user not found";
                // //     });
                //     vm.error = 'User not found';
//                 }
//             };
//     }
// })();