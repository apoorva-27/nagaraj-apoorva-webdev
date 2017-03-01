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

            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function (website) {
                    vm.websites=website
                    console.log(vm.websites);
                })
        }
        init();

        function createWebsite(website) {
            WebsiteService
                .createWebsite(vm.userId,website)
                .success(function (website) {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function (err) {
                    vm.error = 'Unable to create website';

                })

        }

    }
})();