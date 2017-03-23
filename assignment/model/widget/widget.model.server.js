/**
 * Created by hiresave on 3/20/2017.
 */

module.exports = function () {

    // console.log('page.model.server.js');

    var q = require('q');
    var mongoose = require('mongoose');
    // mongoose.connect(connectionString);
    // mongoose.Promise=global.Promise;
    // var WidgetSchema = require('./widget.schema.server.js')();
    // var WidgetModel = mongoose.model('widgets', WidgetSchema);
    var model = null;
    var WidgetSchema;
    var WidgetModel ;

    var api = {
        findAllWidgetsForPage:findAllWidgetsForPage,
        setModel: setModel,
        createWidget:createWidget,
        findWidgetById:findWidgetById,
        updateWidget:updateWidget,
        getModel:getModel,
        deleteWidget:deleteWidget

    };

    return api;

    function setModel(models) {
        model = models;
        WidgetSchema = require('./widget.schema.server')(models);
        WidgetModel = mongoose.model("WidgetModel", WidgetSchema)
    }

    function getModel() {
        return WidgetModel;
    }

    function deleteWidget(widgetId) {
        console.log("deletewidget called");
        return WidgetModel.findByIdAndRemove(widgetId, function (err,widget) {
            if (widget!=null) {
                widget.remove();
            }
        });
    }

    function updateWidget(widgetId,new_widget) {
        console.log("update widget  in user model server.js"+widgetId);
        var deffered = q.defer();
        WidgetModel
            .update(
                {_id: widgetId},{$set : new_widget},function(err,widget) {
                    if(err){
                        // console.log("hello   "+err);
                        deffered.reject(err);
                    }
                    else{
                        // console.log("user :" + web);
                        deffered.resolve(widget);
                    }
                });
        return deffered.promise;
    }

    function findWidgetById(widgetId) {
        var deffered = q.defer();
        WidgetModel.findById(widgetId ,function (err,widget) {
            if(err){
                // console.log("hello   "+err);
                deffered.reject(err);
            }
            else{
                console.log("widget : " + widget);
                // console.log("printing err also :" + err);
                deffered.resolve(widget);
            }
        });
        return deffered.promise;
    }

    function createWidget(pageId, newWidget){
        return WidgetModel
            .create(newWidget)
            .then(function (widget) {
                return model
                    .PageModel
                    .findPageById(pageId)
                    .then(function (page) {
                        widget._page = page._id;
                        page.widgets.push(widget._id);
                        widget.save();
                        page.save();
                        return widget;
                    }, function (err) {
                        return err;
                    });
            }, function (err) {
                return err;
            });
    }

    function findAllWidgetsForPage(pageId) {
        // console.log("find wid by user model.server " + pageId);
        var deffered = q.defer();
        WidgetModel.find( {_page:pageId},function (err, widgets) {
            if (err) {
                console.log("err " + err);
                deffered.reject(err);
            }
            else {
                // console.log("web : " + widgets);
                deffered.resolve(widgets);
            }
        });
        return deffered.promise;
    }
}
