/**
 * Created by hiresave on 3/19/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {

        var api = {
            "searchPhotos": searchPhotos
        };
        return api;



        function searchPhotos(searchTerm) {
            var key = "51714d3163455f9cba4618c1fccdd838";
            var secret = "3eca73b6a81cd0a5";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

            console.log("serach term in service",searchTerm)
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
    }
}})();