/**
 * Created by hiresave on 3/31/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .controller("homeController", homeController);

    function homeController($location,placeService) {

        var vm = this;
        vm.searchPlace = searchPlace;
        var idfound;

        function searchPlace(searchText) {
            console.log("ontroller : findplacebytext")
            console.log("searchtext ",searchText)

            var promise = placeService
                .findPlaceByText(searchText);
            promise
                .success(function (usr) {
                    if (usr) {
                        // $location.url("/user/" + usr._id);
                        console.log("home controller")
                        // console.log(usr)
                        var array=usr.response.destinations;
                        // console.log(array)
                        array.forEach( function(i){
                            // console.log(i)
                            console.log("vm.searchplace : ",searchText)
                            if (i.name==searchText) {
                                console.log(i.name);
                                idfound=i.id;
                                console.log("match");
                                // break;
                            }
                        })
                    } else {
                        vm.error = 'Place not found';
                    }
                })

    }
}})();
