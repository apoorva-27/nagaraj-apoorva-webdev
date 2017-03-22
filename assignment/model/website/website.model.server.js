/**
 * Created by hiresave on 3/20/2017.
 */


module.exports = function () {

    console.log('website.model.server.js');

    var q = require('q');
    var mongoose = require('mongoose');
    // mongoose.connect(connectionString);
    // mongoose.Promise=global.Promise;
    var WebsiteSchema = require('./website.schema.server.js')();
    var WebsiteModel = mongoose.model('websites', WebsiteSchema);

    var api = {
        findAllWebsitesForUser:findAllWebsitesForUser,
        setModel:setModel,
        findWebsiteById:findWebsiteById,
        updateWebsite:updateWebsite,
        createWebsite:createWebsite
    };

    return api;

    function setModel(models) {
        model=models;
    }

    function createWebsite(site) {
        var deffered = q.defer();
        WebsiteModel.create(site,function (err,usr) {
            if(err){
                console.log("hello   "+err);
                deffered.reject(err);
            }
            else{
                console.log("user " + site);
                deffered.resolve(site);
            }
        });
        return deffered.promise;
    }


    function updateWebsite(websiteId,new_site) {
        console.log("update user  in user model server.js"+new_site);
        var deffered = q.defer();
        WebsiteModel
            .update(
                {_id: websiteId},{$set : new_site},function(err,web) {
                    if(err){
                        console.log("hello   "+err);
                        deffered.reject(err);
                    }
                    else{
                        console.log("user :" + web);
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
        console.log("find websites by user model.server "+typeof (userId));
        var deffered = q.defer();
        WebsiteModel.find({_user:userId}, function (err,web) {
            if(err){
                console.log("hello   "+err);
                deffered.reject(err);
            }
            else{
                console.log("web " + web.length);
                deffered.resolve(web);
            }
        });
        return deffered.promise;
    }
}