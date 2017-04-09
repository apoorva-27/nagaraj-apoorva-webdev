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
        findFavoritesByUserId:findFavoritesByUserId,
        getAllAttractions:getAllAttractions
    };
    return api;

    function getAllAttractions() {
        var deffered = q.defer();
        // console.log("step 5 : model")
        AttractionModel
            .find({},function(err,user) {
                if(user[0]==undefined) {
                    deffered.reject(err)
                }
                else {
                    // console.log("success object :",user)
                    // console.log("step 6 : model success")
                    deffered.resolve(user)
                }
            })
        return deffered.promise;
    }

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
        // console.log("wat does my attraction object have before creating",attraction.response.venues)
        var newattraction= {
            attractionId: attractionId,
            favorited: [userId],
            name:attraction.response.venues[0].name,
            score:attraction.response.venues[0].score,
            address:attraction.response.venues[0].address,
            website:attraction.response.venues[0].website,
            opening_hours:attraction.response.venues[0].opening_hours
        }
        console.log("newattraction object :",newattraction)
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

