const db = require('../models/index.js');

class VerbboAvisos {

    static ANALISE_CADASTRAL_PENDENTE = 1;
    static ANALISE_CADASTRAL_CONCLUIDA = 2;

    static enviarAviso(id_usuario, tipo, id_objeto, titulo, sub_titulo, mensagem) {
        db.usuarios_avisos.create({
            id_usuario: id_usuario,
            tipo: tipo,
            id_objeto: id_objeto,
            titulo: titulo,
            sub_titulo: sub_titulo,
            mensagem: mensagem,
        });
    }

    static enviarAvisoBoasVindas(id_usuario) {
        VerbboAvisos.enviarAviso(id_usuario, VerbboAvisos.ANALISE_CADASTRAL_CONCLUIDA, null, 'Bem vindo!', 'Agora você faz parte da nossa equipe.', `Nossa estrutura organizacional é bastante intuitiva e visa manter a eficiência na produção das nossas publicações.\n\nClique aqui e entenda como funciona.`);
    }

    static enviarAvisoCadastroNegado(id_usuario) {
        VerbboAvisos.enviarAviso(id_usuario, VerbboAvisos.ANALISE_CADASTRAL_CONCLUIDA, null, '', '', '');
    }
}

module.exports = VerbboAvisos;