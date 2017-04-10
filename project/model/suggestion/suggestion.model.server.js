/**
 * Created by hiresave on 4/5/2017.
 */


module.exports = function () {

    var q = require('q');
    var model = null;
    var mongoose = require("mongoose");
    var SuggestionSchema;
    var SuggestionModel;

    var api = {
        createSuggestion: createSuggestion,
        findSuggestionByCredentials:findSuggestionByCredentials,
        findSuggestionByUsername:findSuggestionByUsername,
        findSuggestionById:findSuggestionById,
        updateSuggestion:updateSuggestion,
        setModel:setModel,
        getModel:getModel,
        deleteSuggestion:deleteSuggestion,
        // createEntry:createEntry,
        findSuggestionsForCity:findSuggestionsForCity,
        getAllSuggestions:getAllSuggestions
    };

    return api;

    function getAllSuggestions() {
        // console.log("model get all suggestions")

        var deffered = q.defer();
        SuggestionModel
            .find({},function(err,suggestion) {
                if(suggestion[0]==undefined) {
                    // console.log("error")
                    deffered.reject(err);
                }
                else {
                    // console.log("model server success :",suggestion)
                    deffered.resolve(suggestion);
                }
            })
        return deffered.promise;
    }

    function findSuggestionsForCity(cityname) {
        var deffered = q.defer();
        SuggestionModel.find({city:cityname} ,function (err,usr) {
            if(err){
                deffered.reject(err);
            }
            else{
                deffered.resolve(usr);
            }
        });
        return deffered.promise;
    }

    function createSuggestion(userId,suggestion){
        var deffered = q.defer();
        console.log("model suggestion create :",suggestion)
        SuggestionModel
            .create(suggestion,function (err,sugg) {
            // .update({_id:userId},{$set : suggestion}, function(err,user) {
                if(err){
                    deffered.reject(err);
                }
                else{
                    console.log("check for user update")
                    model.UsersModel
                        .findUserById(sugg.userId)
                        .then(function(user) {
                            console.log("is user found :",user)
                            user.suggestions.push(sugg._id);
                            user.save();
                        })
                    deffered.resolve(sugg);
                }
            })
        return deffered.promise;
    }

     function setModel(models) {
        model=models;
        SuggestionSchema = require('./suggestion.schema.server.js')(models);
        SuggestionModel = mongoose.model('SuggestionModel', SuggestionSchema);
    }

    function getModel() {
        return SuggestionModel;
    }

    function deleteSuggestion(suggestionId) {
        // console.log("delete suggestion :",suggestionId)
        return SuggestionModel.findByIdAndRemove(suggestionId, function (err, user) {
            if (user != null)
            {
                user.remove();
            }
        });
    }

    function updateSuggestion(suggestionId,suggestion) {
        var deffered = q.defer();
        console.log("update sserver model :",suggestion)
        SuggestionModel
            .update(
                {_id: suggestionId},{$set : suggestion},function(err,usr) {
                    if(err){
                        deffered.reject(err);
                    }
                    else{
                       deffered.resolve(usr);
                    }
                });
        return deffered.promise;
    }

    function findSuggestionById(userId) {

        var deffered = q.defer();
        SuggestionModel.findById(userId ,function (err,usr) {
            if(err){
                deffered.reject(err);
            }
            else{

                deffered.resolve(usr);
            }
        });
        return deffered.promise;
    }

    function findSuggestionByUsername(username) {
        var deffered = q.defer();
        SuggestionModel.find({username:username} ,function (err,usr) {
            if(err){
                deffered.reject(err);
            }
            else{
                deffered.resolve(usr);
            }
        });
        return deffered.promise;
    }

    function findSuggestionByCredentials(username,password) {
        var deffered = q.defer();
        SuggestionModel.find({username:username,password:password} ,function (err,usr) {
            if(err){
                deffered.reject(err);
            }
            else{
                deffered.resolve(usr);
            }
        });
        return deffered.promise;
    }


};