const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validarCpf = require('validar-cpf');
const db = require('../models/index.js');
const config = require('../config/config.js');
const ServerResponse = require('../helpers/ServerResponse.js');
const VerbboPermissions = require('../helpers/VerbboPermissions.js');
const VerbboAvisos = require('../helpers/VerbboAvisos.js');
const VerbboUserLevel = require('../helpers/VerbboUserLevel.js');
const storage = require('../helpers/StorageHelper.js');
const Op = db.Sequelize.Op;

class UsuariosController {

    static getToken(id_usuario, permissoes) {
        const token = jwt.sign({
            id_usuario: id_usuario,
            permissoes: permissoes,
        }, config.tokenKey, {
            expiresIn: '365d'
        });
        return token;
    }

    static async cadastrar(request, response, id_superior, permissao) {
        const cpf = request.body.cpf.replace(/\D/g,'');
        const id_usuario = uuid();
        const dataNascimento = request.body.data_nascimento.split('/').reverse().join('-') + ' 00:00:00';
        const dataParts = request.body.data_nascimento.split('/');
        if (dataParts[0] == 0 || dataParts[0] > 31 || dataParts[1] == 0 || dataParts[1] > 12 || dataParts[2] < 1920 || dataParts[2] > 2020) {
            ServerResponse.error(response, 'Data de nascimento inválida.');
            return;
        }
        const path_image = id_usuario + '.' + uuid() + '.jpg';
        const path_image_documento = id_usuario + '.' + uuid() + '.jpg';
        request.body.id = id_usuario;
        request.body.id_superior = id_superior;
        request.body.path_image = path_image;
        request.body.nome = request.body.nome.replace(/\s\s+/g, ' ');
        request.body.nome_completo = request.body.nome_completo.replace(/\s\s+/g, ' ');
        request.body.resumo = request.body.resumo.replace(/\s\s+/g, ' ');
        request.body.cpf = cpf;
        request.body.data_nascimento = dataNascimento;
        request.body.telefone = request.body.telefone.replace(/\D/g,'');
        request.body.senha_hash = crypto.createHash('md5').update(request.body.senha_hash).digest('hex');
        const urlImagemPerfil = storage.getUploadUrl(path_image);
        const urlImagemDocumento = storage.getUploadUrl(path_image_documento);
        const usuario = await db.usuarios.create(request.body);
        if (usuario) {
            db.usuarios_analises.create({
                id_usuario: usuario.id,
                path_image: path_image_documento,
            });
            db.usuarios_permissoes.create({
                id_usuario: usuario.id,
                id_permissao: permissao,
            });
            VerbboAvisos.enviarAviso(id_superior, VerbboAvisos.ANALISE_CADASTRAL_PENDENTE, usuario.id, 'Aprovação necessária!', request.body.nome_completo, `Um novo usuário está aguardando sua aprovação para utilizar a plataforma. Você convidou esse usuário para se juntar a nós?\n\nClique aqui para fazer sua confirmação.`);
        }
        ServerResponse.success(response, 'Usuário cadastrado.', [ { signedUrls: [ urlImagemPerfil, urlImagemDocumento ], } ]);
    }

    static async permitirCadastro(id_usuario, limite) {
        const num = await db.usuarios.count({
            where: {
                id_superior: id_usuario,
            },
        });
        return num < limite;
    }

