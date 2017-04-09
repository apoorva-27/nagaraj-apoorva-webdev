/**
 * Created by hiresave on 4/5/2017.
 */

module.exports = function (model) {
    var mongoose = require('mongoose');

    var ExpertSchema = mongoose.Schema({

        username : String,
        password : String,
        firstname : String,
        lastname : String,
        email : String,
        phone : String,
        cityId:String,
        city:String,
        title:String,
        suggestion : String,
        dateCreated :  {type: Date, default: Date.now()}

    }, {collection: 'experts'});

    return ExpertSchema;
};