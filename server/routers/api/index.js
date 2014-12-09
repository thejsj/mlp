//Main router file that is responsible for initializing the photo, prompt, and comment routes
//the auth and media routes are in their own seperate files (cleverly named auth.js and media.js)

var express = require('express');
var apiRouter = express.Router();

var photoRouter = require('./photoRouter');
var promptRouter = require('./promptRouter');
var commentRouter = require('./commentRouter');

//app.use([path], [function...], function)
//path can be a string representing a path, a path pattern, 
//a regular expression to match paths, or an array of combinations of the aforementioned path objects.
apiRouter.use('/photo', photoRouter);
apiRouter.use('/prompt', promptRouter);
apiRouter.use('/comment', commentRouter);

module.exports = apiRouter;