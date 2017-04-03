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

    return UserSchema;
};