/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function (model) {
    var mongoose = require('mongoose');

    var EntrySchema = mongoose.Schema({

        content: String,
        placeId: String,
        date:Date,
        title:String,
        // entries : diary entries
        userId: String
    }, {collection: 'entries'});

    return EntrySchema;
}