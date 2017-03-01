/**
 * Created by hiresave on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, PageService,$location) {
        var vm = this;
        vm.update = update;
        vm.deletePage = deletePage;
        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId=$routeParams.wid;
            vm.pageId=$routeParams.pid;

            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page=page
                    console.log(vm.page);
                });
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(function (pages) {
                    vm.pages=pages
                });
        }
        init();

        function update(page) {
            console.log(page);
            console.log("updTE at pageedit controller");
            PageService
                .updatePage(vm.pageId,page)
                .success(function (page) {
                    if (page != null) {
                        vm.message = "page Successfully Updated!"
                        $location.url("/user/" + vm.userId + "/website/"+ vm.websiteId+"/page");
                    } else {
                        vm.error = "Unable to update page";
                        $location.url("/user/" + vm.userId + "/website/"+ vm.websiteId+"/page");
                    }
                });
        }

        // function update(page) {
        //     PageService.updatePage(ID, page);
        //     $location.url("/user/" + vm.userId + "/website/"+ vm.websiteId+"/page");
        // }
        function deletePage(page) {
            PageService
                .deletePage(vm.pageId)
                .success(function (page) {
                    if (page != null) {
                        vm.message = "page Successfully deleted!"
                        $location.url("/user/" + vm.userId + "/website/"+ vm.websiteId+"/page");
                    } else {
                        vm.error = "Unable to delete page";
                        $location.url("/user/" + vm.userId + "/website/"+ vm.websiteId+"/page");
                    }
                });
        }
    //     function deletePage(page) {
    //         PageService.deletePage(vm.pageId);
    //         console.log(vm.websiteId)
    //         $location.url("/user/" + vm.userId + "/website/"+ vm.websiteId+"/page");
    //     }
    // }
}})();