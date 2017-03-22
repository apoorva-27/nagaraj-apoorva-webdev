/**
 * Created by hiresave on 3/20/2017.
 */

module.exports = function() {
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
        rows: String,
        size: String,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "widgets"});
    return WidgetSchema;
};