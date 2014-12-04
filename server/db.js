//user model - email, password,
//model for promts - one to many photo, winner - photo id, start time and end time, voting end time, title
//photo - one to one with user, id, upvotes

var knex = require('knex');
var path = require('path');

var db = knex({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'password',
    database: 'majorleguedb',
    charset: 'utf8',
    filename: path.join(__dirname, './shortly.sqlite')
  }
});

//user model - email, password,
db.schema.hasTable('users').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('email', 255);
      user.string('password', 255);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

//model for promts - one to many photo, winner - photo id, start time and end time, voting end time, title
db.schema.hasTable('prompts').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('prompts', function (prompt) {
      prompt.increments('id').primary();
      prompt.string('title', 255);
      prompt.string('winner', 255);
      prompt.timestamp('startTime');
      prompt.timestamp('endTime');
      prompt.timestamp('votingEndTime');
      prompt.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

//photo - one to one with user, id, upvotes
db.schema.hasTable('photo').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('photo', function (photo) {
      photo.increments('id').primary();
      photo.integer('upvotes');
      photo.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;