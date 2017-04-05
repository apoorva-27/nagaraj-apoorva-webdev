/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function () {

    var q = require('q');
    var model = null;
    var mongoose = require("mongoose");
    var AttractionSchema;
    var AttractionModel;

    var api = {

        setModel:setModel,
        getModel:getModel,
        favorite:favorite,
        findFavoritesByUserId:findFavoritesByUserId
    };
    return api;

    function findFavoritesByUserId(userId,attractionId){
        var deffered = q.defer();
        AttractionModel.find({attractionId:attractionId},function (err,en) {
            if (en[0]==undefined) {
                console.log("case 1")
                deffered.reject();
            }
            else {
                var i = en[0].favorited.indexOf(userId);
                if (i<0)
                {
                    console.log("case 2")
                    deffered.reject()
                }
                else {
                    console.log("case 3 :",en[0])
                    deffered.resolve(en[0]);
                }
            }
            })
        return deffered.promise;
    }

    function favorite(userId,attractionId,status,attraction){
        var deffered = q.defer();
        var newattraction= {
            attractionId: attractionId,
            favorited: [userId]
        }
        AttractionModel.find({attractionId:attractionId},function (err,en) {
            if (en[0]==undefined) {
                AttractionModel
                    .create(newattraction)
                    .then(function (succ) {
                        deffered.resolve(succ);
                    })
            }
            else {
                var i = en[0].favorited.indexOf(userId);
                if (i<0)
                {
                    en[0].favorited.push(userId);
                    en[0].save();
                    deffered.resolve(en[0]);
                }
                else {
                en[0].favorited.splice(i, 1);
                en[0].save();
                deffered.resolve(en[0]);
                }
        }
        });
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

