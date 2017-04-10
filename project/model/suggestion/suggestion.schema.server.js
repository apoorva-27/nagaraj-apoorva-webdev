/**
 * Created by hiresave on 4/5/2017.
 */

module.exports = function (model) {
    var mongoose = require('mongoose');

    var SuggestionSchema = mongoose.Schema({

        // username : String,
        // password : String,
        firstname : String,
        lastname : String,
        email : String,
        userId:[{type: mongoose.Schema.Types.ObjectId, ref:'UsersModel'}],
        switch:String,
        phone : String,
        cityId:String,
        city:String,
        title:String,
        suggestion : String,
        dateCreated :  {type: Date, default: Date.now()}

    }, {collection: 'suggestions'});

    return SuggestionSchema;
};