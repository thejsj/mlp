var express = require('express');
var apiRouter = express.Router();

var photoRouter = require('./photoRouter');
var promptRouter = require('./promptRouter');
var commentRouter = require('./commentRouter');

apiRouter.use('/photo', photoRouter);
apiRouter.use('/prompt', promptRouter);
apiRouter.use('/comment', commentRouter);

module.exports = apiRouter;