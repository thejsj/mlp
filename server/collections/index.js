var bluebird = require('bluebird');
var models = require('../models');
var db = require('../db');

var collections = {};

collections.Users = db.Collection.extend({
  model: models.User
});

collections.Photos = db.Collection.extend({
<<<<<<< HEAD
  model: models.Photo
});

collections.Prompts = db.Collection.extend({
  model: models.Prompt
});

collections.Comments = db.Collection.extend({
  model: models.Comment
=======
	model: models.Photo
});

collections.Prompts = db.Collection.extend({
	model: models.Prompt
>>>>>>> Add prompt routes to collections/index.js
});

module.exports = collections;