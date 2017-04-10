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
        role: {type: String, enum: ['EXPERT','ADMIN','USER'], default: 'USER'},
        entries :  [{type: mongoose.Schema.Types.ObjectId, ref:'EntryModel'}],
        dateCreated :  {type: Date, default: Date.now()},
        favorites : [{type: mongoose.Schema.Types.ObjectId, ref:'AttractionModel'}],
        following : [{type:mongoose.Schema.Types.ObjectId,ref:'UsersModel'}],
        followers : [{type:mongoose.Schema.Types.ObjectId,ref:'UsersModel'}],
        title:String,
        suggestions : [{type: mongoose.Schema.Types.ObjectId, ref:'SuggestionModel'}],
        city:String,
    }, {collection: 'project.users'});

    UsersSchema.post("remove", function(user) {
        var EntryModel = model.EntryModel.getModel();
        var SuggestionModel=model.SuggestionModel.getModel();

        EntryModel.find({_id: {$in: user.entries}},function(err, entries) {
            if(err == null) {
                EntryModel.remove({_id: {$in: user.entries}}).exec();
            }
        });
        SuggestionModel.find({_id: {$in: user.suggestions}},function(err, entries) {
            if(err == null) {
                SuggestionModel.remove({_id: {$in: user.suggestions}}).exec();
            }
        });
    })
    return UsersSchema;
};