/**
 * Created by hiresave on 3/20/2017.
 */

// console.log("user model server js");

module.exports = function () {

    // console.log('users.model.server.js');

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
        deleteUser:deleteUser
    };

    return api;

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
        // console.log("update user  in user model server.js"+new_user.firstname,userId);
        var deffered = q.defer();
        UserModel
            .update(
                {_id: userId},{$set : new_user},function(err,usr) {
                if(err){
                    // console.log("hello   "+err);
                    deffered.reject(err);
                }
                else{
                    // console.log("user :" + usr);
                    // deffered.resolve(usr);
                    deffered.resolve(usr);
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
                // console.log("user " + usr);
                deffered.resolve(usr);
            }
        });
        return deffered.promise;
    }

    function findUserByCredentials(username,password) {
        // console.log("find by cred model.server")
        var deffered = q.defer();
        UserModel.find({username:username,password:password} ,function (err,usr) {
            if(err){
                // console.log("hello   "+err);
                deffered.reject(err);
            }
            else{
                // console.log("user " + usr);
                deffered.resolve(usr);
            }
        });
        return deffered.promise;
    }
    function createUser(user) {
        var deffered = q.defer();
        UserModel.create(user,function (err,usr) {
            if(err){
                // console.log("hello   "+err);
                deffered.reject(err);
            }
            else{
                // console.log("user " + usr);
                deffered.resolve(usr);
            }
        });
        return deffered.promise;
    }

};