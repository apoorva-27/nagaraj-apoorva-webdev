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
    var PlaceModel    = require("./place/place.model.server")();


    var model = {
        UserModel: UserModel,
        PlaceModel: PlaceModel,

    };

    UserModel.setModel(model);
    PlaceModel.setModel(model);
    // PageModel.setModel(model);
    // WidgetModel.setModel(model);

    return model;
    // TODO: create the services for the other entities: website, page, widget
};