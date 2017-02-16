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
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();
        // console.log(vm.widget)

        function createWidget(widgetType) {
            newWidget = {};
            newWidget._id = (new Date()).getTime();
            newWidget.widgetType = widgetType;
            newWidget.pageId = vm.pageId;

            WidgetService.createWidget(vm.pageId, newWidget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }

    }
})();