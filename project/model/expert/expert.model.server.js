/**
 * Created by hiresave on 4/5/2017.
 */


module.exports = function () {

    var q = require('q');
    var model = null;
    var mongoose = require("mongoose");
    var ExpertSchema;
    var ExpertModel;

    var api = {
        createExpert: createExpert,
        findExpertByCredentials:findExpertByCredentials,
        findExpertByUsername:findExpertByUsername,
        findExpertById:findExpertById,
        updateExpert:updateExpert,
        setModel:setModel,
        getModel:getModel,
        deleteExpert:deleteExpert,
    };

    return api;

    function setModel(models) {
        model=models;
        ExpertSchema = require('./expert.schema.server')(models);
        ExpertModel = mongoose.model('ExpertModel', ExpertSchema);
    }

    function getModel() {
        return ExpertModel;
    }

    function deleteExpert(userId) {
        return ExpertModel.findByIdAndRemove(userId, function (err, user) {
            if (user != null)
            {
                user.remove();
            }
        });
    }

    function updateExpert(userId,new_user) {
        var deffered = q.defer();
        ExpertModel
            .update(
                {_id: userId},{$set : new_user},function(err,usr) {
                    if(err){
                        deffered.reject(err);
                    }
                    else{
                        return usr
                    }
                });
        return deffered.promise;
    }

    function findExpertById(userId) {

        var deffered = q.defer();
        ExpertModel.findById(userId ,function (err,usr) {
            if(err){
                deffered.reject(err);
            }
            else{

                deffered.resolve(usr);
            }
        });
        return deffered.promise;
    }

    function findExpertByUsername(username) {
        var deffered = q.defer();
        ExpertModel.find({username:username} ,function (err,usr) {
            if(err){
                deffered.reject(err);
            }
            else{
                deffered.resolve(usr);
            }
        });
        return deffered.promise;
    }

    function findExpertByCredentials(username,password) {
        var deffered = q.defer();
        ExpertModel.find({username:username,password:password} ,function (err,usr) {
            if(err){
                deffered.reject(err);
            }
            else{
                deffered.resolve(usr);
            }
        });
        return deffered.promise;
    }
    function createExpert(user) {
        var deffered = q.defer();
        ExpertModel.create(user,function (err,usr) {
            if(err){
                console.log("hello   "+err);
                deffered.reject(err);
            }
            else{
                console.log("user " + usr);
                deffered.resolve(usr);
            }
        });
        return deffered.promise;
    }

};