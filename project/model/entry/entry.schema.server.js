/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function (model) {
    var mongoose = require('mongoose');

    var EntrySchema = mongoose.Schema({

        story: String,
        attractionId: String,
        date:Date,
        title:String,
        follow:String,
        // entries : diary entries
        userId: String
    }, {collection: 'entries'});

    EntrySchema.post("remove", function (entry) {
        var UserModel = require("../user/user.model.server");
        // var widgetModel = require("../widget/widget.model.server");

        model.UserModel
            .findUserById(entry.userId)
            .then(function (user) {
                var entry_index = user.entries.indexOf(entry._id);
                user.entries.splice(entry_index, 1);
                user.save();
            });

        // widgetModel.remove({_id: {$in: page.widgets}}).exec();
    })
    return EntrySchema;
}