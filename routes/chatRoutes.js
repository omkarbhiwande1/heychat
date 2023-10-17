const {Router} = require('express');
const {getTempChat, sendTempChat, getConversations, sendChat, getCurrentConversation} = require('../controllers/chatControllers');
const {auth} = require("../middleware/authMiddleware");
const route = Router();

route.get('/tchat/:uid',auth, getTempChat);
route.post('/tchat',auth, sendTempChat);
route.post('/chat',auth, sendChat);
route.get('/conversations',auth, getConversations);
route.get('/currentconversation/:rid/:tchat',auth, getCurrentConversation);


module.exports = route;