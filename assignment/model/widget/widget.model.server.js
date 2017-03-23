/**
 * Created by hiresave on 3/20/2017.
 */

module.exports = function () {

    // console.log('page.model.server.js');

    var q = require('q');
    var mongoose = require('mongoose');
    // mongoose.connect(connectionString);
    // mongoose.Promise=global.Promise;
    var WidgetSchema = require('./widget.schema.server.js')();
    var WidgetModel = mongoose.model('widgets', WidgetSchema);
    var model = null;

    var api = {
        findAllWidgetsForPage: findAllWidgetsForPage,
        setModel: setModel,
        createWidget: createWidget,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        getModel: getModel,
        deleteWidget: deleteWidget,
        reOrderWidget: reOrderWidget

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

    // function deleteWidget(widgetId) {
    //     console.log("deletewidget called");
    //     return WidgetModel.findByIdAndRemove(widgetId, function (err,widget) {
    //         if (widget!=null) {
    //             widget.remove();
    //         }
    //     });
    // }


    function reOrderWidget(pageId, start, end) {
        // console.log(start);
        // console.log(end);
        return WidgetModel
            .find({_page: pageId}, function (err, widgets) {
                widgets.forEach(function (widget) {
                    if (start < end) {
                        if (widget.pos == start) {
                            widget.pos = end;
                            widget.save();
                        }
                        else if (widget.pos > start && widget.pos <= end) {
                            widget.pos = widget.pos - 1;
                            widget.save();
                        }
                    } else {
                        if (widget.pos == start) {
                            widget.pos = end;
                            widget.save();
                        }

                        else if (widget.pos < start && widget.pos >= end) {
                            widget.pos = widget.pos + 1;
                            widget.save();
                        }
                    }
                });
            });
    }

    function deleteWidget(widgetId) {
        return WidgetModel.findByIdAndRemove(widgetId, function (err, widget) {
            if (widget != null) {
                var pageId = widget._page;
                var pos = widget.pos;
                WidgetModel.find({_page: pageId}, function (err, widgets) {
                    widgets.forEach(function (widget) {
                        if (widget.pos > pos) {
                            widget.pos = widget.pos - 1;
                            widget.save();
                        }
                    });
                });
                widget.remove();
            }
        });

        /* if(widget!=null){
         widget.remove();
         }
         });*/
    }

    function updateWidget(widgetId, new_widget) {
        // console.log("update widget  in user model server.js" + widgetId);
        var deffered = q.defer();
        WidgetModel
            .update(
                {_id: widgetId}, {$set: new_widget}, function (err, widget) {
                    if (err) {
                        // console.log("hello   "+err);
                        deffered.reject(err);
                    }
                    else {
                        // console.log("user :" + web);
                        deffered.resolve(widget);
                    }
                });
        return deffered.promise;
    }

    function findWidgetById(widgetId) {
        var deffered = q.defer();
        WidgetModel.findById(widgetId, function (err, widget) {
            if (err) {
                // console.log("hello   "+err);
                deffered.reject(err);
            }
            else {
                // console.log("widget : " + widget);
                // console.log("printing err also :" + err);
                deffered.resolve(widget);
            }
        });
        return deffered.promise;
    }

    // function createWidget(pageId, newWidget){
    //     return WidgetModel
    //         .create(newWidget)
    //         .then(function (widget) {
    //             return model
    //                 .PageModel
    //                 .findPageById(pageId)
    //                 .then(function (page) {
    //                     widget._page = page._id;
    //                     page.widgets.push(widget._id);
    //                     widget.save();
    //                     page.save();
    //                     return widget;
    //                 }, function (err) {
    //                     return err;
    //                 });
    //         }, function (err) {
    //             return err;
    //         });
    // }

    function createWidget(pageId, widget) {
        // console.log(widget);
        widget._page = pageId;
        return WidgetModel
            .find({"_page": pageId})
            .then(function (widgets) {
                    widget.pos = widgets.length;
                    return WidgetModel
                        .create(widget)
                        .then(function (newWidget) {
                            return model
                                .PageModel
                                .findPageById(pageId)
                                .then(function (page) {
                                    newWidget._page = page._id;
                                    page.widgets.push(newWidget._id);
                                    page.save();
                                    newWidget.save();
                                    // console.log(newWidget._id);
                                    // console.log(newWidget);
                                    return newWidget;
                                }, function (err) {
                                    res.sendStatus(404);
                                });
                        }, function (err) {
                            res.sendStatus(404);
                        });
                },
                function (err) {
                    res.sendStatus(404).send(err);
                });
    }

    // function findAllWidgetsForPage(pageId) {
    //     // console.log("find wid by user model.server " + pageId);
    //     var deffered = q.defer();
    //     WidgetModel.find( {_page:pageId},function (err, widgets) {
    //         if (err) {
    //             console.log("err " + err);
    //             deffered.reject(err);
    //         }
    //         else {
    //             // console.log("web : " + widgets);
    //             deffered.resolve(widgets);
    //         }
    //     });
    //     return deffered.promise;
    // }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({"_page": pageId})
            .sort('position')
            .exec(function (err, widgets) {
                if (err) {
                    return err;
                } else {
                    return widgets;
                }
            });

    }
}
