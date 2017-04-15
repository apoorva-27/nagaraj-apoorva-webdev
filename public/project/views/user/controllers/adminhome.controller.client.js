/**
 * Created by hiresave on 4/8/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("adminhomeController", adminhomeController);

    function adminhomeController($location,entryService,loggedin, suggestionService, attractionService,userService) {
        var vm = this;
        vm.getAllUsers = getAllUsers;
        vm.getAllAttractions=getAllAttractions;
        vm.getAllEntries=getAllEntries;
        vm.getAllSuggestions=getAllSuggestions;
        vm.findSuggestionById=findSuggestionById;
        vm.updateSuggestion=updateSuggestion;
        vm.deleteSuggestion=deleteSuggestion;
        vm.findEntryById=findEntryById;
        vm.updateEntry=updateEntry;
        vm.deleteEntry=deleteEntry;
        vm.findAttractionById=findAttractionById;
        vm.updateAttraction=updateAttraction;
        vm.deleteAttraction=deleteAttraction;
        vm.findUserById=findUserById;
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;
        vm.createUser = createUser;
        vm.createNewUser = false;
        vm.users;
        vm.attractions;
        vm.entries;
        vm.suggestions;
        vm.user;
        vm.suggestion;
        vm.attraction;
        vm.entry;
        vm.author;
        vm.Cuser = null;
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

        function createUser(user) {
            console.log("COMING HERE", user)
            var newU = userService
                .createUser(user)
                .error(function (err) {
                    vm.error = 'Unable to register';
                    //console.log("error");
                })
                .success(function (usr) {
                    console.log("COMING HERE")
                    vm.createUser = false;
                    getAllUsers();
                });

        }

        function deleteUser (userId) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                userService
                    .deleteUser(userId)
                    .success(function () {
                        console.log("User deleted successfully");
                        vm.user=null;
                        getAllUsers();
                    })
                    .error(function () {
                        vm.error = 'Unable to remove User';
                    });
            }
        }

        function updateUser(userId,user) {
            var newU={
                password:user.password,
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email,
                role:user.role
            }
            userService
                .updateUser(userId,newU)
                .success(function (user) {
                    vm.user=null;
                    getAllUsers()
                })
                .error(function (err) {
                    vm.error = 'Unable to update user';
                })
        }

        function findUserById(userId){
            vm.users=null;vm.user=null;
            vm.suggestions=null;vm.entry=null;
            vm.suggestion = null;vm.attraction=null;
            vm.entries=null;vm.attractions=null;
            userService
                .findUserById(userId)
                .success(function (entry) {
                    vm.user=entry[0];
                })
                .error(function (err) {
                    vm.error = 'Unable to find user';
                })
        }

        function deleteAttraction(attractionId) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                attractionService
                    .deleteAttraction(attractionId)
                    .success(function () {
                        console.log("Attraction deleted successfully");
                        vm.attraction=null;
                        getAllAttractions();
                    })
                    .error(function () {
                        vm.error = 'Unable to remove attraction';
                    });
            }
        }

        function updateAttraction(attractionId,attraction){
            attractionService
                .updateAttraction(attractionId,attraction)
                .success(function (attraction) {
                    vm.attraction=null;
                    getAllAttractions()
                })
                .error(function (err) {
                    vm.error = 'Unable to update attraction';
                })
        }

        function findAttractionById(attractionId) {
            vm.users=null;vm.user=null;
            vm.suggestions=null;vm.entry=null;
            vm.suggestion = null;vm.attraction=null;
            vm.entries=null;vm.attractions=null;

            attractionService
                .findAttractionById(attractionId)
                .success(function (entry) {
                    vm.attraction=entry;
                })
                .error(function (err) {
                    vm.error = 'Unable to find attraction';
                })
        }


        function updateEntry(entryId, entry){

            entryService
                .updateEntry(entryId,entry)
                .success(function (entry) {
                    vm.entry=null;
                    getAllEntries()
                })
                .error(function (err) {
                    vm.error = 'Unable to update entry';
                })
        }

        function findEntryById(entryId) {
            vm.users=null;vm.user=null;
            vm.suggestions=null;vm.entry=null;
            vm.suggestion = null;vm.attraction=null;
            vm.entries=null;vm.attractions=null;
            console.log("entry id",entryId);
            entryService
                .findEntryById(entryId)
                .success(function (entry) {
                    vm.entry=entry;
                    vm.entries=null; vm.suggestions=null;
                    vm.attractions=null; vm.attraction = null;
                    vm.users=null;

                    userService
                        .findUserById(vm.entry.userId[0])
                        .success(function (usr) {
                            var x=usr[0]
                            vm.author=x.firstname;
                        })
                            .error(function (err) {
                                vm.error = 'Unable to remove entry';
                            });
                    })
                .error(function (err) {
                    vm.error = 'Error';
                });
        }

        function deleteEntry(entryId) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                entryService
                    .deleteEntry(entryId)
                    .success(function () {
                        vm.entry=null;
                        getAllEntries();
                    })
                    .error(function () {
                        vm.error = 'Unable to remove entry';
                    });
            }
        }

        function deleteSuggestion(suggestionId) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                suggestionService
                    .deleteSuggestion(suggestionId)
                    .success(function () {
                        console.log("Entry deleted successfully")
                        vm.suggestion=null;
                        getAllSuggestions();
                    })
                    .error(function () {
                        vm.error = 'Unable to remove entry';
                    });
            }
        }

        function getAllSuggestions() {
            vm.users=null;vm.user=null;
            vm.suggestions=null;vm.entry=null;
            vm.suggestion = null;vm.attraction=null;
            vm.entries=null;vm.attractions=null;
            var promise = suggestionService
                .getAllSuggestions();
            promise
                .success(function (usr) {
                    if (usr!=undefined) {
                        vm.suggestions=usr;
                        vm.attractions=null; vm.users=null;
                        vm.attraction = null; vm.suggestion=null
                        vm.entry=null;

                    } else {
                        vm.suggestions=null;vm.suggestion = null;
                        vm.error = 'Suggestions not found';
                    }
                })
        }

        function updateSuggestion(suggestionId,suggestion) {
            vm.users=null;vm.user=null;
            vm.suggestions=null;vm.entry=null;
            vm.suggestion = null;vm.attraction=null;
            vm.entries=null;vm.attractions=null;
            suggestionService
                .updateSuggestion(suggestionId,suggestion)
                .success(function (entry) {
                    vm.suggestion=null;
                    getAllSuggestions()
                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                })
        }

        function findSuggestionById(suggestionId){
            vm.users=null;vm.user=null;
            vm.suggestions=null;vm.entry=null;
            vm.suggestion = null;vm.attraction=null;
            vm.entries=null;vm.attractions=null;
            suggestionService
                .findSuggestionById(suggestionId)
                .success(function (entry) {
                    vm.suggestion=entry;
                    vm.entries=null;vm.suggestions=null;
                    vm.attractions=null;vm.attraction = null;
                    vm.users=null;vm.createNewUser = null;

                    userService
                        .findUserById(entry.userId[0])
                        .success(function (usr) {
                            var x=usr[0]
                            vm.author_sugg=x.firstname;
                        })
                        .error(function (err) {
                            vm.error = 'Unable to remove suggestion';
                        });

                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                })
        }

        function init() {
            vm.users=null;vm.user=null;
            vm.suggestions=null;vm.entry=null;
            vm.suggestion = null;vm.attraction=null;
            vm.entries=null;vm.attractions=null;
            vm.admin=loggedin.data[0].role;
        }

        init();

        function getAllEntries(){
            vm.users=null;vm.user=null;
            vm.suggestions=null;vm.entry=null;
            vm.suggestion = null;vm.attraction=null;
            vm.entries=null;vm.attractions=null;
            var promise = entryService
                .getAllEntries();
            promise
                .success(function (usr) {
                    if (usr!=undefined) {
                        vm.entries=usr;
                        vm.attractions=null; vm.attraction = null;
                        vm.suggestions=null; vm.suggestion = null;
                        vm.users=null; vm.createNewUser = null;
                    } else {
                        vm.entries=null;
                        vm.error = 'Entries not found';
                    }
                })
        }

        function getAllAttractions() {
            vm.users=null;vm.user=null;
            vm.suggestions=null;vm.entry=null;
            vm.suggestion = null;vm.attraction=null;
            vm.entries=null;vm.attractions=null;

            var promise = attractionService
                .getAllAttractions();
            promise
                .success(function (usr) {
                    vm.users=null; vm.suggestions=null;
                    vm.suggestion = null; vm.entries=null;
                    vm.createNewUser = null;
                    if (usr) {
                        vm.attractions=usr;
                    } else {
                        vm.attractions=null;
                        vm.error = 'Attractions not found';
                    }
                })
        }

        function getAllUsers() {
            vm.users=null;vm.user=null;
            vm.suggestions=null;vm.entry=null;
            vm.suggestion = null;vm.attraction=null;
            vm.entries=null;vm.attractions=null;
            var promise = userService
                .getAllUsers();
            promise
                .success(function (usr) {
                    if (usr) {
                        vm.users=usr;
                        vm.entries=null; vm.suggestions=null;
                        vm.attractions=null; vm.attraction = null;
                        vm.createNewUser = null;

                    } else {
                        vm.users=null;
                        vm.error = 'Users not found';
                    }
                })
        }
    }
})();
