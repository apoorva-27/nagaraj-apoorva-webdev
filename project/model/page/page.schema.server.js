/**
 * Created by hiresave on 3/20/2017.
 */

module.exports = function (model) {
    var mongoose = require('mongoose');

    var PageSchema = mongoose.Schema({

        _website: {type: mongoose.Schema.Types.String, ref: 'WebsiteModel'},
        // _website:String,
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.String, ref:'WidgetModel'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "pages"});

    PageSchema.post('remove', function (next) {
        var page = this;
        var WidgetModel = model.WidgetModel.getModel();
        var WebsiteModel = model.WebsiteModel.getModel();
        WidgetModel.remove({_page: page._id}).exec();
        WebsiteModel.findById(page._website)
            .then(function (website) {
                var index = website.pages.indexOf(page._id);
                if (index > -1) {
                    website.pages.splice(index, 1);
                    website.save();
                }
            });

    });

    return PageSchema;
};