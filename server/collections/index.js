//Creates the collections for Users, Photos, Prompts, Comments from the respective user, photo, propmts and comment models.

var bluebird = require('bluebird'); //Bluebird is a fully featured promise library with focus on innovative features and performance
var models = require('../models'); //models.js creates the User, Prompt, Photo, and Comment models
var db = require('../db'); //The db.js file creates all of the database schemas using knex and bookshelf

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

collections.Comments = db.Collection.extend({
  model: models.Comment
});


module.exports = collections;