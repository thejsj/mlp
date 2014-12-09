//Creates database schemas using knex and bookshelf

//Knex.js (http://knexjs.org/)is a "batteries included" SQL query builder for Postgres, MySQL, MariaDB and SQLite3, designed to be flexible,
//portable, and fun to use. It features both traditional node style callbacks as well as a promise interface for cleaner
//async flow control, a stream interface, full featured query and schema builders, transaction support,
//connection pooling and standardized responses between different query clients and dialects.
var knex = require('knex');
var path = require('path');


//The knex module is its self a function which takes a configuration object for Knex, accepting a few parameters.
//The client parameter is required and determines which client adapter will be used with the library.
//The connection options are passed directly to the appropriate database client to create the connection,
//and may be either an object, or a connection string.
//Note: When you use the SQLite3 adapter, there is a filename required, not a network connection.
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

//Table for users - has email, and password
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

//Table for prompts - each prompt has a title, a winner_id, which references photo.id, a user id which references user.id
//each prompt also has a startTime, which is the time the prompt was created, an endTime which is currently set to 4 hours
//from the start time, and a votingEndtime, which is 6 hours from the start time
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

// Table for photos - one to one with user
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

//Table for comments - one-to-one relationship with user
//each comment must have content, user_id, and prompt_id
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