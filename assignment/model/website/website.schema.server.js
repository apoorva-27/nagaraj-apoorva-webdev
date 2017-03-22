/**
 * Created by hiresave on 3/20/2017.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema({

        // _user: {type: mongoose.Schema.Types.String, ref: 'UserModel'},

        _user: String,
        name : String,
        description : String,
        pages : [{type: mongoose.Schema.Types.String, ref:'PageModel'}],
        dateCreated :  {type: Date, default: Date.now()}

    }, {collection: 'websites'});

    return WebsiteSchema;
};
