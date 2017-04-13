/**
 * Created by hiresave on 3/1/2017.
 */

// console.log("user.service.server.js")

module.exports = function (app,UsersModel) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.post("/api/user",createUser);
    app.delete("/api/user/:userId",deleteUser);
    app.put("/api/user/follow/:userId",changeFollow)
    app.get("/api/user/follow/:userId",findFollowing)
    app.get("/api/admin/users",getAllUsers)

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

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

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
        // console.log("userToFollow :",userToFollow)
        // console.log("usuerfollowing :",userFollowing)
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
        console.log("init server service findUserById");
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

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // var GoogleStrategy = require('passport-google-oauth20').Strategy;

    var googleConfig = {
        clientID     : process.env.GCI,
        clientSecret : process.env.GCS,
        callbackURL  : 'http://localhost:3000/auth/google/callback'
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
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
    app.get('/auth/google', passport.authenticate('google',
        { scope : ['profile','email'] })
    );
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/project/index.html#'
            // successRedirect:'/project/index.html#/user'
        }), function(req, res){
            var t  = req.user;
            console.log(t._id, typeof  t);
            console.log(t.google,"Coming here redirection");

            var url = '/project/index.html#/user/' + t._id;
            res.redirect(url);
        });

};