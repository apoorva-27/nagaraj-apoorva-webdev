/**
 * Created by hiresave on 3/20/2017.
 */

module.exports = function (model) {
    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema({

        // _user: {type: mongoose.Schema.Types.String, ref: 'UserModel'},

        _user: String,
        name : String,
        description : String,
        pages : [{type: mongoose.Schema.Types.String, ref:'PageModel'}],
        dateCreated :  {type: Date, default: Date.now()}

    }, {collection: 'websites'});

    WebsiteSchema.post('remove', function(next) {
        var PageModel = model.PageModel.getModel();
        var WidgetModel = model.WidgetModel.getModel();
        var UserModel = model.UserModel.getModel();
        var website = this;
        console.log(website._id);
        UserModel.findById(website._user)
            .then(function (user) {
                var index = user.websites.indexOf(website._id);
                if(index > -1) {
                    user.websites.splice(index, 1);
                    user.save();
                }
            });
        WidgetModel.remove({_page: {$in: website.pages}}).exec();
        PageModel.remove({_id: {$in: website.pages}}).exec();

    });

    return WebsiteSchema;
};
