/**
 * Created by hiresave on 4/5/2017.
 */

(function () {
    angular
        .module("Travelogue")
        .factory("expertService", expertService);

    function expertService($http) {

        var api = {
            "findExpertByCredentials": findExpertByCredentials,
            "findExpertById": findExpertById,
            "updateExpert": updateExpert,
            "findExpertByUsername": findExpertByUsername,
            "createExpert": createExpert,
            "deleteExpert": deleteExpert,
            "createEntry":createEntry
        };
        return api;

        function createEntry (userId,suggestion){
            return $http.put("/api/expert/"+userId+"/suggestion",suggestion);
        }

        function createExpert(user) {
            var newUser=
                {
                    username: user.username,
                    password: user.password,
                    firstname: user.lastname ,
                    lastname: user.firstname ,
                    email: user.email
                }
            return $http.post("/api/expert",newUser)
        }

        function updateExpert(userId, user) {
            var newUser=
                {
                    firstname: user.firstname ,
                    lastname: user.lastname ,
                    email: user.email
                }
            console.log("in update user client"+newUser);
            return $http.put("/api/expert/"+userId,newUser);
        }

        function deleteExpert(userId) {
            return $http.delete("/api/expert/"+userId);
        }

        function findExpertById(userId) {
            return $http.get("/api/expert/"+userId);
        }

        function findExpertByCredentials(username, password) {
            return $http.get("/api/expert?username="+username+"&password="+password);
        }

        function findExpertByUsername(username) {
            return $http.get("/api/expert?username="+username);
        }
    }
})();
