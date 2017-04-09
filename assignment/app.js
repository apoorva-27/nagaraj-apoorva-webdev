/**
 * Created by hiresave on 2/28/2017.
 */

module.exports = function (app) {

    var connectionString ='mongodb://127.0.0.1:27017/test';

    var models = require('./model/models.server')();

    // var UserModel = require('./model/user/user.model.server')();
    require("./services/user.service.server") (app,models.UserModel);
    require("./services/website.service.server") (app,models.WebsiteModel);
    require("./services/page.service.server") (app,models.PageModel);
    require("./services/widget.service.server") (app,models.WidgetModel);



    // require("../assignment/model/user/users.model.server.js")();
    // require("../assignment/model/models.server.js")();

}


