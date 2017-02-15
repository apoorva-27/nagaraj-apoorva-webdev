/**
 * Created by hiresave on 2/14/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
        ];
        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "updateWebsite": updateWebsite,
            "findWebsiteByUser": findWebsiteByUser
        };
        return api;


        function createWebsite(userID,website){

                website._id = (new Date()).getTime().toString();

                website.developerId = userID.toString();

                websites.push(website);

          return websites;
        }

        function findWebsiteByUser(userId) {
            var sites = [];

            for(var w in websites) {

                if(userId === websites[w].developerId) {

                    sites.push(websites[w]);
                }
            }
            return sites;
        }

        function findWebsiteById(websiteId) {
            for(var w in websites) {
                if(websiteId === websites[w]._id) {
                    return websites[w];
                }
            }
            return null;
        }
        function updateWebsite(websiteId,website) {

            for (var w in websites) {
                if (websiteId === websites[w]._id) {
                    websites[w].name=website.name
                    websites[w].description=website.description

                }
            }
        }

        function deleteWebsite(websiteId) {
            for(var w in websites) {
                if (websites[w]._id === websiteId) {
                    websites.splice(w,1)
                }
            }
        }


    }
})();