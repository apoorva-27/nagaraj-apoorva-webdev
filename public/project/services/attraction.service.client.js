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
            "getAllAttractions":getAllAttractions

        };
        return api;

        function getAllAttractions(){
            // console.log("Step 2: before api");
            var test= $http.get("/api/admin/attractions");
            // console.log("step 8 :test",test);

            return test;
        }

        function findFavoritesByUserId(userId,attractionId) {
            return $http.get("/api/user/"+userId+"/attraction/"+attractionId+"/status");
        }

        function favorite(userId,attractionId,status,attraction) {
            console.log("what does my attraction object ahve :",attraction);
            return $http.post("/api/user/"+userId+"/attraction/"+attractionId+"/status/"+status,attraction)
        }

        function findAttraction(attractionId) {
            console.log("client : findAttraction");
            console.log("client attractionId : ",attractionId);

            var API_KEY="6ddc0c1237b6993533a2bb974dac23e6";


            var urlBase = "https://api.tripexpert.com/v1/venues/attractionId?api_key=API_KEY";

            console.log("attractionId in service",attractionId);
            var results = urlBase.replace("API_KEY", API_KEY).replace("attractionId",attractionId);
            var response= $http.get(results);
            console.log(response);
            return response
        }

        function findAttractionsInCity(cityId) {
            console.log("client : findAttractionsInCity");
            console.log("client cityid : ",cityId);

            var API_KEY="6ddc0c1237b6993533a2bb974dac23e6";


            var urlBase = "https://api.tripexpert.com/v1/venues?destination_id=cityId&venue_type_id=3&api_key=API_KEY";

            console.log("serach term in service",cityId);
            var results = urlBase.replace("API_KEY", API_KEY).replace("cityId",cityId);
            var response= $http.get(results);
            console.log(response);
            return response
        }

        function findPlaceByText(searchTerm) {
            console.log("client : findPlacebytext");
            console.log("client searchtext : ",searchTerm);

            var API_KEY="6ddc0c1237b6993533a2bb974dac23e6";


            var urlBase = "https://api.tripexpert.com/v1/destinations?api_key=API_KEY";

            console.log("serach term in service",searchTerm);
            var results = urlBase.replace("API_KEY", API_KEY);
            var response= $http.get(results);
            console.log(response);
            return response;
        }

    }
})();