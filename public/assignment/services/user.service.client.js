/**
 * Created by hiresave on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , email: "alice@alice.com" },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley" ,email:"bob@bob.com" },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia" ,email:"charly@charly.com" },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" ,email:"jannnuzi@jannuzi.com"}
        ];
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
                users.push(newUser);
                return newUser;
        }

        function updateUser(userId, newUser) {
            for(var u in users) {
                if( users[u]._id === userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return users[u];
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for(var u in users) {
                if (users[u]._id === userID) {
                    users.splice(u,1)
                }
            }
        }

        function findUserById(userId) {
            for(var u in users) {
                if( users[u]._id === userId ) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                if( users[u].username === username &&
                    users[u].password === password ) {
                    return users[u];
                }
            }
            return null;
        }
        function findUserByUsername(username) {
            for (var u in users) {
                if (users[u].username === username) {
                    return users[u];
                }
            }
            return null;
        }
    }
})();