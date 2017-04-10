/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function () {

    var q = require('q');
    var model = null;
    var mongoose = require("mongoose");
    var EntrySchema;
    var EntryModel;
    var UserModel=require("../user/users.model.server.js");

    var api = {
        createEntry: createEntry,
        setModel:setModel,
        findEntriesByAttraction:findEntriesByAttraction,
        findEntryByEntryId:findEntryByEntryId,
        updateEntry:updateEntry,
        deleteEntry:deleteEntry,
        getModel:getModel,
        getAllEntries:getAllEntries,
        findEntryById:findEntryById

    };

    return api;

    function findEntryById(entryId){
        var deffered = q.defer();
        EntryModel.find({_id:entryId}, function (err,entry) {
            if(err){
                // console.log("hello   "+err);
                deffered.reject(err);
            }
            else{
                // console.log("web " + entry);
                deffered.resolve(entry);
            }
        });
        return deffered.promise;
    }

    function getAllEntries() {
        var deffered = q.defer();
        EntryModel
            .find({},function(err,user) {
                if(user[0]==undefined) {
                    deffered.reject(err);
                }
                else {
                    // console.log("model server success")
                    deffered.resolve(user);
                }
            })
        return deffered.promise;
    }

    function deleteEntry(entryId) {
        return EntryModel.findByIdAndRemove(entryId, function (err, entry) {
            if (entry != null)
            {
                console.log("does it come to delete");
                entry.remove();
            }
        });

    }

    function updateEntry(entryId,entry) {

        console.log("update entry in entry model server,entry : ",entry)

        var deffered = q.defer();
        EntryModel
            .update(
                {_id: entryId},{$set : entry},function(err,usr) {
                    if(err){
                        // console.log("hello   "+err);
                        deffered.reject(err);
                    }
                    else{
                        // console.log("user :" + usr);
                        deffered.resolve(usr);
                        // return usr
                    }
                });
        return deffered.promise;
    }


    function findEntryByEntryId(entryId) {
        var deffered = q.defer();
        EntryModel.find({_id:entryId}, function (err,entry) {
            if(err){
                // console.log("hello   "+err);
                deffered.reject(err);
            }
            else{
                // console.log("web " + web.length);
                deffered.resolve(entry);
            }
        });
        return deffered.promise;
    }

    function findEntriesByAttraction(attractionId) {
        var deffered = q.defer();
        EntryModel.find({attractionId:attractionId}, function (err,entry) {
            if(err){
                // console.log("hello   "+err);
                deffered.reject(err);
            }
            else{
                // console.log("web " + web.length);
                deffered.resolve(entry);
            }
        });
        return deffered.promise;
    }

    function createEntry(entry) {
          var deffered = q.defer();
            EntryModel.create(entry,function (err,en) {
                if(err){
                    deffered.reject(err);
                }
                else{
                    model.UsersModel
                        .findUserById(en.userId)
                        .then(function(user) {
                            user.entries.push(en._id);
                            user.save();
                        })
                    deffered.resolve(en);
                }
            });
            return deffered.promise;

    }
    function setModel(models) {
        model = models;
        EntrySchema = require('./entry.schema.server')(models);
        EntryModel = mongoose.model('EntryModel', EntrySchema);

    }

    function getModel() {
        return EntryModel;
    }
}