/**
 * Created by hiresave on 4/2/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .factory("attractionService", attractionService);

    function attractionService($http) {

        var api = {
            "findPlaceByText": findPlaceByText,
            "findAttractionsInCity":findAttractionsInCity,
            "findAttraction":findAttraction,
            "favorite":favorite,
            "findFavoritesByUserId":findFavoritesByUserId,
            "getAllAttractions":getAllAttractions,
            "findAttractionById":findAttractionById,
            "updateAttraction":updateAttraction,
            "deleteAttraction":deleteAttraction

        };
        return api;

        function deleteAttraction(attractionId) {
            return $http.delete("/api/attraction/"+attractionId);
        }

        function updateAttraction(attractionId,attraction) {
            return $http.put("/api/attraction/"+attractionId,attraction);
        }

        function findAttractionById(attractionId){
            return $http.get("/api/attraction/"+attractionId)
        }

        function getAllAttractions(){
            var test= $http.get("/api/admin/attractions");
            return test;
        }

        function findFavoritesByUserId(userId,attractionId) {
            return $http.get("/api/user/"+userId+"/attraction/"+attractionId+"/status");
        }

        function favorite(userId,attractionId,status,attraction) {
            return $http.post("/api/user/"+userId+"/attraction/"+attractionId+"/status/"+status,attraction)
        }

        function findAttraction(attractionId) {

            var API_KEY="6ddc0c1237b6993533a2bb974dac23e6";

            var urlBase = "https://api.tripexpert.com/v1/venues/attractionId?api_key=API_KEY";
            var results = urlBase.replace("API_KEY", API_KEY).replace("attractionId",attractionId);
            var response= $http.get(results);
            console.log(response);
            return response
        }

        function findAttractionsInCity(cityId) {
            var API_KEY="6ddc0c1237b6993533a2bb974dac23e6";
            var urlBase = "https://api.tripexpert.com/v1/venues?destination_id=cityId&venue_type_id=3&api_key=API_KEY";

            var results = urlBase.replace("API_KEY", API_KEY).replace("cityId",cityId);
            return $http.get(results);
        }

        function findPlaceByText(searchTerm) {

            var API_KEY="6ddc0c1237b6993533a2bb974dac23e6";
            var urlBase = "https://api.tripexpert.com/v1/destinations?api_key=API_KEY";
            var results = urlBase.replace("API_KEY", API_KEY);
            var response= $http.get(results);
            return response;
        }

    }
})();