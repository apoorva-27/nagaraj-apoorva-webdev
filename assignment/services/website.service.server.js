/**
 * Created by hiresave on 3/1/2017.
 */

module.exports = function(app,WebsiteModel) {

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
        var userId=req.params.userId;
        var websiteId=req.params.websiteId;
        // console.log("userid find by id"+userId);
        // console.log("req.params"+req.body)
        WebsiteModel
            .findWebsiteById(websiteId)
            .then (function (web) {
                    // console.log("user object at user service 3"+user)
                    res.json(web);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                });
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        console.log("findallwebsites for user in server"+userId)
        WebsiteModel
            .findAllWebsitesForUser(userId)
            .then (function (websites) {
                    // console.log("user object at user service"+user)
                    res.json(websites);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                });
    }
    function updateWebsite(req,res) {
        var userId=req.params.userId;
        var websiteId=req.params.websiteId;
        var website=req.body;
        console.log("website  in request  body"+website);

        WebsiteModel
            .updateWebsite(websiteId,website)
            .then (function (web) {
                    console.log("user object at user service 4"+web)
                    res.json(web);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                });
    }

    function createWebsite(req,res) {
        var newWebsite=req.body;
        WebsiteModel
            .createWebsite(newWebsite)
            .then(function (website) {
                    res.json(website);

                },
                function (err) {
                    res.sendStatus(500).send(err);
                });
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
