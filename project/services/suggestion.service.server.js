/**
 * Created by hiresave on 4/5/2017.
 */

module.exports = function (app,SuggestionModel) {
    app.get("/api/suggestion", findSuggestion);
    app.get("/api/suggestion/:userId",findSuggestionById);
    app.put("/api/suggestion/:suggestionId",updateSuggestion);
    app.delete("/api/suggestion/:suggestionId",deleteSuggestion);
    app.post("/api/suggestion/:userId/suggestion",createSuggestion);
    app.get("/api/suggestions/:cityname",findSuggestionsForCity);
    app.get("/api/admin/suggestions",getAllSuggestions);

    function getAllSuggestions(req,res) {
        SuggestionModel
            .getAllSuggestions()
            .then (function (array){
                    res.json(array)
                },
                function(err){
                    res.send(null)
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
        SuggestionModel
            .createSuggestion(userId,suggestion)
            .then(function (user) {
                res.json(user)
            }),
            (function (err) {
                res.sendStatus(400).send(err)
            });
    }

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