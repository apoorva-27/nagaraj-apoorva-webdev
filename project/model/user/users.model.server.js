/**
 * Created by hiresave on 3/20/2017.
 */

// console.log("user model server js");

module.exports = function () {

    var q = require('q');
    var model = null;
    var mongoose = require("mongoose");
    var UsersSchema;
    var UsersModel;

    var api = {
        createUser: createUser,
        findUserByCredentials:findUserByCredentials,
        findUserByUsername:findUserByUsername,
        findUserById:findUserById,
        updateUser:updateUser,
        setModel:setModel,
        getModel:getModel,
        deleteUser:deleteUser,
        changeFollow:changeFollow,
        findFollowing:findFollowing,
        getAllUsers:getAllUsers,
        findUserByGoogleId:findUserByGoogleId
    };

    return api;
    function findUserByGoogleId(id) {
        return UsersModel.findOne({"google.id":id});
    }

    function getAllUsers(){
        var deffered = q.defer();
        UsersModel
            .find({},function(err,user) {
                if(user[0]==undefined) {
                    deffered.reject(err)
                }
                else {
                    deffered.resolve(user)
                }
            })
        return deffered.promise;
    }

    function findFollowing(userId) {
        var deffered = q.defer();
        UsersModel
            .find({_id:userId},function(err,user) {
            if(user==undefined) {
                deffered.reject(err)
            }
            else {
                deffered.resolve(user[0].following)
            }
            })
        return deffered.promise;
    }

    function changeFollow(userFollowing,userToFollow) {
        var deffered = q.defer();

        UsersModel.find({_id:userFollowing},function (err,en) {
            if (en[0]==undefined) {
                deffered.reject(err);
            }
            else {
                var i = en[0].following.indexOf(userToFollow.toString());
                if (i<0)
                {
                    UsersModel.find({_id:userToFollow.toString()},function (err,person) {
                        if (person[0]==undefined) {
                            deffered.reject(err);
                        }
                        else {
                            var j = person[0].followers.indexOf(userFollowing);
                            if (j < 0) {
                                en[0].following.push(userToFollow);
                                en[0].save();
                                person[0].followers.push(userFollowing)
                                person[0].save();
                                deffered.resolve(en[0]);
                            }
                            else {
                                console.log("User is already a follower");
                                deffered.reject(err);
                            }
                        }
                    })
                }
                else {
                    UsersModel.find({_id:userToFollow},function (err,person) {
                        if (person[0]==undefined) {
                            deffered.reject(err);
                        }
                        else {
                            var j = person[0].followers.indexOf(userFollowing);
                            if (j < 0) {
                                console.log("error")
                            }
                            else {
                                en[0].following.splice(i, 1);
                                en[0].save();
                                person[0].followers.splice(j,1)
                                person[0].save();
                                deffered.resolve(en[0]);
                            }
                        }
                    });
                }
            }
        });
        return deffered.promise;
    }

    function setModel(models) {
        model=models;
        UsersSchema = require('./users.schema.server.js')(models);
        UsersModel = mongoose.model('UsersModel', UsersSchema);
    }

    function getModel() {
        return UsersModel;
    }

    function deleteUser(userId) {
        return UsersModel.findByIdAndRemove(userId, function (err, user) {
            if (user != null)
            {
                user.remove();
            }
        });
    }

    function updateUser(userId,new_user) {
        var deffered = q.defer();
        UsersModel
            .update(
                {_id: userId},{$set : new_user},function(err,usr) {
                if(err){
                    deffered.reject(err);
                }
                else{
                    deffered.resolve(usr);
                }
            });
        return deffered.promise;
    }

    function findUserById(userId) {
        var deffered = q.defer();
        UsersModel.find({"_id":userId} ,function (err,usr) {
            if(err){
                 deffered.reject(err);
            }
            else{
                deffered.resolve(usr);
            }
        });
        return deffered.promise;
    }

    function findUserByUsername(username) {
        var deffered = q.defer();
        UsersModel.find({username:username} ,function (err,usr) {
            if(err){
                deffered.reject(err);
            }
            else{
                deffered.resolve(usr);
            }
        });
        return deffered.promise;
    }

    function findUserByCredentials(username,password) {
        var deffered = q.defer();
        UsersModel.find({username:username,password:password} ,function (err,usr) {
            if(err){
                deffered.reject(err);
            }
            else{
                deffered.resolve(usr);
            }
        });
        return deffered.promise;
    }
    function createUser(user) {
        var deffered = q.defer();
        UsersModel.create(user,function (err,usr) {
            if(err){
                console.log("hello   "+err);
                deffered.reject(err);
            }
            else{
                console.log("user " + usr);
                deffered.resolve(usr);
            }
        });
        return deffered.promise;
    }
};