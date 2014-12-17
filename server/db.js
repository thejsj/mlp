//user model - email, password,
//model for promts - one to many photo, winner - photo id, start time and end time, voting end time, title
//photo - one to one with user, id, upvotes

var knex = require('knex');
var path = require('path');

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  console.log('Connecting to Docker MySQL: ');
  console.log(process.env.DB_PORT_3306_TCP_ADDR);
  console.log(process.env.DB_ENV_MYSQL_USER);
  console.log(process.env.DB_ENV_MYSQL_PASS);
  var db = knex({
    client: 'mysql',
    connection: {
      host: process.env.DB_PORT_3306_TCP_ADDR,
      user: process.env.DB_ENV_MYSQL_USER,
      password: process.env.DB_ENV_MYSQL_PASS,
      database: 'kbitzr'
    }
  });
} else {
  var db = knex({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'kbitzr'
    }
  });
}

// var db = knex({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'majorleguedb',
//     charset: 'utf8',
//     filename: path.join(__dirname, './shortly.sqlite')
//   }
// });

//user model - email, password,
db.schema.hasTable('users').then(function (exists) {
  if (!exists) {
    db.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('email', 255);
      user.string('password', 255);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table `users`');
    });
  }
});

// Model for prompts - one to many photo, winner - photo id, start time and end time, voting end time, title
db.schema.hasTable('prompts').then(function (exists) {
  if (!exists) {
    db.schema.createTable('prompts', function (prompt) {
      prompt.increments('id').primary();
      prompt.string('title', 255);
      prompt.integer('winner_id').unsigned().references('id').inTable('photos');
      prompt.integer('user_id').unsigned().notNullable().references('id').inTable('users');
      prompt.timestamp('startTime'); // TODO: Change to lower_case
      prompt.timestamp('endTime'); // TODO: Change to lower_case
      prompt.timestamp('votingEndTime'); // TODO: Change to lower_case
      prompt.timestamps();
    }).then(function (table) {
      console.log('Created Table `prompts`');
    }).catch(function (err) {
      console.log('Error creating `prompts`: ', err);
    });
  }
});

// Photo - one to one with user, id, upvotes
db.schema.hasTable('photos').then(function (exists) {
  if (!exists) {
    db.schema.createTable('photos', function (photo) {
      photo.increments('id').primary();
      photo.string('filename', 255); // Relative to /media/
      photo.integer('user_id').unsigned().notNullable().references('id').inTable('users');
      photo.integer('prompt_id').unsigned().notNullable().references('id').inTable('prompts');
      photo.timestamps();
    }).then(function (table) {
      console.log('Created Table `photos`');
    }).catch(function (err) {
      console.log('Error creating `photos`: ', err);
    });
  }
});

// Comment - one to one with user, belongsTo prompts - needs a user and needs a photo
db.schema.hasTable('comments').then(function (exists) {
  if (!exists) {
    db.schema.createTable('comments', function (photo) {
      photo.increments('id').primary();
      photo.string('content', 255).notNullable();
      photo.integer('user_id').unsigned().notNullable().references('id').inTable('users');
      photo.integer('prompt_id').unsigned().notNullable().references('id').inTable('prompts');
      photo.timestamps();
    }).then(function (table) {
      console.log('Created Table `comments`');
    }).catch(function (err) {
      console.log('Error creating `comments`: ', err);
    });
  }
});

var bookshelf = require('bookshelf')(db);
module.exports = bookshelf;