(function () {
    angular
        .module("Travelogue")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var vm = this;
        vm.login = login;


        function login(user) {
            console.log("login controller ")
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
