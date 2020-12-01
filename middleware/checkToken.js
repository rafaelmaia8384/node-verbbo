const ServerResponse = require('../helpers/ServerResponse.js');
const config = require('../config/config.js');
const db = require('../models/index.js');
const jwt = require('jsonwebtoken');

const checkToken = async (request, response, next) => {
    try {
        if (!request.headers['verbbo-token']) {
            ServerResponse.error(response, 'Acesso negado.');
            return;
        }
        else {
            console.log(request.headers['verbbo-token']);
            request.usuario = jwt.verify(request.headers['verbbo-token'], config.tokenKey);
            const usuario = await db.usuarios.findOne({ 
                where: { 
                    id: request.usuario.id_usuario 
                },
                include: [
                    { model: db.usuarios_analises, as: 'analise' },
                ]
            });
            if (usuario) {
                if (usuario.analise.analise_concluida && usuario.analise.analise_aprovada) {
                    next();
                    return;
                }
            }
            ServerResponse.error(response, 'Token inválido.');
        }
    }
    catch(error) {
        console.log('Error: ' + error);
        ServerResponse.error(response, 'Token inválido.');
    }
};

module.exports = checkToken;