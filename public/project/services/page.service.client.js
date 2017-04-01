/**
 * Created by hiresave on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("PageService", PageService);

    function PageService($http) {

        var api = {
            "createPage": createPage,
            "findAllPagesForWebsite": findAllPagesForWebsite,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId,page){

            var newpage=
                {
                    _website: websiteId,
                    name: page.name,
                    //_id: (new Date()).getTime().toString(),
                    description:page.description
                }

            return $http.post("/api/website/"+websiteId+"/page",newpage);
        }

        function findAllPagesForWebsite(websiteID) {
            return $http.get("/api/website/"+websiteID+"/page");
        }

        function findPageById(pageId) {
            return $http.get("/api/page/"+pageId);
        }
        function updatePage(pageId, page) {
            return $http.put("/api/page/"+pageId,page);
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId);
    }
}})();