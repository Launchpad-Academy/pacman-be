var Models = require("../models");

var updateBattle = function(criteria, dataToSet, options, callback) {
  options.lean = true;
  options.new = true;
  Models.Battle.findOneAndUpdate(criteria, dataToSet, options, callback);
};



//Insert Battle Details into the DB
var createBattle = function(objToSave, callback) {
  new Models.Battle(objToSave).save(callback);
};

//Delete Details in DB
var deleteBattle = function(criteria, callback) {
  Models.Battle.findOneAndRemove(criteria, callback);
};

//Get DEtails  from DB
var findPlayer = function(criteria, projection, options, callback) {
  Models.Battle.find(criteria, projection, options, callback);
};

module.exports = {
  createBattle: createBattle,
  findPlayer: findPlayer,
  updateBattle: updateBattle,
  deleteBattle: deleteBattle
};
