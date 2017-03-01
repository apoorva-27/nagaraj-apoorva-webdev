/**
 * Created by hiresave on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);


    function pageListController($routeParams, PageService) {

        var vm = this;
        vm.websiteId=$routeParams['wid'];
        vm.userId=$routeParams['uid'];

        function init() {

            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(function(pages){
                    vm.pages = pages
                });
        }
        init();
    }
})();