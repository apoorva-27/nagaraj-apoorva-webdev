/**
 * Created by hiresave on 4/2/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("attractiondetailsController", attractiondetailsController);

    function attractiondetailsController($location,entryService,userService, attractionService,$routeParams) {
        var vm = this;
        vm.attractionId=$routeParams['aid']
        vm.userId=$routeParams['uid']
        vm.entries;
        vm.entry;
        vm.attraction;
        vm.favorited=false;
        vm.favorite=favorite;
        vm.findEntryByEntryId=findEntryByEntryId;
        vm.findFavoritesByUserId=findFavoritesByUserId;
        vm.changeFollow=changeFollow;

        function changeFollow(userId,entry) {
            console.log("change follow in controller",userId)
            userService
                .changeFollow(vm.userId,userId)
                .success(function (success) {
                    if(entry.follow == 'FOLLOW'){
                        entry.follow='UNFOLLOW'
                    }
                    else {
                        entry.follow='FOLLOW'
                    }
                    console.log("In success", success)

                })
                .error(function (err) {
                    entry.follow = 'UNFOLLOW';
                    // vm.favorited=false;
                    // vm.error = 'Unable to register';
                    console.log("Unable to change Follow!",err)
                })
        }

        function favorite(status) {
            console.log(status)


            attractionService
                .favorite(vm.userId,vm.attractionId,status,vm.attraction)
                .success(function (success) {
                    console.log(success);
                    if (vm.favorited==true) {
                        vm.favorited = false;
                        alert("Removed from Favorites!")
                    }
                    else {
                        vm.favorited=true
                        alert("Added to Favorites!")
                    }
                })
                .error(function (err) {
                    vm.favorited=false;
                    vm.error = 'Unable to register';
                    alert("Unable to add to Favorites!")
                })
        }

    function init() {
        var newplace = attractionService
            .findAttraction(vm.attractionId)
            .success(function (newuser) {
                console.log(newuser);
                vm.attraction=newuser;
                vm.name=newuser.response.venues[0].name;
                vm.reviews=newuser.response.venues[0].reviews;
                vm.opening_hours=newuser.response.venues[0].opening_hours;
                vm.address=newuser.response.venues[0].address;
                vm.tripexpert_score=newuser.response.venues[0].tripexpert_score;
                vm.website=newuser.response.venues[0].website;

            })
            .error(function (err) {
                vm.error = 'Unable to register';
            })
        if (vm.userId!=undefined) {
            var entries = entryService
                .findEntriesByAttraction(vm.userId, vm.attractionId)
                .success(function (entries) {

                    var i;
                    for (i = 0; i < entries.length; i++) {
                        entries[i].follow = 'FOLLOW'
                        console.log("vm.entries i", entries[i].userId)
                        if (entries[i].userId == vm.userId) {
                            entries[i].follow = 'NONE'
                        }
                        else {
                            var x = entries[i]
                            userService
                                .findFollowing(vm.userId)
                                .success(function (following) {
                                    console.log("following", following)
                                    var j;
                                    for (j = 0; j < following.length; j++) {
                                        console.log("here it fails", x)
                                        if (x.userId == following[j]) {
                                            console.log("checking if followed")
                                            x.follow = 'UNFOLLOW';
                                            continue;
                                        }
                                        console.log("else un followed")
                                    }
                                })
                                .error(function (err) {
                                    console.log("err :", err)
                                })
                        }
                    }
                    vm.entries = entries;
                })
                .error(function (err) {
                    vm.error = "error";
                })

            findFavoritesByUserId();
        }
    }
    init();

        function findFavoritesByUserId() {
            attractionService
                .findFavoritesByUserId(vm.userId,vm.attractionId)
                .success(function (user) {
                    vm.favorited=true;
                    console.log("vm.fav :",vm.favorited)
                })
                .error (function (err) {
                    vm.favorited=false;
                    console.log("false vm.fav :",vm.favorited)
                })
        }

    function findEntryByEntryId(entryId) {
        entryService
            .findEntryByEntryId(vm.userId, vm.attractionId, entryId)
            .success(function (entry) {
                vm.entry = entry;
            })
            .error(function (error) {
                vm.error = "error"
            })
        }
    }
})();