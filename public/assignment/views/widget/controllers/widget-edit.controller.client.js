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
                    console.log("success:"+widget.width)
                    vm.widgets=widget;
                    vm.widget.type=widget.type;
                    vm.widgets.type=widget.type;
                });
            // WidgetService
            //     .findAllWidgetsForPage(vm.pageId)
            //     .success(function (widgets) {
            //         vm.widgets=widgets;
            //     });
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function updateWidget(){

            console.log("vm widget text"+vm.widgets.text)
            console.log("vm widget size"+vm.widgets.size)

            var newW = {

                text:vm.widgets.text,
                url:vm.widgets.url,
                size:vm.widgets.size,
                name:vm.widgets.name,
                width:vm.widgets.width,
            }

            WidgetService.updateWidget(vm.widgetId,newW)
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