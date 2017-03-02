/**
 * Created by hiresave on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "findWidgetById": findWidgetById,
            "createWidget":createWidget,
            "findAllWidgetsForPage":findAllWidgetsForPage,
            "updateWidget":updateWidget,
            "deleteWidget":deleteWidget,
        };
        return api;

        function findWidgetById(widgetId) {

            return $http.get("/api/widget/"+widgetId);
            // for(var w in widgets) {
            //     if(widgets[w]._id === widgetId) {
            //         return widgets[w];
            //     }
            // }
            // return null;
        }

        function createWidget(pageId, widget) {
            return $http.post("/api/page/"+pageId+"/widget",widget);

            // var newwidget = {
            //     _id:(new Date()).getTime().toString(),
            //
            // pageId:pageId,
            //     widgetType:widget.widgetType
            // }
            // widgets.push(newwidget)
            // return newwidget
        }

        function findAllWidgetsForPage(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
        }
        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/"+widgetId,widget);
            // for(var w in widgets) {
            //     if(widgets[w]._id === widgetId) {
            //         widgets[w].text=widget.text;
            //         widgets[w].url=widget.url;
            //         widgets[w].name=widget.name;
            //         widgets[w].size=widget.size;
            //         widgets[w].width=widget.width;
            //     }
            // }
        }
        function deleteWidget(widgetID) {
            return $http.delete("/api/widget/"+widgetID);
            // return wigen;
        }

    }
})();