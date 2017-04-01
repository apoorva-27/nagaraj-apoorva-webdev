/**
 * Created by hiresave on 3/20/2017.
 */

module.exports = function (model) {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({

        username : String,
        password : String,
        firstname : String,
        lastname : String,
        email : String,
        phone : String,
        //_id:String,
        websites :  [{type: mongoose.Schema.Types.String, ref:'WebsiteModel'}],
        dateCreated :  {type: Date, default: Date.now()}

    }, {collection: 'users'});

    UserSchema.post('remove', function (next) {
        var WebsiteModel = model.WebsiteModel.getModel();
        var PageModel = model.PageModel.getModel();
        var WidgetModel = model.WidgetModel.getModel();
        var user = this;

        PageModel.find({_website: {$in: user.websites}}, '_id', function (err, pages) {
            if (err == null) {
                WidgetModel.remove({_page: {$in: pages}}).exec();
                PageModel.remove({_id: {$in: pages}}).exec();
                WebsiteModel.remove({_id: {$in: user.websites}}).exec();
            }
        });

    });

    return UserSchema;
};