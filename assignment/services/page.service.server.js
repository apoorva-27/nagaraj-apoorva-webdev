/**
 * Created by hiresave on 3/1/2017.
 */

module.exports = function(app,PageModel) {

    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId',findPageById);
    app.put('/api/page/:pageId',updatePage);
    app.delete('/api/page/:pageId',deletePage);
    app.post('/api/website/:websiteId/page',createPage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function findPageById(req,res) {
        var userId=req.params.userId;
        var websiteId=req.params.websiteId;
        var pageId=req.params.pageId;
        // console.log("userid find by id"+userId);
        // console.log("req.params"+req.body)
        PageModel
            .findPageById(pageId)
            .then (function (page) {
                    // console.log("user object at user service 3"+user)
                    res.json(page);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                });
    }

    function findAllPagesForWebsite(req, res) {
        var userId=req.params.userId;
        var websiteId=req.params.websiteId;
        // console.log("findall pages for website"+websiteId);
        // console.log("req.params"+req.body)
        PageModel
            .findAllPagesForWebsite(websiteId)
            .then (function (pages) {
                    // console.log("user object at user service 3"+user)
                    res.json(pages);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                });
    }
    function updatePage(req,res) {
        var userId=req.params.userId;
        var websiteId=req.params.websiteId;
        var pageId=req.params.pageId;
        var page=req.body;
        // console.log("website  in request  body"+website);

        PageModel
            .updatePage(pageId,page)
            .then (function (page) {
                    // console.log("user object at user service 4"+web)
                    res.json(page);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                });
    }

    function createPage(req,res) {
        var newPage=req.body;
        PageModel
            .createPage(newPage)
            .then(function (page) {
                    res.json(page);

                },
                function (err) {
                    res.sendStatus(500).send(err);
                });
    }

    function deletePage(req,res) {
        var pageId = req.params.pageId;
        for(var w in pages) {
            if(pages[w]._id === pageId) {
                pages.splice(w, 1);
                res.sendStatus(200);
                // console.log("did it delete?")
                return;
            }
        }
        res.sendStatus(404);
    }
}
