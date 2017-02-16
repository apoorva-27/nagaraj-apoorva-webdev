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
            vm.pages=PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function createPage(page) {
            console.log(page)
            var newpage= PageService.createPage(vm.websiteId,page);

            //if(newwebsite) {
            $location.url("/user/" + vm.userId + "/website/"+ vm.websiteId+"/page");
            //} else {
            // vm.error = 'User not found';
            // }
        }
        // vm.websites = websites;
        // vm.userId = userId;

    }
})();