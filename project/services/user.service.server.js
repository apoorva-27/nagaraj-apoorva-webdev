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
    app.put("/api/user/follow/:userId",changeFollow)

    function changeFollow(req,res) {
        console.log("change follow in service server")
        var userFollowing=req.params.userId;
        var userToFollow=req.body.usertofollow;
        console.log("userToFollow :",userToFollow)
        console.log("userfollowing :",userFollowing)
        UserModel
            .changeFollow(userFollowing,userToFollow)
            .then(function (user) {
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

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
                res.json(user[0]);
            },
            function (err) {
                res.sendStatus(400).send(err);
            });
    }

    function findUserByUsername(req,res) {
        var username=req.query.username;

        UserModel
            .findUserByUsername(username)
            .then (function (user) {
                    res.json(user[0]);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function findUserById(req,res) {
        var userId=req.params.userId;
        UserModel
            .findUserById(userId)
            .then (function (user) {
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function updateUser(req,res) {
        var userId=req.params.userId;
        var user=req.body;
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