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
                    //_id: (new Date()).getTime().toString(),
                    firstname: user.lastname ,
                    lastname: user.firstname ,
                    email: user.email
                }
           return $http.post("/api/user",newUser)
        }

        function updateUser(userId, user) {

            var newUser=
                {
                    // username: user.username,
                    // password: user.password,
                    //_id: (new Date()).getTime().toString(),
                    firstname: user.firstname ,
                    lastname: user.lastname ,
                    email: user.email
                }

            console.log("in update user client"+newUser);
            return $http.put("/api/user/"+userId,newUser);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);

        }

        function findUserByCredentials(username, password) {
            // console.log("trying something here",$http.get("/api/user?username="+username+"&password="+password))
            return $http.get("/api/user?username="+username+"&password="+password);

        }
        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }
    }
})();