    static async identificarFuncao(request, response) {
        const convite = request.body.convite;
        const usuario_root = await db.usuarios.findOne({ where: { convite_ceo: convite }, include: [
            { model: db.usuarios_permissoes, as: 'permissoes' },
        ]});
        const usuario_ceo = await db.usuarios.findOne({ where: { convite_administrador: convite }, include: [
            { model: db.usuarios_permissoes, as: 'permissoes' },
        ]});
        const usuario_administrador = await db.usuarios.findOne({ where: { convite_gestor: convite }, include: [
            { model: db.usuarios_permissoes, as: 'permissoes' },
        ]});
        const usuario_gestor = await db.usuarios.findOne({ where: { convite_supervisor: convite }, include: [
            { model: db.usuarios_permissoes, as: 'permissoes' },
        ]});
        const usuario_supervisor = await db.usuarios.findOne({ where: { convite_editor: convite }, include: [
            { model: db.usuarios_permissoes, as: 'permissoes' },
        ]});
        if (usuario_root) {
            if (await VerbboPermissions.checkUserPermission(usuario_root, VerbboPermissions.PERMISSAO_ROOT) === true) {
                if (await UsuariosController.permitirCadastro(usuario_root.id, usuario_root.limite_hierarquico) === true) {
                    UsuariosController.cadastrar(request, response, usuario_root.id, VerbboPermissions.PERMISSAO_CEO);
                }
                else {
                    ServerResponse.error(response, 'Limite excedido.\n\nInfelizmente você foi convidado por um usuário que excedeu o limite máximo de novos usuários.');
                }
            }
            else {
                ServerResponse.error(response, 'Seu convite está expirado. Peça um novo convite e tente novamente.');
            }
        }
        else if (usuario_ceo) {
            if (await VerbboPermissions.checkUserPermission(usuario_ceo, VerbboPermissions.PERMISSAO_CEO) === true) {
                if (await UsuariosController.permitirCadastro(usuario_ceo.id, usuario_ceo.limite_hierarquico) === true) {
                    UsuariosController.cadastrar(request, response, usuario_ceo.id, VerbboPermissions.PERMISSAO_ADMINISTRADOR);
                }
                else {
                    ServerResponse.error(response, 'Limite excedido.\n\nInfelizmente você foi convidado por um usuário que excedeu o limite máximo de novos usuários.');
                }
            }
            else {
                ServerResponse.error(response, 'Seu convite está expirado. Peça um novo convite e tente novamente.');
            }
        }
        else if (usuario_administrador) {
            if (await VerbboPermissions.checkUserPermission(usuario_administrador, VerbboPermissions.PERMISSAO_ADMINISTRADOR) === true) {
                if (await UsuariosController.permitirCadastro(usuario_administrador.id, usuario_administrador.limite_hierarquico) === true) {
                    UsuariosController.cadastrar(request, response, usuario_administrador.id, VerbboPermissions.PERMISSAO_GESTOR);
                }
                else {
                    ServerResponse.error(response, 'Limite excedido.\n\nInfelizmente você foi convidado por um usuário que excedeu o limite máximo de novos usuários.');
                }
            }
            else {
                ServerResponse.error(response, 'Seu convite está expirado. Peça um novo convite e tente novamente.');
            }
        }
        else if (usuario_gestor) {
            if (await VerbboPermissions.checkUserPermission(usuario_gestor, VerbboPermissions.PERMISSAO_GESTOR) === true) {
                if (await UsuariosController.permitirCadastro(usuario_gestor.id, usuario_gestor.limite_hierarquico) === true) {
                    UsuariosController.cadastrar(request, response, VerbboPermissions.PERMISSAO_SUPERVISOR);
                }
                else {
                    ServerResponse.error(response, 'Limite excedido.\n\nInfelizmente você foi convidado por um usuário que excedeu o limite máximo de novos usuários.');
                }
            }
            else {
                ServerResponse.error(response, 'Seu convite está expirado. Peça um novo convite e tente novamente.');
            }
        }
        else if (usuario_supervisor) {
            if (await VerbboPermissions.checkUserPermission(usuario_supervisor, usuario_supervisor.id, VerbboPermissions.PERMISSAO_SUPERVISOR) === true) {
                if (await UsuariosController.permitirCadastro(usuario_supervisor.id, usuario_supervisor.limite_hierarquico) === true) {
                    UsuariosController.cadastrar(request, response, VerbboPermissions.PERMISSAO_EDITOR);
                }
                else {
                    ServerResponse.error(response, 'Limite excedido.\n\nInfelizmente você foi convidado por um usuário que excedeu o limite máximo de novos usuários.');
                }
            }
            else {
                ServerResponse.error(response, 'Seu convite está expirado. Peça um novo convite e tente novamente.');
            }
        }
        else {
            ServerResponse.error(response, 'Convite inválido.');
        }
        if (request.candidato) {
            request.candidato.analise.destroy();
            request.candidato.permissoes.map((p) => {
                p.destroy();
            });
            request.candidato.destroy();
        }
    }

