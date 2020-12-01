const express = require('express');
const UsuariosController = require('../controllers/UsuariosController.js');
const checkToken = require('../middleware/checkToken.js');
const usuariosRouter = express.Router();

usuariosRouter.post('/login', UsuariosController.login);
usuariosRouter.post('/cadastrar', UsuariosController.cadastrarUsuario);
usuariosRouter.get('/obterAvisos/:ultimaData?', (checkToken), UsuariosController.obterAvisos);
usuariosRouter.get('/obterUsuarios/:permissao/:ultimaData', (checkToken), UsuariosController.obterUsuarios);
usuariosRouter.get('/perfil/:id', (checkToken), UsuariosController.perfil);
usuariosRouter.post('/atualizarPerfil', (checkToken), UsuariosController.atualizarPerfil);
usuariosRouter.post('/alterarSenha', (checkToken), UsuariosController.alterarSenha);
usuariosRouter.post('/despacharCadastro/:id', (checkToken), UsuariosController.despacharCadastro);
// usuariosRouter.delete('/excluir', (check), UsuariosController.excluirUsuario);
// usuariosRouter.get('/listar/:lat/:lon/:distance', (check), UsuariosController.listarUsuarios);
// usuariosRouter.get('/perfil/:id', (check), UsuariosController.obterPerfil);
// usuariosRouter.get('/estatisticas', (check), UsuariosController.obterEstatisticas);
// usuariosRouter.get('/estatisticas/sintomas/:s', (check), UsuariosController.evolucaoSintomas);
// usuariosRouter.get('/seed/:qnt/:raio/:lat/:lon', UsuariosController.seed);
// usuariosRouter.get('/seedlocais', UsuariosController.seedLocais);

module.exports = usuariosRouter;