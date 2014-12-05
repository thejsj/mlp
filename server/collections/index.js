var bluebird = require('bluebird');
var User = require('../models');
var db = require('../db');

var collections = {};

collections.Users = db.Collection.extend({
  model: User
});

module.exports = collections;