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
    var WebsiteModel    = require("./website/website.model.server")();
    var PageModel       = require("./page/page.model.server")();
    var WidgetModel     = require("./widget/widget.model.server")();

    var model = {
        UserModel: UserModel,
        WebsiteModel: WebsiteModel,
        PageModel:PageModel,
        WidgetModel:WidgetModel
    };

    UserModel.setModel(model);
    WebsiteModel.setModel(model);
    PageModel.setModel(model);
    WidgetModel.setModel(model);

    return model;
    // TODO: create the services for the other entities: website, page, widget
};