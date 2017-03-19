/**
 * Created by hiresave on 3/1/2017.
 */

module.exports = function (app) {
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

    function deleteUser(req,res) {
        var userId = req.params.userId;
        for(var u in users) {
            if(users[u]._id === userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                console.log("did it delete?")
                return;
            }
        }
        res.sendStatus(404);
    }

    function createUser(req,res) {
        var newU=req.body;
        users.push(newU);
        res.send(newU);
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

        var user = users.find(function(user){
            return user.password == password && user.username == username;
        });
        res.json(user);
    };

    function findUserByUsername(req,res) {
        var username=req.params.username;
        var user=users.find(function (u) {
            return u.username== req.query.username;
        })
        console.log("in app.js printing user"+user)
        if (user) {
            res.json(user)
        } else {
            res.sendStatus(404).send({message: "user not found"})
        }
    }

    function findUserById(req,res) {
        var userId=req.params.userId;
        var user=users.find(function (u) {
            return u._id==userId;
        });
        res.json(user);
    }

    function updateUser(req,res) {
        var userId=req.params.userId;
        var newUser=req.body;
        for(var u in users) {
            if( users[u]._id === userId ) {
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                res.json(users[u]);
                return;
            }
        }
        return null;
    }
};