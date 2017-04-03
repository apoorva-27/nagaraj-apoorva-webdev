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
        setModel:setModel

    };

    return api;

    function createEntry(entry) {
        console.log("entry model create server")

            var deffered = q.defer();
            EntryModel.create(entry,function (err,en) {
                if(err){
                    console.log("entry model create error"+err);
                    deffered.reject(err);
                }
                else{
                    console.log("entry model create success"+err);

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