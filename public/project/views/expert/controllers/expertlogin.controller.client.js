/**
 * Created by hiresave on 4/5/2017.
 */
(function () {
    angular
        .module("Travelogue")
        .controller("expertloginController", expertloginController);

    function expertloginController($location, expertService) {
        var vm = this;
        vm.expertlogin = expertlogin;


        function expertlogin(user) {
            console.log("login controller ")
            var promise = expertService
                .findExpertByCredentials(user.username, user.password);
            promise
                .success(function (usr) {
                    if (usr) {
                        $location.url("/expert/" + usr._id);
                    } else {
                        vm.error = 'User not found';
                    }
                })
        }}})();
