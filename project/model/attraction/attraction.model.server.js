/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function () {

    // console.log('user.model.server.js');

    var q = require('q');
    var model = null;
    var mongoose = require("mongoose");
    var AttractionSchema;
    var AttractionModel;

    var api = {

        setModel:setModel,
        getModel:getModel,
        favorite:favorite
    };
    return api;

    function favorite(userId,attractionId,status,attraction){
        var deffered = q.defer();
        var newattraction= {
            attractionId: attractionId,
            favorited: [userId]
        }
        console.log("newattraction object",attractionId)
        AttractionModel.find({attractionId:attractionId},function (err,en) {
            if (err) {
                console.log("enter if part")
                AttractionModel
                    .create(newattraction)
                    .then(function (succ) {
                        console.log("sucess :",succ)
                        deffered.resolve(succ);
                    })
            }
            else {
                console.log("error else part,push :",en)
                en.favorited.push(userId);
                en.save();
                deffered.resolve(en);
        }
        });
        console.log("the end")
        return deffered.promise;
    }

    function getModel() {
        return AttractionModel;
    }

    function setModel(models) {
        model=models;
        AttractionSchema = require('./attraction.schema.server.js')(models);
        AttractionModel = mongoose.model('AttractionModel', AttractionSchema);

    }


};

