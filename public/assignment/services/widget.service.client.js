/**
 * Created by hiresave on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO", "name":"Lorem"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum","name":"Lorem"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/","name":"Lorem"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321","name":"Lorem", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321","name":"Lorem", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE","name":"Lorem", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "name":"Lorem","pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
        var api = {
            "findWidgetById": findWidgetById,
            "createWidget":createWidget,
            "findWidgetsByPageId":findWidgetsByPageId,
            "updateWidget":updateWidget,
            "deleteWidget":deleteWidget,
        };
        return api;

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return widgets[w];
                }
            }
            return null;
        }

        function createWidget(pageId, widget) {
            var newwidget = {
                _id:(new Date()).getTime().toString(),

            pageId:pageId,
                widgetType:widget.widgetType
            }
            widgets.push(newwidget)
            return newwidget
        }

        function findWidgetsByPageId(pageId) {
            var wigen=[]
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    wigen.push(widgets[w]);
                }
            }
            return wigen;
        }
        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets[w].text=widget.text;
                    widgets[w].url=widget.url;
                    widgets[w].name=widget.name;
                    widgets[w].size=widget.size;
                    widgets[w].width=widget.width;
                }
            }
        }
        function deleteWidget(widgetID) {
            var wigen=[]
            for(var w in widgets) {
                if(widgets[w]._id === widgetID) {
                    widgets.splice(w,1);
                }
            }
            // return wigen;
        }

    }
})();