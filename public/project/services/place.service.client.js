/**
 * Created by hiresave on 4/2/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .factory("placeService", placeService);

    function placeService($http) {

        var api = {
            "findPlaceByText": findPlaceByText

        };
        return api;

        function findPlaceByText(searchTerm) {
            console.log("client : findPlacebytext")
            console.log("client searchtext : ",searchTerm)

            var API_KEY="6ddc0c1237b6993533a2bb974dac23e6";


            var urlBase = "https://api.tripexpert.com/v1/destinations?api_key=API_KEY";

            console.log("serach term in service",searchTerm)
            var results = urlBase.replace("API_KEY", API_KEY);
            var response= $http.get(results);
            console.log(response)
            return response
        }

    }
})();