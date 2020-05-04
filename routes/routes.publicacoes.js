const express = require('express');
const db = require('../models/index.js');
const PublicacoesController = require('../controllers/PublicacoesController.js');
const checkToken = require('../middleware/checkToken.js');
const publicacoesRouter = express.Router();

publicacoesRouter.post('/prever', (checkToken), PublicacoesController.prever);
//publicacoesRouter.get('/prever', PublicacoesController.prever);

module.exports = publicacoesRouter;