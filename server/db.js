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
    db.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('email', 255);
      user.string('password', 255);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

// Model for prompts - one to many photo, winner - photo id, start time and end time, voting end time, title
db.schema.hasTable('prompts').then(function (exists) {
  if (!exists) {
    db.schema.createTable('prompts', function (prompt) {
      prompt.increments('id').primary();
      prompt.string('title', 255);
      prompt.integer('winner_id').references('photos.id');
      prompt.integer('user_id').references('users.id');
      prompt.timestamp('startTime'); // TODO: Change to lower_case
      prompt.timestamp('endTime'); // TODO: Change to lower_case
      prompt.timestamp('votingEndTime'); // TODO: Change to lower_case
      prompt.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

// Photo - one to one with user, id, upvotes
db.schema.hasTable('photos').then(function (exists) {
  if (!exists) {
    db.schema.createTable('photos', function (photo) {
      photo.increments('id').primary();
      photo.string('filename', 255); // Relative to /media/
      photo.integer('user_id').references('users.id');
      photo.integer('prompt_id').references('prompts.id');
      photo.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

// Comment - one to one with user, belongsTo prompts - needs a user and needs a photo
db.schema.hasTable('comments').then(function (exists) {
  if (!exists) {
    db.schema.createTable('comments', function (photo) {
      photo.increments('id').primary();
      photo.string('content', 255).notNullable();
      photo.integer('user_id').references('users.id').notNullable();
      photo.integer('prompt_id').references('prompts.id').notNullable();
      photo.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

var bookshelf = require('bookshelf')(db);
module.exports = bookshelf;