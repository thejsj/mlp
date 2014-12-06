//use bookshelf and knex to

//user model - email, password,
//model for promts - one to many photo, winner - photo id, start time and end time, voting end time, title
//photo - one to one with user, id, upvotes

var bluebird = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var db = require('./db');
var models = {};

// User
models.User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function () {
    this.on('creating', this.addPassword.bind(this));
  },
  addPassword: function (model) {
    var cipher = bluebird.promisify(bcrypt.hash);
    return cipher(model.attributes.password, null, null)
      .then(function (hash) {
        delete model.attributes.password;
        delete this.password;
        model.attributes.password = hash;
        this.password = hash;
      }.bind(this));
  },
  checkPassword: function (password) {
    var compare = bluebird.promisify(bcrypt.compare);
    return compare(password, this.get('password'))
      .then(function (isMatch) {
        return isMatch;
      });
  },
  photo: function () {
    return this.belongsTo(models.Photo);
  }
});

// Prompt - one to many photo, winner - photo id, start time and end time, voting end time, title
models.Prompt = db.Model.extend({
  tableName: 'prompts',
  hasTimestamps: true,
  photos: function () {
    return this.hasMany(models.Photo, 'prompt_id');
  },
  winner: function () {
    return this.hasOne(models.Photo, 'winner_id');
  }
});

// Photo - one to one with user, id, upvotes
models.Photo = db.Model.extend({
  tableName: 'photos',
  hasTimestamps: true,
  user: function () {
    return this.hasOne(models.User, 'user_id');
  },
  defaults: {
    upvotes: 0
  },
  upvote: function () {
    this.upvotes++;
  },
  winner: function () {
    return this.belongsTo(models.Prompt);
  },
  prompt: function () {
    return this.belongsTo(models.Prompt);
  }
});

// Comment
models.Comment = db.Model.extend({
  tableName: 'comments',
  hasTimestamps: true,
  user: function () {
    return this.hasOne(models.User, 'user_id');
  },
  prompt: function () {
    return this.hasOne(models.Prompt, 'prompt_id');
  },
});

module.exports = models;