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
            "sortWidgets":sortWidgets
        };
        return api;

        function findWidgetById(widgetId) {

            return $http.get("/api/widget/"+widgetId);

        }

        function createWidget(pageId, widget) {
            console.log("widget"+widget)
            return $http.post("/api/page/"+pageId+"/widget",widget);

        }

        function findAllWidgetsForPage(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
        }
        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/"+widgetId,widget);

        }
        function deleteWidget(widgetID) {
            return $http.delete("/api/widget/"+widgetID);

        }
        function sortWidgets(pageId, index1, index2) {
            return $http.put("/page/" + pageId + "/widget?initial=" + index1 + "&final=" + index2);
        }
    }
})();