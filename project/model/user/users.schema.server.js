/**
 * Created by hiresave on 3/20/2017.
 */

module.exports = function (model) {
    var mongoose = require('mongoose');

    var UsersSchema = mongoose.Schema({

        username : String,
        password : String,
        firstname : String,
        lastname : String,
        email : String,
        phone : String,
        //_id:String,
        entries :  [{type: mongoose.Schema.Types.String, ref:'EntryModel'}],
        dateCreated :  {type: Date, default: Date.now()},
        favorites : [{type: mongoose.Schema.Types.String, ref:'AttractionModel'}],
        following : [{type:mongoose.Schema.Types.String,ref:'UsersModel'}],
        followers : [{type:mongoose.Schema.Types.String,ref:'UsersModel'}]
    }, {collection: 'project.users'});

    UsersSchema.post("remove", function(user) {
        var EntryModel = model.EntryModel.getModel();

        EntryModel.find({_id: {$in: user.entries}},function(err, entries) {
            if(err == null) {
                EntryModel.remove({_id: {$in: user.entries}}).exec();
            }
        });
    })
    return UsersSchema;
};