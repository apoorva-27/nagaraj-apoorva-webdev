/**
 * Created by hiresave on 3/1/2017.
 */

module.exports = function(app) {

    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId',findWebsiteById);
    app.put('/api/website/:websiteId',updateWebsite);
    app.delete('/api/website/:websiteId',deleteWebsite);
    app.post('/api/user/:userId/website',createWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
    ];

    function findWebsiteById(req,res) {
        var websiteId=req.params.websiteId;
        var sites;
        for(var w in websites) {
            if(websiteId === websites[w]._id) {
                sites=websites[w];
            }
        }

        res.json(sites);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        var sites = [];
        for(var w in websites) {
            if(userId === websites[w].developerId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }
    function updateWebsite(req,res) {
        console.log(req.body);
        var websiteId=req.params.websiteId;
        var newSite=req.body;
        for(var w in websites) {
            if( websites[w]._id === websiteId ) {
                websites[w].name = newSite.name;
                websites[w].description = newSite.description;
                console.log(websites[w]);
                res.json(websites[w]);
                return;
            }
        }
        return null;
    }

    function createWebsite(req,res) {
        console.log(req.body);
        var userID=req.params.userId;
        var newW = {
            _id:(new Date()).getTime().toString(),
            developerId : userID,
            description : req.body.description,
            name : req.body.name

        };
        websites.push(newW);
        res.send(newW);
    }

    function deleteWebsite(req,res) {
        var websiteId = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                // console.log("did it delete?")
                return;
            }
        }
        res.sendStatus(404);
    }

}
