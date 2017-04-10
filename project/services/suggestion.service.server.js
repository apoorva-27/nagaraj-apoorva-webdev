/**
 * Created by hiresave on 4/5/2017.
 */

module.exports = function (app,SuggestionModel) {
    app.get("/api/suggestion", findSuggestion);
    app.get("/api/suggestion/:userId",findSuggestionById);
    app.put("/api/suggestion/:suggestionId",updateSuggestion);
    // app.post("/api/suggestion",createSuggestion);
    app.delete("/api/suggestion/:userId",deleteSuggestion);
    app.post("/api/suggestion/:userId/suggestion",createSuggestion);
    app.get("/api/suggestions/:cityname",findSuggestionsForCity);
    app.get("/api/admin/suggestions",getAllSuggestions);


    function getAllSuggestions(req,res) {
        // console.log("service server get all suggestions")

        SuggestionModel
            .getAllSuggestions()
            .then (function (array){
                    // console.log(array)
                    res.json(array)
                },
                function(err){
                    res.sendStatus(400).send(err)
                })
    }

    function findSuggestionsForCity(req,res){
        var cityname=req.params.cityname;
        SuggestionModel
            .findSuggestionsForCity(cityname)
            .then(function (user) {
                res.json(user)
            }),
            (function (err) {
                res.sendStatus(400).send(err)
            });
    }

    function createSuggestion(req,res) {
        var suggestion=req.body;
        var userId=req.params.userId;
        console.log("user id sggestion server service :",suggestion)
        SuggestionModel
            .createSuggestion(userId,suggestion)
            .then(function (user) {
                res.json(user)
            }),
            (function (err) {
                res.sendStatus(400).send(err)
            });
    }

    // function createSuggestion(req,res) {
    //     var newU=req.body;
    //     console.log("newU :",newU)
    //     SuggestionModel
    //         .createSuggestion(newU)
    //         .then(function (user) {
    //                 res.json(user);
    //             },
    //             function (err) {
    //                 res.sendStatus(400).send(err);
    //             });
    // }

    function findSuggestion(req,res) {
        var username=req.query.username;
        var password=req.query.password;

        if(username && password) {
            findSuggestionByCredentials(req,res);
        } else if (username) {
            findSuggestionByUsername(req,res);
        }
    }
    function findSuggestionByCredentials (req,res){
        var username=req.query.username;
        var password=req.query.password;

        SuggestionModel
            .findSuggestionByCredentials(username,password)
            .then (function (user) {
                    res.json(user[0]);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function findSuggestionByUsername(req,res) {
        var username=req.query.username;

        SuggestionModel
            .findSuggestionByUsername(username)
            .then (function (user) {
                    res.json(user[0]);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function findSuggestionById(req,res) {
        var userId=req.params.userId;
        SuggestionModel
            .findSuggestionById(userId)
            .then (function (user) {
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function updateSuggestion(req,res) {
        var suggestionId=req.params.suggestionId;
        var suggestion=req.body;
        SuggestionModel
            .updateSuggestion(suggestionId,suggestion)
            .then (function (suggestion) {
                    console.log("user object at user service 4"+suggestion)
                    res.json(suggestion);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }
    function deleteSuggestion(req, res) {
        var suggestionId = req.params.suggestionId;
        SuggestionModel
            .deleteSuggestion(suggestionId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }
};