/**
 * Created by hiresave on 3/20/2017.
 */

console.log("models.server.js");

module.exports = function () {/*
    var UserModel = require('../../assignment/model/user/users.model.server.js')();
    require('../../assignment/users.model.server.js')(app, UserModel);

    UserModel.create({username:'bob',password:'bob',firstname:'Bob', lastname:'Marley'});
*/
    var UsersModel       = require("./user/users.model.server.js")();
    var EntryModel    = require("./entry/entry.model.server")();
    var AttractionModel=require("./attraction/attraction.model.server") ();
    var ExpertModel=require("./expert/expert.model.server") ();


    var model = {
        UsersModel: UsersModel,
        EntryModel: EntryModel,
        AttractionModel:AttractionModel,
        ExpertModel:ExpertModel

    };

    UsersModel.setModel(model);
    EntryModel.setModel(model);
    AttractionModel.setModel(model);
    ExpertModel.setModel(model);

    return model;
};