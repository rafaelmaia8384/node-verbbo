const express = require('express');
const SistemaController = require('../controllers/SistemaController.js');
const checkToken = require('../middleware/checkToken.js');
const sistemaRouter = express.Router();

sistemaRouter.get('/cadastrospendentes/:pagina', (checkToken), SistemaController.cadastrosPendentes);

module.exports = sistemaRouter;