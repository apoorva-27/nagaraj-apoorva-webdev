/**
 * Created by hiresave on 2/14/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("registerController", registerController);

    function registerController($location, userService,$rootScope) {
        var vm = this;
        vm.onchange = onchange;
        vm.userNameTitle = false;
        vm.matchPassword=matchPassword;
        vm.create = create;
        function init() {

        }
        function onchange(username) {
            userService.isUserNameTaken(username)
                .success(function (YN) {
                    vm.userNameTitle = YN;
                    if(!vm.userNameTitle){
                        vm.message ="Username is taken! Please pick another.";
                    }
                    else {
                        vm.message=null;
                    }
                })

        }
        function matchPassword(P1,P2) {
            if(P1!== P2){
                vm.message ="Passwords Dont Match";
            }
            else{
                vm.message ="";
            }
        }
        function matchPassword(P1,P2) {
            if(P1!== P2){
                vm.message ="Passwords Dont Match";
            }
            else{
                vm.message ="";
            }
        }

        init();

        function create(user) {
            if(user)

            userService
                .createUser(user)
                .success(function (newuser) {

                    console.log("new created",newuser);
                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                })

            userService
                .findUserByCredentials(user)
                .success(function (usr) {
                    if (usr) {
                        $rootScope.currentUser = usr;
                        $location.url("/user");
                    } else {
                        vm.error = 'User not found';
                    }
                });

            var promise = userService
                .findUserByCredentials(user);
            promise
                .success(function (usr) {
                    if (usr) {
                        $rootScope.currentUser = usr;
                        $location.url("/user");
                    }
                })

        }
    }
})();