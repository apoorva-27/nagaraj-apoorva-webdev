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


        function createWebsite(userID,website){
            return $http.post("/api/user/"+userID+"/website",website);
        }

        function findAllWebsitesForUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }

        function findWebsiteById(websiteId) {
            // console.log("do i come to client service");
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