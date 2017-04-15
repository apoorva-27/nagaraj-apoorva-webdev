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


        init();

        function create(user) {

            userService
                .createUser(user)
                .success(function (newuser) {
                    console.log(newuser);

                    $rootScope.currentUser = newuser;
                    console.log($rootScope.newuser);
                    $location.url("/user");

                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                    //console.log("error");
                })

        }
    }
})();
