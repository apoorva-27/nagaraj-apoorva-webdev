/**
 * Created by hiresave on 2/14/2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebSiteNewController);

    function WebSiteNewController($routeParams, WebsiteService,$location) {

        var vm = this;
        vm.userId=$routeParams.uid;
        vm.createWebsite=createWebsite;

        function  init() {
            vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
        }
        init();

        function createWebsite(website) {
               var newwebsite= WebsiteService.createWebsite(vm.userId,website);

                console.log(newwebsite);

                $location.url("/user/"+vm.userId+"/website");

        }

    }
})();