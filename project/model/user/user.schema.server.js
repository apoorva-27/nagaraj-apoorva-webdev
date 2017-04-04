/**
 * Created by hiresave on 3/20/2017.
 */

module.exports = function (model) {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({

        username : String,
        password : String,
        firstname : String,
        lastname : String,
        email : String,
        phone : String,
        //_id:String,
        entries :  [{type: mongoose.Schema.Types.String, ref:'EntryModel'}],
        dateCreated :  {type: Date, default: Date.now()}

    }, {collection: 'users'});

    UserSchema.post("remove", function(user) {
        var EntryModel = require("../entry/entry.model.server");

        model.EntryModel.find({_id: {$in: user.entries}},function(err, entries) {
            if(err == null) {
                // widgetModel.remove({_page: {$in: pages}}).exec();
                EntryModel.remove({_id: {$in: user.entries}}).exec();
            }
        });

        EntryModel.remove({_id: {$in: user.entries}}).exec();

    })
    return UserSchema;
};