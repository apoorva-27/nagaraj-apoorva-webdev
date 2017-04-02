/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function () {

    // console.log('user.model.server.js');

    var q = require('q');
    var model = null;
    var mongoose = require("mongoose");
    var PlaceSchema;
    var PlaceModel;
    // PlaceModel = mongoose.model('PlaceModel', PlaceSchema);

    var api = {
        findPlaceByText: findPlaceByText,
        setModel:setModel

    };

    return api;

    function setModel(models) {
        model=models;
        PlaceSchema = require('./place.schema.server')(models);
        PlaceModel = mongoose.model('PlaceModel', PlaceSchema);

    }

    function findPlaceByText(searchTerm) {
        // model=models;
        // UserSchema = require('./user.schema.server')(models);
        var API_KEY="6ddc0c1237b6993533a2bb974dac23e6";


        var urlBase = "https://api.tripexpert.com/v1/destinations?api_key=API_KEY";

        console.log("serach term in service",searchTerm)
        var results = urlBase.replace("API_KEY", API_KEY);
        var response= $http.get(results);
        console.log(response)

    }
};

