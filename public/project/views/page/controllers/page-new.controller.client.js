/**
 * Created by hiresave on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, PageService,$location) {

        var vm = this;
        vm.userId=$routeParams.uid;
        vm.websiteId=$routeParams.wid;
        vm.createPage=createPage;

        function  init() {
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(function (page) {
                    vm.pages=page
                    console.log(vm.pages);
                })
        }
        init();

        function createPage(page) {
            PageService
                .createPage(vm.websiteId,page)
                .success(function (page) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");

                })
                .error(function (err) {
                    vm.error = 'Unable to create website';
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");

                })
    }
}})();