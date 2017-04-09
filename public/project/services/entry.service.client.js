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
            "getAllEntries":getAllEntries

        };
        return api;

        function getAllEntries(){
            return $http.get("/api/admin/entries");
        }

        function deleteEntry(userId,attractionId,entryId){
            return $http.delete("/api/user/"+userId+"/attraction/"+attractionId+"/entry/"+entryId);
        }

        function updateEntry(userId,attractionId,entryId,entry) {
            console.log("update entry in entry service client")
            response= $http.put("/api/user/"+userId+"/attraction/"+attractionId+"/entry/"+entryId,entry);
            console.log("respone in client: ",response)
            return response
        }

        function findEntryByEntryId(userId,attractionId,entryId) {
            return $http.get("/api/user/"+userId+"/attraction/"+attractionId+"/entry/"+entryId);
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