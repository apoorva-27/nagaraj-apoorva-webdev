/**
 * Created by hiresave on 3/20/2017.
 */

module.exports = function () {

    // console.log('page.model.server.js');

    var q = require('q');
    var mongoose = require('mongoose');
    // mongoose.connect(connectionString);
    // mongoose.Promise=global.Promise;
    var PageSchema = require('./page.schema.server.js')();
    var PageModel = mongoose.model('pages', PageSchema);
    var model = null;

    var api = {
        findAllPagesForWebsite:findAllPagesForWebsite,
        setModel: setModel,
        createPage:createPage,
        findPageById:findPageById,
        updatePage:updatePage,

    };

    return api;

    function setModel(models) {
        model = models;
    }

    function updatePage(pageId,new_page) {
        // console.log("update user  in user model server.js"+new_site);
        var deffered = q.defer();
        PageModel
            .update(
                {_id: pageId},{$set : new_page},function(err,page) {
                    if(err){
                        // console.log("hello   "+err);
                        deffered.reject(err);
                    }
                    else{
                        // console.log("user :" + web);
                        deffered.resolve(page);
                    }
                });
        return deffered.promise;
    }

    function findPageById(pageId) {

        var deffered = q.defer();
        PageModel.findById(pageId ,function (err,page) {
            if(err){
                // console.log("hello   "+err);
                deffered.reject(err);
            }
            else{
                // console.log("user : " + usr);
                // console.log("printing err also :" + err);
                deffered.resolve(page);
            }
        });
        return deffered.promise;

    }

    // function createPage(page) {
    //     var deffered = q.defer();
    //     // console.log("Inserting Page :"+page)
    //     PageModel.create(page,function (err,page) {
    //         if(err){
    //             // console.log("hello   "+err);
    //             deffered.reject(err);
    //         }
    //         else{
    //             // console.log("user " + page);
    //             deffered.resolve(page);
    //         }
    //     });
    //     return deffered.promise;
    // }

    function createPage(websiteId, newPage){
        return PageModel
            .create(newPage)
            .then(function (page) {
                return model
                    .WebsiteModel
                    .findWebsiteById(websiteId)
                    .then(function (website) {
                        website.pages.push(page._id);
                        page._website = website._id;
                        website.save();
                        page.save();
                        return page;
                    }, function (err) {
                        return err;
                    });
            }, function (err) {
                return err;
            });
    }

    function findAllPagesForWebsite(websiteId) {
        // console.log("find websites by user model.server " + typeof (websiteId));
        var deffered = q.defer();
        PageModel.find( {_website:websiteId},function (err, pages) {
            if (err) {
                // console.log("hello   " + err);
                deffered.reject(err);
            }
            else {
                // console.log("web " + pages);
                deffered.resolve(pages);
            }
        });
        return deffered.promise;
    }
}