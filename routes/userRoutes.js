const {Router} = require('express');
const {getUserData, getSearchResults} = require('../controllers/userControllers');
const {auth} = require("../middleware/authMiddleware");
const route = Router();

route.get('/user',auth, getUserData);
route.post('/search',auth, getSearchResults);

module.exports = route;