/**
 * Created by hiresave on 3/1/2017.
 */

module.exports = function(app) {

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
        var pageId=req.params.pageId;
        var pagel;
        console.log(pageId);
        for(var w in pages) {
            if(pageId === pages[w]._id) {
                pagel=pages[w];
            }
        }
        console.log(pagel)
        res.json(pagel);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;


        var pagen = [];
        for(var w in pages) {
            if(websiteId === pages[w].websiteId) {
                pagen.push(pages[w]);
            }
        }
        // console.log(pagen);
        res.json(pagen);
    }
    function updatePage(req,res) {
        console.log(req.body);
        console.log("updatepahe in pege server");
        var pageId=req.params.pageId;
        var page=req.body;

        for(var w in pages) {
            if( pages[w]._id === pageId ) {
                pages[w].name = page.name;
                pages[w].description = page.description;
                console.log(pages[w]);
                res.json(pages[w]);
                return;
            }
        }
        return null;
    }

    function createPage(req,res) {
        console.log(req.body);
        var websiteID=req.params.websiteId;
        var newW = {
            _id:(new Date()).getTime().toString(),
            websiteId : websiteID,
            description : req.body.description,
            name : req.body.name

        };
        pages.push(newW);
        res.send(newW);
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
