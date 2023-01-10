const { coolThings } = require('../controllers');

const routes = require('express').Router();

routes.get('/', coolThings);

module.exports = routes;