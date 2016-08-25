var express = require('express');

module.exports = function(app) {
	// index
  app.get('/', (req, res) => {
  	res.render('index', { title: 'Home page' })
  });
  // store
  app.get('/store', (req, res) => {
  	res.render('store', {title: 'Store page'})
  });
  // other routs
  app.get('*', (req, res) => {
  	res.render('index', { title: 'Home page' })
  });
};
