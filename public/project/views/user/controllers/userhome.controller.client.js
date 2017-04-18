/**
 * Created by hiresave on 4/1/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("userhomeController", userhomeController);

    function userhomeController(userService,$location,entryService,$rootScope,
                                loggedin,$cookies,attractionService) {
        var vm=this;
        vm.userId=loggedin.data[0]._id;
        vm.deleteUser=deleteUser;
        vm.openNav = openNav;
        var isOpen = true;
        vm.loadMain = loadMain;
        vm.includMain = '/project/views/settings/templates/settings-EDIT.view.client.html';
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        vm.following = null;
        vm.followers = null;
        vm.entries = null;
        vm.attractonsAll = [];
        vm.logout = logout;


        function loadMain(type) {

            vm.includMain = '/project/views/settings/templates/settings-'+ type +'.view.client.html';
        }

         function openNav() {
             if (isOpen == false){
                 isOpen = true;
                 document.getElementById("mySidenav").style.width = "180px";
             }
             else {
                 document.getElementById("mySidenav").style.width = "0px";
                 document.getElementById("main").style.marginLeft = "0px";
                 isOpen=false;
             }
         }
         
         function init() {
             userService
                 .findUserById(vm.userId)
                 .success( function (user) {
                     vm.user=user[0];
                     var following = [];
                     for(var i =0; i< user[0].following.length; i++){
                         userService.findUserById(user[0].following[i])
                             .success(function (us) {
                                 following.push(us[0])
                             });
                     }
                     vm.following = following;

                     var followers = [];
                     for(var i =0; i< user[0].followers.length; i++){
                         userService.findUserById(user[0].followers[i])
                             .success(function (us) {
                                 followers.push(us[0])
                             });
                     }
                     vm.followers = followers;
                 })
                 .error (function (err) {
                     vm.error="unable to find user"
                 });

             entryService.findEntriesByUserId(vm.userId)
                 .success(function (entries) {
                     console.log(entries);
                     vm.entries = entries;
                 });
             openNav();


             attractionService.getAllAttractions()
                 .success(function (attract) {

                     for(var i = 0; i < attract.length; i++){
                         attractionService.findFavoritesByUserId(vm.userId,attract[i].attractionId)
                             .success(function (userA) {
                                 if (userA != null){
                                     vm.attractonsAll.push(userA)
                                 }
                             })
                     }
                 })
         }
         init();

        function deleteUser(user) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                userService
                    .deleteUser(vm.userId)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'Unable to remove user';
                    });
            }
        }

        function unregisterUser(user) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                userService
                    .deleteUser(vm.userId)
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
                };

            console.log("newuser in profile controller"+newU)
            userService
                .updateUser(vm.userId, newU)
                .success(function (user) {
                    if (user != null) {
                        vm.message = "User Successfully Updated!"
                    } else {
                        vm.error = "Unable to update user";
                    }
                });
        }

        function logout(){
            userService
                .logout()
                .then(function (response) {
                        console.log("logoutCalled")
                        $rootScope.currentUser = null;
                         $cookies.put('location', undefined);
                        $location.url("/login");
                    }
                )
        }
    }
})();

