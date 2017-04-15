/**
 * Created by hiresave on 3/1/2017.
 */


module.exports = function (app,UsersModel) {
    var passport = require('passport');

    app.get("/api/user", findUser);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.post("/api/user",createUser);
    app.delete("/api/user/:userId",deleteUser);
    app.put("/api/user/follow/:userId",changeFollow)
    app.get("/api/user/follow/:userId",findFollowing)
    app.get("/api/admin/users",getAllUsers)
    app.post("/api/user/login", passport.authenticate('local'), login);
    app.get("/api/username/taken/:un",isUserNameTaken);
    app.get ('/api/loggedin', loggedin);
    app.post('/api/logout', logout);

    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    passport.use(new LocalStrategy(localStrategy));
    var auth = authorized;
    app.get('/auth/google/', passport.authenticate('google', { scope : ['profile','email'] } ) );

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/project/index.html#'

        }), function(req, res){
            var t  = req.user;
            console.log(t._id, typeof  t,"Coming here redirection");
            console.log(t.google,"Coming here redirection");
            var url = '/project/index.html#/user/';

            res.redirect(url);
        });

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function loggedin(req, res) {
        console.log(req.body);
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function isUserNameTaken(req,res) {
        var uname=req.params.un;
        console.log("uname",uname) ;
        UsersModel
            .findUserByUsername(uname)
            .then(function (usr){
                    if (usr[0]){
                        // console.log(usr,"FoundUser");
                        // console.log(false);
                        res.json(false)
                    }
                    else {
                        // console.log(true)
                        res.json(true)
                    }
                },
                function(err){
                    // console.log(true)
                    res.json(true)
                })
    }

    function localStrategy(username, password, done) {
        console.log("Function Being called",username,password);
        UsersModel.findUserByCredentials(username,password)
            .then(
                function(user) {
                    // console.log("Finding the particular User",password,username,user[0]);
                    if(user) {
                        // console.log("================== user",user[0]);
                        return done(null, user[0]);
                    } else {
                        // console.log("ERR user");
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }
    function login(req, res) {
        var user = req.user;
        console.log("User FOund", user)
        res.json(user);
    }
    function getAllUsers(req,res) {
        UsersModel
            .getAllUsers()
            .then (function (array){
                    // console.log(array)
                    res.json(array)
                },
                function(err){
                    res.send(null)
                })
    }


    function findFollowing(req,res) {
        userId=req.params.userId
        UsersModel
            .findFollowing(userId)
            .then (function (array){
                console.log(array)
                res.json(array)
                },
            function(err){
                res.sendStatus(400).send(err)
            })
    }

    function changeFollow(req,res) {
        // console.log("change follow in service server")
        var userFollowing=req.params.userId;
        var userToFollow=req.body.usertofollow;
        UsersModel
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
        UsersModel
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

        UsersModel
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

        UsersModel
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
        UsersModel
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
        UsersModel
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
        UsersModel
            .deleteUser(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.send(null);
            });
    }

    // var GoogleStrategy = require('passport-google-oauth20').Strategy;

    console.log(process.env.GOOGLE_CLIENT_ID,process.env.GCS)
    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GCS,
        callbackURL  : 'http://localhost:3000/auth/google/callback'
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {

        console.log("NEW PROFILE", profile,token,refreshToken);
        UsersModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        console.log("User ALREADY FOUND",user);
                        return done(null, user);
                    } else {

                        console.log("NEW PROFILE", profile)
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstname: profile.displayName,
                            lastname:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id
                            }
                        };
                        console.log(newGoogleUser,"NEW GOOGLE USER");
                        return UsersModel
                            .createUser(newGoogleUser)
                            .then(function(user){
                                return done(null, user);
                            });

                    }
                },
                function(err) {
                    console.log(err,"Not Calling")
                    if (err) { return done(err); }
                })
    }

    function serializeUser(user, done) {
        done(null, user);
    };

    function deserializeUser(user, done) {
        UsersModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }



};