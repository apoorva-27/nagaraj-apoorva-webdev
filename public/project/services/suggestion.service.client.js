/**
 * Created by hiresave on 4/5/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .factory("suggestionService", suggestionService);

    function suggestionService($http) {

        var api = {
            "findSuggestionByCredentials": findSuggestionByCredentials,
            "findSuggestionById": findSuggestionById,
            "updateSuggestion": updateSuggestion,
            "findSuggestionByUsername": findSuggestionByUsername,
            "createSuggestion": createSuggestion,
            "deleteSuggestion": deleteSuggestion,
            "findSuggestionsForCity":findSuggestionsForCity,
            "getAllSuggestions":getAllSuggestions
        };
        return api;

        function getAllSuggestions(){
            // console.log("service client get all suggestions")
            return $http.get("/api/admin/suggestions")
        }

        function findSuggestionsForCity(cityName) {
            return $http.get("/api/suggestions/"+cityName);
        }

        function createSuggestion(userId,suggestion){
            return $http.post("/api/suggestion/"+userId+"/suggestion",suggestion);
        }

        function updateSuggestion(suggestionId, suggestion) {
            console.log("upade suggestion service client")
            return $http.put("/api/suggestion/"+suggestionId,suggestion);
        }

        function deleteSuggestion(suggestionId) {
            return $http.delete("/api/suggestion/"+suggestionId);
        }

        function findSuggestionById(userId) {
            return $http.get("/api/suggestion/"+userId);
        }

        function findSuggestionByCredentials(username, password) {
            return $http.get("/api/suggestion?username="+username+"&password="+password);
        }

        function findSuggestionByUsername(username) {
            return $http.get("/api/suggestion?username="+username);
        }
    }
})();
