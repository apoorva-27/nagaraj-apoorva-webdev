/**
 * Created by hiresave on 2/14/2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var ID =  $routeParams['wid'];
        // vm.website = WebsiteService.findWebsiteById(ID);
        var vm = this;
        vm.userId = $routeParams['uid'];
        console.log(vm.userId);

        function init() {
                vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
                vm.website = WebsiteService.findWebsiteById(ID);
            }
            init();

        vm.update = update;
        //console.log();

        function update(website) {
            WebsiteService.updateWebsite(ID, website);
            $location.url("/user/" + vm.userId + "/website");

        }
        vm.deleteSite = deleteSite;
        function deleteSite(website) {
            WebsiteService.deleteWebsite(vm.website._id);
            console.log(vm.website._id)
            $location.url("/user/" + vm.userId + "/website");


        }


        }
    })();
