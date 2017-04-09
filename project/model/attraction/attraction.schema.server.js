/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function (model) {
    var mongoose = require('mongoose');

    var AttractionSchema = mongoose.Schema({

        name: String,
        attractionId: String,
        tripexpert_score: Number,
        address: String,
        website: String,
        opening_hours: String,
        // entries : diary entries
        // entries: [{type: String}],
        favorited : [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}]
    }, {collection: 'attractions'});

    return AttractionSchema;
};

