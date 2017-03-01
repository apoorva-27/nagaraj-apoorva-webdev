/**
 * Created by hiresave on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "findUserByUsername": findUserByUsername,
             "createUser": createUser,
             "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            var newUser=
                {
                    username: user.username,
                    password: user.password,
                    _id: (new Date()).getTime().toString(),
                    firstName: user.lastName ,
                    lastName: user.firstName ,
                    email: user.email
                }
           return $http.post("/api/user",newUser)
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId,newUser);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);

        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);

        }
        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }
    }
})();