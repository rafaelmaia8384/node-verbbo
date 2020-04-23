const express = require('express');
const db = require('../models/index.js');
const config = require('../config/config.js');
const UsuariosController = require('../controllers/UsuariosController.js');
const checkToken = require('../middleware/checkToken.js');
const usuariosRouter = express.Router();

usuariosRouter.post('/cadastrar', UsuariosController.cadastrarUsuario);
usuariosRouter.post('/login', UsuariosController.login);
usuariosRouter.post('/atualizarperfil', (checkToken), UsuariosController.atualizarPerfil);
usuariosRouter.post('/alterarsenha', (checkToken), UsuariosController.alterarSenha);
// usuariosRouter.delete('/excluir', (check), UsuariosController.excluirUsuario);
// usuariosRouter.get('/heatmap', (check), UsuariosController.obterHeadMap);
// usuariosRouter.get('/listar/:lat/:lon/:distance', (check), UsuariosController.listarUsuarios);
// usuariosRouter.get('/perfil/:id', (check), UsuariosController.obterPerfil);
// usuariosRouter.get('/estatisticas', (check), UsuariosController.obterEstatisticas);
// usuariosRouter.get('/estatisticas/sintomas/:s', (check), UsuariosController.evolucaoSintomas);
// usuariosRouter.get('/seed/:qnt/:raio/:lat/:lon', UsuariosController.seed);
// usuariosRouter.get('/seedlocais', UsuariosController.seedLocais);

module.exports = usuariosRouter;