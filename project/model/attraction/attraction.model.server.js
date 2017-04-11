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
        getAllAttractions:getAllAttractions,
        findAttractionById:findAttractionById,
        updateAttraction:updateAttraction,
        deleteAttraction:deleteAttraction
    };
    return api;

    function deleteAttraction(attractionId){
        return AttractionModel.findByIdAndRemove(attractionId, function (err, user) {
            if (user != null)
            {
                user.remove();
            }
        });
    }

    function updateAttraction(attractionId,attraction) {
        var deffered = q.defer();
        AttractionModel
            .update(
                {_id: attractionId},{$set : attraction},function(err,usr) {
                    if(err){
                        // console.log("hello   "+err);
                        deffered.reject(err);
                    }
                    else{
                        // console.log("user :" + usr);
                        deffered.resolve(attraction);
                        // return usr
                    }
                });
        return deffered.promise;
    }


    function findAttractionById(attractionId) {
        var deffered = q.defer();
        console.log("attraction server service")

        AttractionModel
            .find({"_id":attractionId},function(err,user) {
                if(user[0]==undefined) {
                    deffered.reject(err)
                }
                else {
                    // console.log("success object :",user)
                    console.log("step 6 : model success :",user)
                    deffered.resolve(user[0])
                }
            })
        return deffered.promise;
    }

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
        var newattraction= {
            attractionId: attractionId,
            favorited: [userId],
            name:attraction.response.venues[0].name,
            score:attraction.response.venues[0].score,
            address:attraction.response.venues[0].address,
            website:attraction.response.venues[0].website,
            opening_hours:attraction.response.venues[0].opening_hours,
            tripexpert_score:attraction.response.venues[0].tripexpert_score
        }
        console.log("newattraction object :",newattraction)
        AttractionModel.find({attractionId:attractionId},function (err,en) {
            if (en[0]==undefined) {
                AttractionModel
                    .create(newattraction)
                    .then(function (succ) {
                        model.UsersModel
                            .findUserById(userId)
                            .then (function (success_user) {

                                founduser=success_user[0];
                                    console.log("found user frst :",founduser.favorites);
                                    success_user[0].favorites.push(succ._id);
                                    success_user[0].save();
                            },
                            function (err) {
                                res.sendStatus(400).send(err);
                            });
                        deffered.resolve(succ);
                    })
            }
            else {
                var i = en[0].favorited.indexOf(userId);
                model.UsersModel
                    .findUserById(userId)
                    .then (function (succ) {
                            founduser=succ[0];
                            console.log("found user sec :",founduser);
                            succ[0].favorites.push(en[0]._id);
                            console.log("founduser be4 save :",succ[0]);
                            // succ[0].save()
                        console.log("founduser after save :",founduser);

                        },
                        function (err) {
                            res.sendStatus(400).send(err);
                        });
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

