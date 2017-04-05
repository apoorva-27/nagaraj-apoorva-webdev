/**
 * Created by hiresave on 3/20/2017.
 */

// console.log("user model server js");

module.exports = function () {

    // console.log('user.model.server.js');

    var q = require('q');
    var model = null;
    var mongoose = require("mongoose");
    var UserSchema;
    var UserModel;

    var api = {
        createUser: createUser,
        findUserByCredentials:findUserByCredentials,
        findUserByUsername:findUserByUsername,
        findUserById:findUserById,
        updateUser:updateUser,
        setModel:setModel,
        getModel:getModel,
        deleteUser:deleteUser,
        changeFollow:changeFollow
    };

    return api;

    function changeFollow(userFollowing,userToFollow) {
        var deffered = q.defer();

        UserModel.find({_id:userFollowing},function (err,en) {
            if (en[0]==undefined) {
                console.log("user doesnt exist, impossible error")
                   deffered.reject(err);
            }
            else {
                console.log("the user following exists")
                var i = en[0].following.indexOf(userToFollow);
                if (i<0)
                {
                    console.log("user.follower doesnt exists,impossible error")

                    UserModel.find({_id:userToFollow},function (err,person) {
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
                            }
                            else {
                                console.log("User is already a follower")
                            }
                        }

                    })
                }
                else {
                    console.log("user follower existed, in which case remove from folloer list")

                    UserModel.find({_id:userToFollow},function (err,person) {
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
                                console.log("tried to delete from both")
                            }
                        }
                    })
                    deffered.resolve(en[0]);
                }
            }
        });
        return deffered.promise;
    }

    function setModel(models) {
        model=models;
        UserSchema = require('./user.schema.server')(models);
        UserModel = mongoose.model('UserModel', UserSchema);
    }

    function getModel() {
        return UserModel;
    }

    function deleteUser(userId) {
        return UserModel.findByIdAndRemove(userId, function (err, user) {
            if (user != null)
            {
                user.remove();
            }
        });

    }

    function updateUser(userId,new_user) {
        var deffered = q.defer();
        UserModel
            .update(
                {_id: userId},{$set : new_user},function(err,usr) {
                if(err){
                    deffered.reject(err);
                }
                else{
                    return usr
                }
            });
        return deffered.promise;
    }

    function findUserById(userId) {

        var deffered = q.defer();
        UserModel.findById(userId ,function (err,usr) {
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
        UserModel.find({username:username} ,function (err,usr) {
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
        UserModel.find({username:username,password:password} ,function (err,usr) {
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
        UserModel.create(user,function (err,usr) {
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