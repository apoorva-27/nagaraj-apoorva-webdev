/**
 * Created by hiresave on 3/1/2017.
 */

// console.log("user.service.server.js")

module.exports = function (app,UserModel) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.post("/api/user",createUser);
    app.delete("/api/user/:userId",deleteUser);

    var users = [
         {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , email: "alice@alice.com" },
         {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley" ,email:"bob@bob.com" },
         {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia" ,email:"charly@charly.com" },
         {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" ,email:"jannnuzi@jannuzi.com"}
     ];


    function createUser(req,res) {
        var newU=req.body;
        UserModel
            .createUser(newU)
            .then(function (user) {
                res.json(user);

            },
            function (err) {
                res.sendStatus(400).send(err);
            });
        /*
        users.push(newU);
        res.send(newU);*/
    }

    function findUser(req,res) {
        var username=req.query.username;
        var password=req.query.password;

        if(username && password) {
            findUserByCredentials(req,res);
        } else if (username) {
            findUserByUsername(req,res);
        }
    }
    function findUserByCredentials (req,res){
        var username=req.query.username;
        var password=req.query.password;

        UserModel
            .findUserByCredentials(username,password)
            .then (function (user) {
                // console.log("user object at user service"+user)
                res.json(user[0]);
            },
            function (err) {
                res.sendStatus(400).send(err);
            });

        // var user = users.find(function(user){
        //     return user.password == password && user.username == username;
        // });
        // res.json(user);
    }

    function findUserByUsername(req,res) {
        var username=req.query.username;

        UserModel
            .findUserByUsername(username)
            .then (function (user) {
                    // console.log("user object at user service 2"+user)
                    res.json(user[0]);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function findUserById(req,res) {
        var userId=req.params.userId;
        // console.log("userid find by id"+userId);
        // console.log("req.params"+req.body)
        UserModel
            .findUserById(userId)
            .then (function (user) {
                    // console.log("user object at user service 3"+user)
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function updateUser(req,res) {
        var userId=req.params.userId;
        var user=req.body;
        // console.log("user  in request  body"+user);

        UserModel
            .updateUser(userId,user)
            .then (function (user) {
                    console.log("user object at user service 4"+user)
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }
    function deleteUser(req, res) {
        var userId = req.params.userId;
        UserModel
            .deleteUser(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }
};