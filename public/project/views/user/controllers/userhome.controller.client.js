/**
 * Created by hiresave on 4/1/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("userhomeController", userhomeController);

    function userhomeController(userService,$location,entryService,$rootScope,
                                loggedin,$cookies) {
        var vm=this;
        // console.log( "logged in data", loggedin.data[0]._id)
        vm.userId=loggedin.data[0]._id;
        console.log(vm.userId);
        // vm.userId=$routeParams['uid'];
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
        vm.logout = logout;


        function loadMain(type) {

            vm.includMain = '/project/views/settings/templates/settings-'+ type +'.view.client.html';
        }

         function openNav() {
             if (isOpen == false){
                 isOpen = true;
                 document.getElementById("mySidenav").style.width = "180px";
                 // document.getElementById("main").style.marginLeft = "180px";
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
                     console.log("user [0]",user)
                     vm.user=user[0];
                     var following = [];
                     for(var i =0; i< user[0].following.length; i++){
                         userService.findUserById(user[0].following[i])
                             .success(function (us) {
                                 following.push(us[0])
                             });

                     }
                     console.log(following);
                     vm.following = following;


                     var followers = [];
                     for(var i =0; i< user[0].followers.length; i++){
                         userService.findUserById(user[0].followers[i])
                             .success(function (us) {
                                 followers.push(us[0])
                             });

                     }
                     console.log(followers);
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
         }
         init();

        function deleteUser(user) {
            console.log("delete User userhomecontroller")
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

        function unregisterUser(user) {
            // console.log("do i come here at profile controller?")
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