    static async cadastrarUsuario(request, response) {
        try {
            const convite = request.body.convite;
            if (convite.split('-').length != 5) {
                ServerResponse.error(response, 'Convite inválido.'); 
                return;
            }
            const cpf = request.body.cpf.replace(/\D/g,'');
            if (validarCpf(cpf)) {
                const usuario = await db.usuarios.findOne({ 
                    where: { 
                        cpf: cpf 
                    },
                    include: [
                        { model: db.usuarios_analises, as: 'analise' },
                        { model: db.usuarios_permissoes, as: 'permissoes' },
                    ]
                });
                if (usuario) {
                    if (usuario.analise.analise_concluida) {
                        if (usuario.analise.analise_aprovada) {
                            ServerResponse.error(response, 'O CPF informado já está cadastrado na plataforma.');
                        }
                        else {
                            //Apagar as imagens antigas
                            const imgPerfil = usuario.path_image.split('/').slice(-1)[0];
                            const imgDocumento = usuario.analise.path_image.split('/').slice(-1)[0];
                            storage.deleteObject(imgPerfil);
                            storage.deleteObject(imgDocumento);
                            request.candidato = usuario;
                            UsuariosController.identificarFuncao(request, response);
                        }
                    }
                    else {
                        ServerResponse.error(response, 'O CPF informado já possui um cadastro em análise.');
                    }
                }
                else {
                    UsuariosController.identificarFuncao(request, response);
                }   
            }
            else {
                ServerResponse.error(response, 'CPF inválido.'); 
            }
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao cadastrar usuário. Tente novamente em instantes.');
        }
    }

    static async login(request, response) {
        try {
            const email = request.body.email;
            const senha = crypto.createHash('md5').update(request.body.senha).digest('hex');
            const usuario = await db.usuarios.findOne({ 
                where: { 
                    email: email, 
                    senha_hash: senha, 
                },
                attributes: ['id', 'convite_ceo', 'convite_administrador', 'convite_gestor', 'convite_supervisor', 'convite_editor', 'nome', 'resumo', 'nome_completo', 'cpf', 'data_nascimento', 'telefone', 'email', 'path_image', 'bloqueado', 'bloqueado_motivo', 'updated_at', ],
                include: [
                    { model: db.usuarios_analises, as: 'analise', attributes: ['analise_concluida', 'analise_aprovada', 'mensagem'] },
                    { model: db.usuarios_permissoes, as: 'permissoes', },
                ]
            });
            if (usuario) {
                if (usuario.bloqueado) {
                    ServerResponse.error(response, `Seu acesso está temporariamente bloqueado.\n\nMotivo: ${usuario.bloqueado_motivo}.`);
                }
                else {
                    const pontos = 0;
                    usuario.setDataValue('level', VerbboUserLevel.getLevelObject(pontos));
                    usuario.setDataValue('token', UsuariosController.getToken(usuario.id, usuario.analise));
                    ServerResponse.success(response, 'Login efetuado.', [ usuario ]);
                }
            }
            else {
                ServerResponse.error(response, 'Email ou senha inválidos.');
            }
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao fazer login. Tente novamente em instantes.');
        }
    }

