/**
 * Created by hiresave on 4/2/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .factory("entryService", entryService);

    function entryService($http) {

        var api = {

            "createEntry":createEntry

        };
        return api;

        function createEntry(entry) {
            console.log("enty service create entry client")
            return $http.post("/api/entry",entry)
        }
    }
})();