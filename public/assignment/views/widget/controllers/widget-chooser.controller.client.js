/**
 * Created by hiresave on 2/15/2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, WidgetService,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.createWidget=createWidget;
        function init() {
            var promise= WidgetService.findAllWidgetsForPage(vm.pageId)
                .success(function (widget) {
                    vm.widgets=widget;
                });
        }
        init();

            function createWidget(widgetType) {

                newWidget = {};
                // newWidget._id = (new Date()).getTime().toString();
                newWidget.type = widgetType;
                // newWidget.pageId = vm.pageId;
                newWidget._page=vm.pageId
                switch (widgetType) {
                    case "HEADER":
                        newWidget.text = "test";
                        newWidget.size = "3";
                        break;
                    case "IMAGE":
                        newWidget.url = "https://i.ytimg.com/vi/fFi4BhD_DUw/maxresdefault.jpg";
                        // newWidget.width = "100%";
                        break;
                    case "YOUTUBE":
                        newWidget.url = "https://youtu.be/AM2Ivdi9c4E";
                        newWidget.width = "100";
                        break;
                    case "HTML":
                        newWidget.text = "Default Text";
                        break;
                    case "TEXT":
                        newWidget.text="Default Text";
                        newWidget.formatted="True";
                        newWidget.placeholder="placeholder";
                        newWidget.rows=3
                        break;
                }

                WidgetService.createWidget(vm.pageId, newWidget)

                    .success(function (widget) {
                        console.log("widget :"+widget)
                        console.log("widget Id:"+widget._id)
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
                    });
    }
    }
})();