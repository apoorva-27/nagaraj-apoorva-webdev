/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function (model) {
    var mongoose = require('mongoose');

    var PlaceSchema = mongoose.Schema({

        name: String,
        tripId: Number,
        tripexpert_score: Number,
        address: String,
        website: String,
        opening_hours: String,
        // entries : diary entries
        reviews: [{type: String}]
    }, {collection: 'places'});

    return PlaceSchema;
}