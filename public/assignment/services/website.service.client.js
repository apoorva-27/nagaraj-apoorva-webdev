/**
 * Created by hiresave on 2/14/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "updateWebsite": updateWebsite,
            "findAllWebsitesForUser": findAllWebsitesForUser
        };
        return api;


        function createWebsite(userId,website){
            var newsite=
                {
                    _user: userId,
                    name: website.name,
                    //_id: (new Date()).getTime().toString(),
                    description:website.description
                }

            return $http.post("/api/assignmentuser/"+userId+"/website",newsite);
        }

        function findAllWebsitesForUser(userId) {
            return $http.get("/api/assignmentuser/"+userId+"/website");
        }

        function findWebsiteById(websiteId) {
            return $http.get("/api/website/"+websiteId);
        }
        function updateWebsite(websiteId,website) {
            return $http.put("/api/website/"+websiteId,website);

        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
        }
    }
})();