/**
 * Created by hiresave on 3/20/2017.
 */

console.log("models.server.js");

module.exports = function () {/*
    var UserModel = require('../../assignment/model/user/user.model.server.js')();
    require('../../assignment/user.model.server.js')(app, UserModel);

    UserModel.create({username:'bob',password:'bob',firstname:'Bob', lastname:'Marley'});
*/
    var UserModel       = require("./user/user.model.server")();
    var EntryModel    = require("./entry/entry.model.server")();
    var AttractionModel=require("./attraction/attraction.model.server") ();
    var ExpertModel=require("./expert/expert.model.server") ();


    var model = {
        UserModel: UserModel,
        EntryModel: EntryModel,
        AttractionModel:AttractionModel,
        ExpertModel:ExpertModel

    };

    UserModel.setModel(model);
    EntryModel.setModel(model);
    AttractionModel.setModel(model);
    ExpertModel.setModel(model);
    // WidgetModel.setModel(model);

    return model;
    // TODO: create the services for the other entities: website, page, widget
};