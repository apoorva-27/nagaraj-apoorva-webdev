/**
 * Created by hiresave on 3/18/2017.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, FlickrService, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        userId=vm.userId;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        console.log("flickr service not in function")
        vm.searchPhotos=searchPhotos;
        vm.selectPhoto=selectPhoto;

         function searchPhotos(searchTerm) {
            console.log("flickr service")
             // console.log("search term",searchTerm)
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    console.log(data)
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
            console.log("flickr service  on client")
        }


        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var new_image = {
                websiteId:vm.websiteId,
                pageId:vm.pageId,
                // widgetId:vm.widgetId,
                url:url,
                widgetType:'IMAGE'
            }

            WidgetService
                .updateWidget(vm.widgetId,new_image)
                .success(function (image) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }
    }
})();