const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Posts = mongoose.model('Posts');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Posts.find((err, posts) => {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      posts: posts
    });
  });
});
