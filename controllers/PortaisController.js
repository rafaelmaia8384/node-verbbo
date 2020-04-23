const uuid = require('uuid/v4');
const db = require('../models/index.js');
const ServerResponse = require('../helpers/ServerResponse.js');
const storage = require('../helpers/StorageHelper.js');
const Op = db.Sequelize.Op;

class PortaisController {

    static async criar(request, response) {
        try {
            const portal = await db.portais.findOne({ where: { id: request.body.id } });
            if (portal) {
                ServerResponse.error(response, `O endereço '${request.body.id}.verbbo.com.br' já está em uso. Por favor escolha outro nome para o seu portal.`);    
            }
            else {
                const path_image = request.usuario.id_usuario + '.' + uuid() + '.jpg';
                request.body.id_usuario = request.usuario.id_usuario;
                request.body.portal_nome = request.body.portal_nome.replace(/\s\s+/g, ' ');
                request.body.portal_resumo = request.body.portal_resumo.replace(/\s\s+/g, ' ');
                request.body.path_image = path_image;
                const signedUrl = storage.getUploadUrl(path_image);
                const portal = await db.portais.create(request.body);
                ServerResponse.success(response, 'Portal criado.', [ portal, { signedUrls: [ signedUrl ] } ]);
            }
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao criar portal. Tente novamente em instantes.');
        }
    }

    static async meusPortais(request, response) {
        try {
            const portais = await db.portais.findAll({ 
                where: { id_usuario: request.usuario.id_usuario },
            });
            ServerResponse.success(response, 'Portais encontrados.', portais);
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao criar portal. Tente novamente em instantes.');
        }
    }
}

module.exports = PortaisController;
