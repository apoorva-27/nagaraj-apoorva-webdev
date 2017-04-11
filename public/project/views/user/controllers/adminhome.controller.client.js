/**
 * Created by hiresave on 4/8/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("adminhomeController", adminhomeController);

    function adminhomeController($location,entryService, suggestionService, attractionService,userService) {
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
        vm.users;
        vm.attractions;
        vm.entries;
        vm.suggestions;
        vm.user;
        vm.suggestion;
        vm.attraction;
        vm.entry;
        vm.author;

        function deleteUser (userId) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                userService
                    .deleteUser(userId)
                    .success(function () {
                        console.log("entry deleted successfully");
                        vm.user=null;
                        getAllUsers();
                    })
                    .error(function () {
                        vm.error = 'unable to remove entry';
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
                    console.log("success :",user)
                    vm.user=null;
                    getAllUsers()
                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                })
        }

        function findUserById(userId){
            userService
                .findUserById(userId)
                .success(function (entry) {
                    vm.suggestion=null;
                    vm.entries=null;
                    vm.suggestions=null;
                    vm.attraction=null;
                    vm.users=null;
                    vm.attractions=null;
                    vm.user=entry[0];
                    // $location.url("/user/"+vm.userId+"/attraction");
                    // console.log(entry);
                })
                .error(function (err) {
                    vm.error = 'Unable to find attraction';
                    //console.log("error");
                })
        }

        function deleteAttraction(attractionId) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                attractionService
                    .deleteAttraction(attractionId)
                    .success(function () {
                        console.log("entry deleted successfully");
                        vm.attraction=null;
                        getAllAttractions();
                        // $location.url("/user/" + vm.userId +"/attraction/"+vm.attractionId);
                    })
                    .error(function () {
                        vm.error = 'unable to remove entry';
                        // $location.url("/user/" + vm.userId +"/attraction/"+vm.attractionId);
                    });
            }
        }

        function updateAttraction(attractionId,attraction){
            console.log("attractionId",attractionId," attraction:",attraction);
            attractionService
                .updateAttraction(attractionId,attraction)
                .success(function (attraction) {
                    console.log("success :",attraction)
                    vm.attraction=null;
                    getAllAttractions()
                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                })
        }

        function findAttractionById(attractionId) {

            console.log("attraction admin home")
            attractionService
                .findAttractionById(attractionId)
                .success(function (entry) {
                    vm.suggestion=null;
                    vm.entries=null;
                    vm.suggestions=null;
                    vm.attraction=entry;
                    vm.attractions=null;
                    vm.users=null;
                    // $location.url("/user/"+vm.userId+"/attraction");
                    // console.log(entry);
                })
                .error(function (err) {
                    vm.error = 'Unable to find attraction';
                    //console.log("error");
                })
        }


        function updateEntry(entryId, entry){
            console.log("entryId",entryId," entry:",entry);
            entryService
                .updateEntry(entryId,entry)
                .success(function (entry) {
                    console.log("success :",entry)
                    vm.entry=null;
                    getAllEntries()
                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                })
        }

        function findEntryById(entryId) {
            console.log("entry id",entryId);
            entryService
                .findEntryById(entryId)
                .success(function (entry) {
                    vm.entry=entry;
                    vm.entries=null;
                    vm.suggestions=null;
                    vm.attractions=null;
                    vm.users=null;
                    console.log("vm.entry.userId[0] :",vm.entry.userId[0])
                    userService
                        .findUserById(vm.entry.userId[0])
                        .success(function (usr) {
                            var x=usr[0]
                            vm.author=x.firstname;
                            console.log(vm.author);
                        })
                            .error(function (err) {
                                vm.error = 'unable to remove entry';
                            });
                    })
                .error(function (err) {
                    vm.error = 'Unable to register';
                });
        }

        function deleteEntry(entryId) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                entryService
                    .deleteEntry(entryId)
                    .success(function () {
                        console.log("entry deleted successfully");
                        vm.entry=null;
                        getAllEntries();
                        // $location.url("/user/" + vm.userId +"/attraction/"+vm.attractionId);
                    })
                    .error(function () {
                        vm.error = 'unable to remove entry';
                        // $location.url("/user/" + vm.userId +"/attraction/"+vm.attractionId);
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
                        console.log("entry deleted successfully")
                        vm.suggestion=null;
                        getAllSuggestions();
                        // $location.url("/user/"+vm.userId+"/attraction");
                    })
                    .error(function () {
                        vm.error = 'unable to remove entry';
                    });
            }
        }

        function getAllSuggestions() {
            console.log("step 1:,controller getsuggetions")
            var promise = suggestionService
                .getAllSuggestions();
            promise
                .success(function (usr) {
                    if (usr!=undefined) {
                        vm.entries=null;
                        vm.suggestions=usr;
                        vm.attractions=null;
                        vm.users=null;
                        vm.suggestion=null
                        vm.entry=null;
                    } else {
                        vm.suggestions=null;
                        vm.error = 'Suggestions not found';
                    }
                })
        }

        function updateSuggestion(suggestionId,suggestion) {
            suggestionService
                .updateSuggestion(suggestionId,suggestion)
                .success(function (entry) {
                    console.log("success :",entry)
                    vm.suggestion=null;
                    getAllSuggestions()
                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                })
        }

        function findSuggestionById(suggestionId){
            suggestionService
                .findSuggestionById(suggestionId)
                .success(function (entry) {
                    vm.suggestion=entry;
                    vm.entries=null;
                    vm.suggestions=null;
                    vm.attractions=null;
                    vm.users=null;
                    // $location.url("/user/"+vm.userId+"/attraction");
                    // console.log(entry);
                })
                .error(function (err) {
                    vm.error = 'Unable to register';
                    //console.log("error");
                })
        }

        function getAllEntries(){
            var promise = entryService
                .getAllEntries();
            promise
                .success(function (usr) {
                    if (usr!=undefined) {
                        vm.entries=usr;
                        vm.attractions=null;
                        vm.suggestions=null;
                        vm.users=null;
                    } else {
                        vm.entries=null;
                        vm.error = 'Entries not found';
                    }
                })
        }

        function getAllAttractions() {
            var promise = attractionService
                .getAllAttractions();
            promise
                .success(function (usr) {
                    vm.users=null;
                    vm.suggestions=null;
                    vm.entries=null;
                    if (usr) {
                        vm.attractions=usr;
                    } else {
                        vm.attractions=null;
                        vm.error = 'Attractions not found';
                    }
                })
        }

        function getAllUsers() {
            var promise = userService
                .getAllUsers();
            promise
                .success(function (usr) {
                    if (usr) {
                        vm.users=usr;
                        vm.entries=null;
                        vm.suggestions=null;
                        vm.attractions=null;
                    } else {
                        vm.users=null;
                        vm.error = 'Users not found';
                    }
                })
        }}})();
