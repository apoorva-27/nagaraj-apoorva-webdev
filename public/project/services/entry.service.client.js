/**
 * Created by hiresave on 4/2/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .factory("entryService", entryService);

    function entryService($http) {

        var api = {

            "createEntry":createEntry,
            "findEntriesByAttraction":findEntriesByAttraction,
            "findEntryByEntryId":findEntryByEntryId,
            "updateEntry":updateEntry,
            "deleteEntry":deleteEntry,
            "getAllEntries":getAllEntries,
            "findEntryById":findEntryById,
            "findEntriesByUserId":findEntriesByUserId

        };
        return api;

        function findEntriesByUserId(userId) {
            return $http.get("/api/user/"+userId+"/entries")
        }
        function getAllEntries(){
            return $http.get("/api/admin/entries");
        }

        function deleteEntry(entryId){
            return $http.delete("/api/entry/"+entryId);
        }

        function updateEntry(entryId,entry) {
            response= $http.put("/api/entry/"+entryId,entry);
            return response
        }

        function findEntryByEntryId(userId,attractionId,entryId) {
            return $http.get("/api/user/"+userId+"/attraction/"+attractionId+"/entry/"+entryId);
        }

        function findEntryById(entryId){
            return $http.get("/api/admin/entry/"+entryId);
        }

        function findEntriesByAttraction(userId,attractionId) {
            console.log("findEntriesByAttraction client service")
            return $http.get("/api/user/"+userId+"/attraction/"+attractionId);

        }

        function createEntry(userId,attractionId,entry) {
            console.log("enty service create entry client")
            console.log("user id",userId)
            console.log("attraction id",attractionId)
            return $http.post("/api/user/"+userId+"/attraction/"+attractionId+"/entry",entry)
        }
    }
})();