    static async obterAvisos(request, response) {
        try {
            var avisos;
            if (request.params.ultimaData) {
                avisos = await db.usuarios_avisos.findAll({
                    where: {
                        id_usuario: { [Op.or]: [request.usuario.id_usuario, null] },
                        createdAt: { [Op.lt]: Date.parse(request.params.ultimaData) }
                    },
                    order: [['created_at', 'DESC']],
                    limit: ServerResponse.searchLimit,
                });
            }
            else {
                avisos = await db.usuarios_avisos.findAll({
                    where: {
                        id_usuario: { [Op.or]: [request.usuario.id_usuario, null] },
                        recebido: false,
                    },
                    order: [['created_at', 'DESC']],
                    limit: ServerResponse.searchLimit,
                });
            }
            ServerResponse.success(response, avisos.length > 0 ? 'Avisos obtidos.' : 'Nenhum aviso encontrado.', avisos);
            avisos.map((a) => {
                a.update({ recebido: true });
            });
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao obter avisos. Tente novamente em instantes.');
        }
    }

    static async obterUsuarios(request, response) {
        try {
            var result;
            if (request.params.ultimaData === '9999-01-01') {
                result = await db.usuarios.findAll({ 
                    where: { 
                        id_superior: request.usuario.id_usuario,
                    },
                    order: [
                        ['createdAt', 'ASC']
                    ],
                    include: [
                        { model: db.usuarios_analises, as: 'analise', required: true, where: {
                            analise_concluida: false,
                        }},
                        { model: db.usuarios_permissoes, as: 'permissoes', required: true, where: {
                            id_permissao: request.params.permissao,
                        }},
                    ]
                });
                const usuarios = await db.usuarios.findAll({ 
                    where: { 
                        createdAt: { 
                            [Op.lt]: Date.parse(request.params.ultimaData),
                        },
                    },
                    limit: ServerResponse.searchLimit,
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [
                        { model: db.usuarios_analises, as: 'analise', required: true, where : {
                            analise_concluida: true,
                            analise_aprovada: true,
                        }},
                        { model: db.usuarios_permissoes, as: 'permissoes', required: true, where: {
                            id_permissao: request.params.permissao,
                        }},
                    ]
                });
                usuarios.map((u) => {
                    result.push(u);
                })
            }
            else {
                result = await db.usuarios.findAll({ 
                    where: { 
                        createdAt: { 
                            [Op.lt]: Date.parse(request.params.ultimaData),
                        },
                    },
                    limit: ServerResponse.searchLimit,
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [
                        { model: db.usuarios_analises, as: 'analise', required: true, where : {
                            analise_concluida: true,
                            analise_aprovada: true,
                        }},
                        { model: db.usuarios_permissoes, as: 'permissoes', required: true, where: {
                            id_permissao: request.params.permissao,
                        }},
                    ]
                });
            }
            ServerResponse.success(response, result.length > 0 ? 'Usuários obtidos.' : 'Nenhum usuário encontrado.', result);
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao obter usuários. Tente novamente em instantes.');
        }
    }

    static async perfil(request, response) {
        try {
            const usuario = await db.usuarios.findOne({ 
                where: { id: request.params.id, },
                attributes: ['id', 'id_superior', 'nome', 'resumo', 'nome_completo', 'cpf', 'data_nascimento', 'telefone', 'email', 'path_image', 'bloqueado', 'bloqueado_motivo', 'createdAt', ],
                include: [
                    { model: db.usuarios_analises, as: 'analise' },
                    { model: db.usuarios_permissoes, as: 'permissoes' },
                ]
            });
            if (usuario) {
                usuario.setDataValue('superior', await db.usuarios.findOne({ where: { id: usuario.id_superior }}));
                usuario.setDataValue('token', UsuariosController.getToken(usuario.id, usuario.permissoes));
                ServerResponse.success(response, 'Perfil obtido.', [ usuario ]);
            }
            else {
                ServerResponse.error(response, 'Usuário não encontrado.');
            }
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao fazer login. Tente novamente em instantes.');
        }
    }

