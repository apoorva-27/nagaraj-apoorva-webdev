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


        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);

            function getEditorTemplate(type) {
                console.log(vm.widgetId);
                $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget/' + vm.widgetId);
            }

            if ((vm.widgetID) == "HEADER" ) {
                var neww = {

                    widgetType: vm.widgetId
                }
                var typevariable = vm.widgetId
                vm.widget=WidgetService.createWidget(vm.pageId, neww)

                //console.log(vm.widget.widgetType)
                getEditorTemplate(typevariable)
            }
        }
        init();
        console.log(vm.widget)
        vm.getEditorTemplateUrl = getEditorTemplateUrl;

        function getEditorTemplateUrl(type) {
            console.log(type);
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }
        vm.updateWidget=updateWidget;
        function updateWidget(widget) {
            WidgetService.updateWidget(vm.widgetId,widget)
            $location.url("/user/" + vm.userId + "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }
        vm.deleteW = deleteW;
        function deleteW(widget) {
            WidgetService.deleteWidget(vm.widget._id);
            // console.log(vm.website._id)
            $location.url("/user/" + vm.userId + "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

    }
})();