/**
 * Created by hiresave on 3/20/2017.
 */

module.exports = function(model) {
    var mongoose = require("mongoose");
    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.String, ref: 'PageModel'},
        // _page:String,
        type: {type:String, enum:['HEADER','IMAGE','YOUTUBE','HTML','TEXT']},
        // type:String,
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: String,
        position:Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "widgets"});

    WidgetSchema.post('remove', function(next) {
        var PageModel = model.PageModel.getModel()
        var widget = this;
        PageModel.findById(widget._page)
            .then(function (page) {
                var index = page.widgets.indexOf(widget._id);
                if (index > -1) {
                    page.widgets.splice(index, 1);
                    page.save();
                }
            });
    });

    return WidgetSchema;
};