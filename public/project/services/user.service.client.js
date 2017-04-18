/**
 * Created by hiresave on 2/14/2017.
 */
(function () {
    angular
        .module("Travelogue")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "findUserByUsername": findUserByUsername,
             "createUser": createUser,
             "deleteUser": deleteUser,
            "changeFollow":changeFollow,
            "findFollowing":findFollowing,
            "getAllUsers":getAllUsers,
            "isUserNameTaken":isUserNameTaken,
            "logout":logout
        };
        return api;

        function logout() {
            return $http.post("/api/logout");
        }

        function isUserNameTaken(username) {
            return $http.get("/api/username/taken/"+username)
        }

        function getAllUsers(){
            var response= $http.get("/api/admin/users")
            return response
        }

        function changeFollow(userFollowingOther,UserToFollow) {
            var userToFollow={
                usertofollow:UserToFollow
            };
            return $http.put("/api/user/follow/"+userFollowingOther,userToFollow);
        }

        function findFollowing(userId) {
           return $http.get("/api/user/follow/"+userId);
        }

        function createUser(user) {
            var newUser=
                {
                    username: user.username,
                    password: user.password,
                    firstname: user.lastname ,
                    lastname: user.firstname ,
                    email: user.email,
                    role:'USER'
                };
           return $http.post("/api/user",newUser)
        }

        function updateUser(userId, user) {
            return $http.put("/api/user/"+userId,user);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByCredentials(user) {
            return $http.post("/api/user/login",user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }
    }
})();