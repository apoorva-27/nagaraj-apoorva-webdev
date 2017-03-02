/**
 * Created by hiresave on 2/14/2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, WidgetService,$sce,$location) {

        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
            vm.getTrustedHtml = getTrustedHtml;
            vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
            vm.getEditorTemplateUrl = getEditorTemplateUrl;

            WidgetService
                .findAllWidgetsForPage(vm.pageId)
                .success(function(widgets){
                    vm.widgets = widgets
                });
        }
        init();

        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

        function getEditorTemplateUrl(ID) {
            $location.url('/user/'+vm.userID+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ID)
        }
    }
})();
