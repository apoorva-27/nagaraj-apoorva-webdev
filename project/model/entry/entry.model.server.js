/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function () {

    // console.log('user.model.server.js');

    var q = require('q');
    var model = null;
    var mongoose = require("mongoose");
    var EntrySchema;
    var EntryModel;

    var api = {
        createEntry: createEntry,
        setModel:setModel,
        findEntriesByAttraction:findEntriesByAttraction,
        findEntryByEntryId:findEntryByEntryId,
        updateEntry:updateEntry,

    };

    return api;

    function updateEntry(entryId,entry) {
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
                        // deffered.resolve(usr);
                        return usr
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
        console.log("entry model create server")

            var deffered = q.defer();
            EntryModel.create(entry,function (err,en) {
                if(err){
                    console.log("entry model create error"+err);
                    deffered.reject(err);
                }
                else{
                    console.log("entry model create success"+en);

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
}