(function () {
    angular
        .module("Travelogue")
        .controller("loginController", loginController);

    function loginController($location, userService,$rootScope) {
        var vm = this;
        vm.login = login;


        function login(user) {
            console.log("login controller ");
            var promise = userService
                .findUserByCredentials(user);
            promise
                .success(function (usr) {
                    if (usr) {
                        console.log("loging USR",usr)
                        $rootScope.currentUser = usr;

                        if(usr.role =='ADMIN'){
                            $location.url("/admin")
                        }else {
                            $location.url("/user");
                        }
                    } else {
                        vm.error = 'User not found';
                    }
                })
        }}})();
