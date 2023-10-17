const {Router} = require('express');
const {signup,login} = require('../controllers/authControllers');

const route = Router();

route.post('/signup',signup);
route.post('/login',login);

module.exports = route;