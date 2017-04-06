/**
 * Created by hiresave on 4/5/2017.
 */

module.exports = function (app,ExpertModel) {
    app.get("/api/expert", findExpert);
    app.get("/api/expert/:userId",findExpertById);
    app.put("/api/expert/:userId",updateExpert);
    app.post("/api/expert",createExpert);
    app.delete("/api/expert/:userId",deleteExpert);
    app.put("/api/expert/:userId/suggestion",createEntry)

    function createEntry(req,res) {
        var suggestion=req.body;
        var userId=req.params.userId;

        ExpertModel
            .createEntry(userId,suggestion)
            .then(function (user) {
                res.json(user)
            }),
            (function (err) {
                res.sendStatus(400).send(err)
            });
    }

    function createExpert(req,res) {
        var newU=req.body;
        ExpertModel
            .createExpert(newU)
            .then(function (user) {
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function findExpert(req,res) {
        var username=req.query.username;
        var password=req.query.password;

        if(username && password) {
            findExpertByCredentials(req,res);
        } else if (username) {
            findExpertByUsername(req,res);
        }
    }
    function findExpertByCredentials (req,res){
        var username=req.query.username;
        var password=req.query.password;

        ExpertModel
            .findExpertByCredentials(username,password)
            .then (function (user) {
                    res.json(user[0]);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function findExpertByUsername(req,res) {
        var username=req.query.username;

        ExpertModel
            .findExpertByUsername(username)
            .then (function (user) {
                    res.json(user[0]);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function findExpertById(req,res) {
        var userId=req.params.userId;
        ExpertModel
            .findExpertById(userId)
            .then (function (user) {
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function updateExpert(req,res) {
        var userId=req.params.userId;
        var user=req.body;
        ExpertModel
            .updateExpert(userId,user)
            .then (function (user) {
                    console.log("user object at user service 4"+user)
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }
    function deleteExpert(req, res) {
        var userId = req.params.userId;
        ExpertModel
            .deleteExpert(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }
};