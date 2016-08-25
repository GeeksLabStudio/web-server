var express = require('express');

module.exports = function(app) {
  app.get('/', (req, res) => {res.render('index')});
  app.get('/store', (req, res) => {res.render('store')});
};
