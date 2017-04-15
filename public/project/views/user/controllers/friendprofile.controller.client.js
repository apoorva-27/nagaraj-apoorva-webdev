
/**
 * Created by hiresave on 4/1/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("friendController", friendController);

    function friendController($routeParams,userService,$location,entryService,loggedin,$cookies) {
        var vm=this;
        // console.log( "logged in data", loggedin.data[0]._id)
        vm.username = $routeParams['uname'];
        // vm.userId=loggedin.data[0]._id;
        // console.log(vm.userId);
        // vm.userId=$routeParams['uid'];
        vm.deleteUser=deleteUser;
        vm.openNav = openNav;
        var isOpen = false;
        vm.loadMain = loadMain;
        vm.includMain = '/project/views/settings/templates/settings-FOLLOWING.view.client.html';
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        vm.following = null;
        vm.followers = null;
        vm.entries = null;
        vm.user = null;
        vm.logout = logout;
        function logout(){
            userService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $cookies.
                        $location.url("/login");
                    }
                )
        }

        function loadMain(type) {

            vm.includMain = '/project/views/settings/templates/settings-'+ type +'.view.client.html';
        }

        function openNav() {
            if (isOpen == false){
                isOpen = true;
                document.getElementById("mySidenav").style.width = "180px";
                document.getElementById("main").style.marginLeft = "180px";
            }
            else {
                document.getElementById("mySidenav").style.width = "0px";
                document.getElementById("main").style.marginLeft = "0px";
                isOpen=false;
            }
        }

        function init() {
            if (vm.username == loggedin.data[0].username){
                $location.url("/user");
            }

            userService
                .findUserByUsername(vm.username)
                .success( function (user) {
                    // vm.user = user;
                    vm.user=user;
                    console.log("user [0]",vm.user)

                    var following = [];
                    for(var i =0; i< user.following.length; i++){
                        userService.findUserById(user.following[i])
                            .success(function (us) {
                                following.push(us[0])
                            });

                    }
                    console.log(following);
                    vm.following = following;


                    var followers = [];
                    for(var i =0; i< user.followers.length; i++){
                        userService.findUserById(user.followers[i])
                            .success(function (us) {
                                followers.push(us[0])
                            });

                    }
                    console.log("followers",followers);
                    vm.followers = followers;

                })
                .error (function (err) {
                    vm.error="unable to find user"
                });

            userService
                .findUserByUsername(vm.username)
                .success( function (user) {
                    entryService.findEntriesByUserId(user._id)
                        .success(function (entries) {
                            console.log(entries);
                            vm.entries = entries;
                        })
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


    }


})();

