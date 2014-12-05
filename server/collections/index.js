var bluebird = require('bluebird');
var models = require('../models');
var db = require('../db');

console.log(models);

var collections = {};

collections.Users = db.Collection.extend({
  model: models.User
});

collection.Photos = db.Collection.extend({
	model: models.Photo
});

collection.Prompts = db.Collection.extend({
	model: models.Prompt
});

module.exports = collections;