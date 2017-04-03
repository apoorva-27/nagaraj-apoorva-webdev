/**
 * Created by hiresave on 4/2/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .factory("placeService", placeService);

    function placeService($http) {

        var api = {
            "findPlaceByText": findPlaceByText,
            "findAttractionsInCity":findAttractionsInCity,
            "findAttraction":findAttraction

        };
        return api;

        function findAttraction(attractionId) {
            console.log("client : findAttraction")
            console.log("client attractionId : ",attractionId)

            var API_KEY="6ddc0c1237b6993533a2bb974dac23e6";


            var urlBase = "https://api.tripexpert.com/v1/venues/attractionId?api_key=API_KEY";

            console.log("attractionId in service",attractionId)
            var results = urlBase.replace("API_KEY", API_KEY).replace("attractionId",attractionId);
            var response= $http.get(results);
            console.log(response)
            return response
        }

        function findAttractionsInCity(cityId) {
            console.log("client : findAttractionsInCity")
            console.log("client cityid : ",cityId)

            var API_KEY="6ddc0c1237b6993533a2bb974dac23e6";


            var urlBase = "https://api.tripexpert.com/v1/venues?destination_id=cityId&venue_type_id=3&api_key=API_KEY";

            console.log("serach term in service",cityId)
            var results = urlBase.replace("API_KEY", API_KEY).replace("cityId",cityId);
            var response= $http.get(results);
            console.log(response)
            return response
        }

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