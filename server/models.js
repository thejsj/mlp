//use bookshelf and knex to 

//user model - email, password, 
//model for promts - one to many photo, winner - photo id, start time and end time, voting end time, title
//photo - one to one with user, id, upvotes

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function () {
    this.on('creating', this.addPassword.bind(this));
  },
  addPassword: function (model) {
    var cipher = bluebird.promisify(bcrypt.hash);
    return cipher(model.attributes.__password, null, null).bind(this)
      .then(function (hash) {
        model.attributes.password = hash;
        delete model.attributes.__password;
        delete this.__password;
        this.password = hash;
      });
  },
  checkPassword: function (password) {
    var compare = bluebird.promisify(bcrypt.compare);
    return compare(this.get('password'), password)
      .then(function (isMatch) {
        return isMatch;
      });
  }
});


db.knex.schema.hasTable('users').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 255);
      user.string('password', 255);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});
