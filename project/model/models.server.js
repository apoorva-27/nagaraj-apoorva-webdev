/**
 * Created by hiresave on 3/20/2017.
 */

console.log("models.server.js");

module.exports = function () {/*

*/
    var UsersModel       = require("./user/users.model.server.js")();
    var EntryModel    = require("./entry/entry.model.server")();
    var AttractionModel=require("./attraction/attraction.model.server") ();
    var SuggestionModel=require("./suggestion/suggestion.model.server.js") ();


    var model = {
        UsersModel: UsersModel,
        EntryModel: EntryModel,
        AttractionModel:AttractionModel,
        SuggestionModel:SuggestionModel

    };

    UsersModel.setModel(model);
    EntryModel.setModel(model);
    AttractionModel.setModel(model);
    SuggestionModel.setModel(model);

    return model;
};