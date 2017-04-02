/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function (model) {
    var mongoose = require('mongoose');

    var PlaceSchema = mongoose.Schema({

        name: String,
        tripId: Number,
        score: Number,
        lat: Number,
        long: Number,
        address: String,
        website: String,
        hours: String,
        // entries : diary entries
        reviews: [{type: String}]
    }, {collection: 'places'});

    return PlaceSchema;
}