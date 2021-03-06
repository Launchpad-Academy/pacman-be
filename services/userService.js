/**
 * Created by Navit on 15/11/16.
 */
"use strict";

var Models = require("../models");

var updateUser = function(criteria, dataToSet, options, callback) {
  options.lean = true;
  options.new = true;
  Models.User.findOneAndUpdate(criteria, dataToSet, options, callback);
};

var updateUserAdditionalInfo = function(criteria, dataToSet, options, callback) {
  options.lean = true;
  options.new = true;
  Models.UserExtended.findOneAndUpdate(criteria, dataToSet, options, callback);
};
//Insert User in DB
var createUser = function(objToSave, callback) {
  new Models.User(objToSave).save(callback);
};

//Add the extra information for the extended user model
var completeUserDetailsForRegisteration = function(objToSave,callback){
  new Models.UserExtended(objToSave).save(callback);
}

//Get the details from the extended model
var getUserInfo = function(criteria, projection, options, callback) {
  options.lean = true;
  Models.UserExtended.find(criteria, projection, options, callback);
};
//Delete User in DB
var deleteUser = function(criteria, callback) {
  Models.User.findOneAndRemove(criteria, callback);
};

//Get Users from DB
var getUser = function(criteria, projection, options, callback) {
  options.lean = true;
  Models.User.find(criteria, projection, options, callback);
};

var getUserPromise = function(criteria, projection, options) {
  options.lean = true;
  return new Promise((resolve, reject) => {
    Models.User.find(criteria, projection, options, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

var getAllGeneratedCodes = function(callback) {
  var criteria = {
    OTPCode: { $ne: null }
  };
  var projection = {
    OTPCode: 1
  };
  var options = {
    lean: true
  };
  Models.User.find(criteria, projection, options, function(err, dataAry) {
    if (err) {
      callback(err);
    } else {
      var generatedCodes = [];
      if (dataAry && dataAry.length > 0) {
        dataAry.forEach(function(obj) {
          generatedCodes.push(obj.OTPCode.toString());
        });
      }
      callback(null, generatedCodes);
    }
  });
};

module.exports = {
  updateUser: updateUser,
  updateUserAdditionalInfo: updateUserAdditionalInfo,
  createUser: createUser,
  deleteUser: deleteUser,
  getUser: getUser,
  getUserInfo: getUserInfo,
  getAllGeneratedCodes: getAllGeneratedCodes,
  getUserPromise: getUserPromise,
  completeUserDetails : completeUserDetailsForRegisteration
};