    static async atualizarPerfil(request, response) {
        try {
            const path_image = request.usuario.id_usuario + '.' + uuid() + '.jpg';
            const nome = request.body.nome.trim().replace(/\s\s+/g, ' ');
            const resumo = request.body.resumo.trim().replace(/\s\s+/g, ' ');
            const telefone = request.body.telefone = request.body.telefone.trim().replace(/\D/g,'');
            const signedUrls = [];
            if (request.body.nova_imagem == 'true') {
                const usuario = await db.usuarios.findOne({ where: { id: request.usuario.id_usuario, }});
                if (usuario) {
                    const imgPerfil = usuario.path_image.split('/').slice(-1)[0];
                    storage.deleteObject(imgPerfil);
                }
                await db.usuarios.update({ 
                    nome: nome, 
                    resumo: resumo,
                    telefone: telefone,
                    path_image: path_image,
                }, {
                    where: { id: request.usuario.id_usuario, }
                });
                signedUrls.push(storage.getUploadUrl(path_image));
            }
            else {
                await db.usuarios.update({ 
                    nome: nome, 
                    resumo: resumo,
                    telefone: telefone,
                }, {
                    where: { id: request.usuario.id_usuario, }
                });
            }
            const usuario = await db.usuarios.findOne({ where: { id: request.usuario.id_usuario, } });
            ServerResponse.success(response, 'Perfil atualizado.', [ { signedUrls: signedUrls, } ]);
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao atualizar perfil. Tente novamente em instantes.');
        }
    }

    static async alterarSenha(request, response) {
        try {
            const senha_atual = crypto.createHash('md5').update(request.body.senha_antiga).digest('hex');
            const usuario = await db.usuarios.findOne({ where: { id: request.usuario.id_usuario, senha_hash: senha_atual } });
            if (usuario) {
                const senha_nova = crypto.createHash('md5').update(request.body.senha_nova).digest('hex');
                await db.usuarios.update({ senha_hash: senha_nova }, { where: { id: request.usuario.id_usuario } });
                ServerResponse.success(response, 'Senha de acesso alterada.');
            }
            else {
                ServerResponse.error(response, 'A senha atual não confere.');
            }
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro alterar senha. Tente novamente em instantes.');
        }
    }

    static async despacharCadastro(request, response) {
        try {
            const usuario = await db.usuarios.findOne({ 
                where: { 
                    id: request.params.id
                },
                include: [
                    { model: db.usuarios_analises, as: 'analise' },
                    { model: db.usuarios_permissoes, as: 'permissoes' },
                ]
            });
            if (usuario) {
                if (usuario.analise.id_analisador1) {
                    if (request.body.autorizado == 'true') {
                        usuario.analise.update({
                            id_analisador2: request.usuario.id_usuario,
                            analise_concluida: true,
                            analise_aprovada: true,
                        });
                        VerbboAvisos.enviarAvisoBoasVindas(request.params.id);
                    }
                    else {
                        var mensagem = request.body.mensagem;
                        if (mensagem.endsWith('.')) {
                            mensagem = mensagem.substring(0, mensagem.length-1);
                        }
                        usuario.analise.update({
                            id_analisador1: request.usuario.id_usuario,
                            analise_concluida: true,
                            analise_aprovada: false,
                            analise_mensagem: motivo,
                        });
                        VerbboAvisos.enviarAvisoCadastroNegado(request.params.id);
                    }
                }
                else {
                    if (request.body.autorizado == 'true') {
                        usuario.analise.update({
                            id_analisador1: request.usuario.id_usuario,
                        });
                    }
                    else {
                        usuario.analise.update({
                            id_analisador1: request.usuario.id_usuario,
                            analise_concluida: true,
                            analise_aprovada: false,
                            analise_mensagem: 'Infelizmente seu cadastro foi negado pelo dono do seu convite.',
                        });
                        VerbboAvisos.enviarAvisoCadastroNegado(request.params.id);
                    }
                }
                ServerResponse.success(response, 'Despacho realizado.', []);
            }
            else {
                ServerResponse.error(response, 'Usuário não encontrado.'); 
            }
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao obter cadastros pendentes.');
        }
    }
}

module.exports = UsuariosController;
