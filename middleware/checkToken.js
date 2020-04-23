const ServerResponse = require('../helpers/ServerResponse.js');
const config = require('../config/config.js');
const jwt = require('jsonwebtoken');

const checkToken = (request, response, next) => {
    try {
        if (!request.headers['verbbo-token']) {
            ServerResponse.error(response, 'Acesso negado.');
            return;
        }
        else {
            request.usuario = jwt.verify(request.headers['verbbo-token'], config.tokenKey);
            next();
        }
    }
    catch(error) {
        console.log('Error: ' + error);
        ServerResponse.error(response, 'Tempo de conexão expirado.');
    }
};

module.exports = checkToken;