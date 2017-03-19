/**
 * Created by hiresave on 2/15/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, WidgetService,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget=updateWidget;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.deleteW = deleteW;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget=widget;
                    vm.widgetType=widget.widgetType;
                });
            WidgetService
                .findAllWidgetsForPage(vm.pageId)
                .success(function (widgets) {
                    vm.widgets=widgets;
                });
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function updateWidget(){
            WidgetService.updateWidget(vm.widgetId,vm.widget)
                .success(function (widget) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }

        function deleteW(widget) {
            WidgetService
                .deleteWidget(vm.widget._id)
                .success(function (widget) {
                    if (widget != null) {
                        vm.message = "Widget Successfully deleted!"
                        $location.url("/user/" + vm.userId + "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    } else {
                        vm.error = "Unable to delete widget";
                        $location.url("/user/" + vm.userId + "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    }
                });
        }

    }
})();