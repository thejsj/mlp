var bluebird = require('bluebird');
var models = require('../models');
var db = require('../db');

console.log(models);

var collections = {};

collections.Users = db.Collection.extend({
  model: models.User
});

collections.Photos = db.Collection.extend({
	model: models.Photo
});

collections.Prompts = db.Collection.extend({
	model: models.Prompt
});

module.exports = collections;