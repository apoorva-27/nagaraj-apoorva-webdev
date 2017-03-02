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

            // WidgetService
            //     .findWidgetById(vm.widgetId)
            //     .success (function (widget) {
            //         vm.widget=widget;
            // })
        }
        init();

            function createWidget(widgetType) {
            newWidget = {};
            console.log("do i come here?")
            // var typeOfWidget=widgetType.toString();
            newWidget._id = (new Date()).getTime();
            console.log("widget type"+widgetType);
            newWidget.widgetType = widgetType;
            newWidget.pageId = vm.pageId;

            WidgetService
                .createWidget(vm.pageId,newWidget)
                .success(function (widget) {
                    console.log(widget)
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widget._id);

                })
                .error(function (err) {
                    vm.error = 'Unable to create website';
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widget._id);

                })

            // WidgetService.createWidget(vm.pageId, newWidget);
            // $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }

    }
})();