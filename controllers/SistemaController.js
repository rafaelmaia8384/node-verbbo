const uuid = require('uuid/v4');
const db = require('../models/index.js');
const config = require('../config/config.js');
const ServerResponse = require('../helpers/ServerResponse.js');
const Op = db.Sequelize.Op;

class SistemaController {

    static async cadastrosPendentes(request, response) {
        try {
            const usuario = await db.usuarios.findOne({ where: { id: request.usuario.id_usuario }});
            if (usuario.permissao_2) {
                const pagina = request.params.pagina;
                const offs = ( pagina - 1 ) * ServerResponse.searchLimit;
                const cadastros = await db.usuarios.findAll({
                    where: {},
                    order: [['created_at', 'ASC']],
                    limit: ServerResponse.searchLimit,
                    offset: offs,
                    include: [
                        { model: db.usuarios_analises, as: 'analise', required: true, where: {
                            analise_concluida: false,
                        }},
                    ],
                });
                ServerResponse.success(response, cadastros.legth > 0 ? 'Cadastros pendentes obtidos.' : 'Nenhum cadastro pendente.', cadastros);
            }
            else {
                ServerResponse.error(response, 'Acesso negado.');                
            }
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao obter cadastros pendentes.');
        }
    }
}

module.exports = SistemaController;
