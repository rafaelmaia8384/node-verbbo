const db = require('../models/index.js');

class VerbboPermissions {

    static PERMISSAO_ROOT = 1;
    static PERMISSAO_CEO = 2;
    static PERMISSAO_ADMINISTRADOR = 3;
    static PERMISSAO_GESTOR = 4;
    static PERMISSAO_SUPERVISOR = 5;
    static PERMISSAO_EDITOR = 6;

    static async checkUserPermission(usuario, permissao) {
        var confirm = false;
        const permissoes = await db.usuarios_permissoes.findAll({
            where: {
                id_usuario: usuario.id,
            }
        });
        if (permissoes) {
            permissoes.map((p) => { 
                if (p.id_permissao === permissao) {
                    confirm = true;
                    return;
                }
            });
        }
        return confirm;
    }
}

module.exports = VerbboPermissions;