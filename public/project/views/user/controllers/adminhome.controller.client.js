/**
 * Created by hiresave on 4/8/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("adminhomeController", adminhomeController);

    function adminhomeController($location,entryService, attractionService,userService) {
        var vm = this;
        vm.getAllUsers = getAllUsers;
        vm.getAllAttractions=getAllAttractions;
        vm.getAllEntries=getAllEntries;
        vm.users;
        vm.attractions;
        vm.entries;

        function getAllEntries(){
            var promise = entryService
                .getAllEntries();
            promise
                .success(function (usr) {
                    if (usr!=undefined) {
                        // console.log("users :",usr);
                        vm.entries=usr;
                        // console.log(vm.entries);
                        vm.attractions=null;
                        vm.users=null;
                    } else {
                        vm.error = 'Users not found';
                    }
                })
        }

        function getAllAttractions() {
            // console.log("Step 1 : getAllAttractions");
            var promise = attractionService
                .getAllAttractions();
            // console.log("step 9")
            promise
                .success(function (usr) {
                    // console.log("do i enter this :",usr);
                    if (usr) {
                        // console.log("users :",usr);
                        // console.log("success object :",usr);
                        vm.users=null;
                        vm.attractions=usr;
                        vm.entries=null;
                    } else {
                        // console.log("is this n errr");
                        vm.error = 'Users not found';
                    }
                })
        }

        function getAllUsers() {
            // console.log("adminhomeController")
            var promise = userService
                .getAllUsers();
            promise
                .success(function (usr) {
                    if (usr) {
                        // console.log("users :",usr)
                        vm.users=usr;
                        vm.entries=null;
                        vm.attractions=null;
                    } else {
                        vm.error = 'Users not found';
                    }
                })
        }}})();
