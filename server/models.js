//Models for User, Prompt, Photo, and Commment

var bluebird = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');
var db = require('./db');
var models = {};

// User Model
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
    return this.hasMany(models.Photo);
  },
  prompt: function () {
    return this.hasMany(models.Prompt, 'user_id');
  },
  winner: function () {
    return this.hasMany(models.Prompt, 'winner_id');
  }
});

// Prompt Model - one to many photo, winner - photo id, start time and end time, voting end time, title
models.Prompt = db.Model.extend({
  tableName: 'prompts',
  hasTimestamps: true,
  initialize: function () {
    this.on('saving', this.validateSave);
  },
  validateSave: function () {
    var mysqlFormat = 'YYYY-MM-DD HH:MM:SS';
    this.attributes.startTime = moment(this.attributes.startTime).format(mysqlFormat);
    this.attributes.endTime = moment(this.attributes.endTime).format(mysqlFormat);
    this.attributes.votingEndTime = moment(this.attributes.votingEndTime).format(mysqlFormat);
    return this.attributes;
  },
  photos: function () {
    return this.hasMany(models.Photo, 'prompt_id');
  },
  user: function () {
    return this.belongsTo(models.User);
  },
  winner: function () {
    return this.belongsTo(models.Photo, 'winner_id');
  }
});

// Photo model - Each photo belongs to one user, and belongs to one prompt
models.Photo = db.Model.extend({
  tableName: 'photos',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo(models.User);
  },
  winner: function () {
    return this.hasOne(models.Prompt, 'winner_id');
  },
  prompt: function () {
    return this.belongsTo(models.Prompt);
  }
});

// Comment model
models.Comment = db.Model.extend({
  tableName: 'comments',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo(models.User);
  },
  prompt: function () {
    return this.belongsTo(models.Prompt);
  },
});

module.exports = models;