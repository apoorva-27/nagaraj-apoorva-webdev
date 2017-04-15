/**
 * Created by hiresave on 4/5/2017.
 */

module.exports = function (model) {
    var mongoose = require('mongoose');

    var SuggestionSchema = mongoose.Schema({

        userId:[{type: mongoose.Schema.Types.ObjectId, ref:'UsersModel'}],
        switch:String,
        phone : String,
        cityId:String,
        city:String,
        title:String,
        suggestion : String,
        dateCreated :  {type: Date, default: Date.now()}

    }, {collection: 'suggestions'});

    SuggestionSchema.post("remove", function (entry) {
        var UsersModel = require("../user/users.model.server.js");

        var suggestion=this;
        model.UsersModel
            .findUserById(suggestion.userId[0])
            .then(function (user) {
                console.log("user :",user)
                var entry_index = user[0].suggestions.indexOf(user[0]._id);
                user[0].suggestions.splice(entry_index, 1);
                user[0].save();
            });
    })

    return SuggestionSchema;
};