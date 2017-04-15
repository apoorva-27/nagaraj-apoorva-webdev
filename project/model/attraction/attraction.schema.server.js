/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function (model) {
    var mongoose = require('mongoose');

    var AttractionSchema = mongoose.Schema({

        name: String,
        attractionId: String,
        tripexpert_score: Number,
        address: String,
        website: String,
        opening_hours: String,
        favorited : [{type: mongoose.Schema.Types.ObjectId, ref:'UsersModel'}]
    }, {collection: 'attractions'});

    AttractionSchema.post("remove", function(user) {
        var AttractionModel = model.AttractionModel.getModel();
        var UsersModel = model.UsersModel.getModel();

        var attraction=this;
        for (var i=0;i<attraction.favorited.length;i++){
            UsersModel.find({_id: attraction.favorited[i]},function(err, user) {
                if(err == null) {
                    var listi=attraction.favorited[i];
                    console.log("user :",user)
                    var index=user[0].favorites.indexOf(attraction._id);
                    if (index!=-1) {
                        user[0].favorites.splice(index,1);
                        user[0].save()
                    }
                }
            });
        }
    })
    return AttractionSchema;
};

