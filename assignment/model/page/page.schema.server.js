/**
 * Created by hiresave on 3/20/2017.
 */

module.exports = function () {
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
    return PageSchema;
};