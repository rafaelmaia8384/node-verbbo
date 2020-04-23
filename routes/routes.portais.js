const express = require('express');
const db = require('../models/index.js');
const PortaisController = require('../controllers/PortaisController.js');
const checkToken = require('../middleware/checkToken.js');
const portaisRouter = express.Router();

portaisRouter.post('/criar', checkToken, PortaisController.criar);
portaisRouter.get('/meusportais', checkToken, PortaisController.meusPortais);

module.exports = portaisRouter;