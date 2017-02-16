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
            vm.widget = WidgetService.findWidgetById(vm.widgetId);

        }
        init();

        function getEditorTemplateUrl(type) {
            console.log(type);
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function updateWidget(widget) {
            WidgetService.updateWidget(vm.widgetId,widget)
            $location.url("/user/" + vm.userId + "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function deleteW(widget) {
            WidgetService.deleteWidget(vm.widget._id);

            $location.url("/user/" + vm.userId + "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

    }
})();