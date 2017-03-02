/**
 * Created by hiresave on 2/28/2017.
 */

module.exports = function (app) {
    require("./services/user.service.server") (app);
    require("./services/website.service.server") (app);
    require("./services/page.service.server") (app);
    require("./services/widget.service.server") (app);
}


