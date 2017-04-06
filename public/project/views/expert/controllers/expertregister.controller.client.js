/**
 * Created by hiresave on 4/5/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("expertregisterController", expertregisterController);

    function expertregisterController($location, expertService) {
        var vm = this;

        vm.create = create;
        function init() {
        }

        init();

        function create(user) {

            var newuser = expertService
                .createExpert(user)
                .success(function (newuser) {
                    $location.url("/user/" + newuser._id);
                    console.log(newuser);
                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                    //console.log("error");
                })

        }
    }
})();

