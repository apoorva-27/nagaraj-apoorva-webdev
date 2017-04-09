/**
 * Created by hiresave on 2/28/2017.
 */

module.exports = function (app) {
    var connectionString ='mongodb://127.0.0.1:27017/test';

    var models = require('./model/models.server')();
    // var UserModel = require('./model/user/user.model.server')();
    require("./services/user.service.server") (app,models.UsersModel);
    require("./services/attraction.service.server.js") (app,models.AttractionModel);
    require("./services/entry.service.server.js") (app,models.EntryModel);
    require("./services/expert.service.server.js") (app,models.ExpertModel);

}