/**
 * Created by hiresave on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];
        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteID,page){

            page._id = (new Date()).getTime().toString();

            page.websiteId = websiteID;

            pages.push(page);

            return page;
        }

        function findPageByWebsiteId(websiteID) {
            var pagen = [];

            for(var p in pages) {

                if(pages[p].websiteId === websiteID) {

                    pagen.push(pages[p]);
                }
            }
            return pagen;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pageId === pages[p]._id) {
                    return pages[p];
                }
            }
            return null;
        }
        function updatePage(pageId, page) {

            for(var p in pages) {
                if (pageId === pages[p]._id) {
                    pages[p].name=page.name
                    pages[p].description=page.description
                }
            }
        }

        function deletePage(pageId) {
            for(var p in pages) {
                if (pageId === pages[p]._id) {
                    pages.splice(p,1)
                }
            }
        }


    }
})();