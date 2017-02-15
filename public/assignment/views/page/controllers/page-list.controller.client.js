/**
 * Created by hiresave on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);


    function pageListController($routeParams, PageService) {

        var vm = this;

        function init() {

            vm.userId = $routeParams.uid;
            vm.websiteId=$routeParams.wid;
            vm.pages =PageService.findPageByWebsiteId(vm.websiteId);
            console.log(vm.pages)
        }
        init();

    }
})();