/**
 * Created by hiresave on 2/14/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.websiteId=$routeParams['wid'];
        // console.log(vm.websiteId);

        vm.userId = $routeParams['uid'];
        vm.deleteSite = deleteSite;
        vm.update = update;

        function init() {

            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website=website
                    console.log(vm.website);
                });
                WebsiteService
                .findAllWebsitesForUser(vm.userId)
                    .success(function (websites) {
                        vm.websites=websites
                    });
        }
        init();

        function update(website) {
            // console.log(website);
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .success(function (website) {
                    if (website != null) {
                        vm.message = "Website Successfully Updated!"
                        $location.url("/user/"+vm.userId+"/website");
                    } else {
                        vm.error = "Unable to update website";
                        $location.url("/user/"+vm.userId+"/website");

                    }
                });
        }

        function deleteSite(website) {
            WebsiteService
                .deleteWebsite(vm.website._id)
                .success(function (user) {
                    if (user != null) {
                        vm.message = "Website Successfully Updated!"
                        $location.url("/user/"+vm.userId+"/website");
                    } else {
                        vm.error = "Unable to update website";
                        $location.url("/user/"+vm.userId+"/website");
                    }
            });
        }
    }
})();
