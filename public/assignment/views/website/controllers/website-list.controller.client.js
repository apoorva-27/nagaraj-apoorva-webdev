/**
 * Created by hiresave on 2/14/2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebSiteListController);


    function WebSiteListController($routeParams, WebsiteService) {
        // var userId =
        // var websites =
        var vm = this;

        function init() {


            vm.userId = $routeParams.uid;
            vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
        }
        init();

    }
})();
