/**
 * Created by hiresave on 3/20/2017.
 */


module.exports = function () {

    // console.log('website.model.server.js');

    var q = require('q');
    var model = null;
    var mongoose = require("mongoose");
    var WebsiteSchema;
    var WebsiteModel;

    var api = {
        findAllWebsitesForUser:findAllWebsitesForUser,
        setModel:setModel,
        findWebsiteById:findWebsiteById,
        updateWebsite:updateWebsite,
        createWebsite:createWebsite,
        getModel:getModel,
        deleteWebsite:deleteWebsite
    };

    return api;

    function setModel(models) {
        model=models;
        WebsiteSchema = require('./website.schema.server')(models);
        WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
    }

    function getModel() {
        return WebsiteModel;
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel.findByIdAndRemove(websiteId, function (err, website) {
            if(website != null) {
                website.remove();
            }
        });
    }

    function createWebsite(userId, website) {
        return WebsiteModel
            .create(website)
            .then(

                function(website){
                    // console.log("Created Webssite:"+website+" user : "+userId)
                    return model.UserModel
                        .findUserById(userId)
                        .then(function (user) {
                            // console.log("Found user : "+user)
                            website._user = user._id;
                            user.websites.push(website._id);
                            website.save();
                            user.save();
                            return website;
                        },function (err) {
                            return err;
                        })
                },
                function(err){
                    return err;
                });
    }


    // function createWebsite(site) {
    //     // console.log("site")
    //     // console.log(site._user)
    //     var deffered = q.defer();
    //     WebsiteModel
    //         .create(site,function (err,site) {
    //         if (site) {
    //             // console.log("entering create"+site._user)
    //             model.UserModel
    //                 .findUserById(site._user)
    //                 .then( function (err,usr) {
    //                     if (usr._id.length>0) {
    //                         // console.log("create website user push"+usr._id)
    //                         site._user=usr._id;
    //                         usr.websites.push(site._id)
    //                         usr.save()
    //                         site.save()
    //                     }
    //                     else {
    //                         console.log("error"+usr);
    //                     }
    //                 });
    //             // console.log("user " + site);
    //             deffered.resolve(site);
    //         }
    //     });
    //     return deffered.promise;
    // }


    function updateWebsite(websiteId,new_site) {
        // console.log("update user  in user model server.js"+new_site);
        var deffered = q.defer();
        WebsiteModel
            .update(
                {_id: websiteId},{$set : new_site},function(err,web) {
                    if(err){
                        // console.log("hello   "+err);
                        deffered.reject(err);
                    }
                    else{
                        // console.log("user :" + web);
                        deffered.resolve(web);
                    }
                });
        return deffered.promise;
    }

    function findWebsiteById(websiteId) {

        var deffered = q.defer();
        WebsiteModel.findById(websiteId ,function (err,web) {
            if(err){
                // console.log("hello   "+err);
                deffered.reject(err);
            }
            else{
                // console.log("user : " + usr);
                // console.log("printing err also :" + err);
                deffered.resolve(web);
            }
        });
        return deffered.promise;

    }

    function findAllWebsitesForUser(userId) {
        // console.log("find websites by user model.server "+typeof (userId));
        var deffered = q.defer();
        WebsiteModel.find({_user:userId}, function (err,web) {
            if(err){
                // console.log("hello   "+err);
                deffered.reject(err);
            }
            else{
                // console.log("web " + web.length);
                deffered.resolve(web);
            }
        });
        return deffered.promise;
    }
}