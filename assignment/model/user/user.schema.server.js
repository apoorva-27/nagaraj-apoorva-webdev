/**
 * Created by hiresave on 3/20/2017.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({

        username : String,
        password : String,
        firstname : String,
        lastname : String,
        email : String,
        phone : String,
        //_id:String,
        //websites : [Website],
        dateCreated : Date

    }, {collection: 'users'});

    return UserSchema;
};