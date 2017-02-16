/**
 * Created by hiresave on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, PageService,$location) {

        var vm = this;

        function init() {

            vm.userId = $routeParams.uid;
            vm.websiteId=$routeParams.wid;
            vm.pageId=$routeParams.pid;
            vm.page =PageService.findPageById(vm.pageId);

            // console.log(vm.pages)
        }
        init();

        vm.update = update;
        function update(page) {
            PageService.updatePage(ID, page);
            $location.url("/user/" + vm.userId + "/website/"+ vm.websiteId+"/page");
        }
        vm.deletePage = deletePage;
        function deletePage(page) {
            PageService.deletePage(vm.pageId);
            console.log(vm.websiteId)
            $location.url("/user/" + vm.userId + "/website/"+ vm.websiteId+"/page");
        }
    }
})();