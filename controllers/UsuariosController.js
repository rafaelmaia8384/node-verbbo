const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validarCpf = require('validar-cpf');
const db = require('../models/index.js');
const config = require('../config/config.js');
const ServerResponse = require('../helpers/ServerResponse.js');
const storage = require('../helpers/StorageHelper.js');
const Op = db.Sequelize.Op;

class UsuariosController {

    static getToken(id_usuario) {
        const token = jwt.sign({
            id_usuario: id_usuario,
        }, config.tokenKey, {
            expiresIn: '365d'
        });
        return token;
    }

    static async cadastrarUsuario(request, response) {
        try {
            const cpf = request.body.publicante_cpf.replace(/\D/g,'');
            if (validarCpf(cpf)) {
                const usuario = await db.usuarios.findOne({ where: { publicante_cpf: cpf } });
                if (usuario) {
                    ServerResponse.error(response, 'O CPF informado já está cadastrado no sistema.');    
                }
                else {
                    const id_usuario = uuid();
                    const dataNascimento = request.body.publicante_data_nascimento.split('/').reverse().join('-') + ' 00:00:00';
                    const dataParts = request.body.publicante_data_nascimento.split('/');
                    if (dataParts[0] == 0 || dataParts[0] > 31 || dataParts[1] == 0 || dataParts[1] > 12 || dataParts[2] < 1920 || dataParts[2] > 2020) {
                        ServerResponse.error(response, 'Data de nascimento inválida.');    
                        return;
                    }
                    const path_image = id_usuario + '.' + uuid() + '.jpg';
                    request.body.id = id_usuario;
                    request.body.path_image = path_image;
                    request.body.publicante_nome = request.body.publicante_nome.replace(/\s\s+/g, ' ');
                    request.body.publicante_nome_completo = request.body.publicante_nome_completo.replace(/\s\s+/g, ' ');
                    request.body.publicante_resumo = request.body.publicante_resumo.replace(/\s\s+/g, ' ');
                    request.body.publicante_cpf = cpf;
                    request.body.publicante_data_nascimento = dataNascimento;
                    request.body.publicante_telefone = request.body.publicante_telefone.replace(/\D/g,'');
                    request.body.senha_hash = crypto.createHash('md5').update(request.body.senha_hash).digest('hex');
                    const signedUrl = storage.getUploadUrl(path_image);
                    await db.usuarios.create(request.body);
                    ServerResponse.success(response, 'Usuário cadastrado.', [ { signedUrls: [ signedUrl, ], } ]);
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
                where: { email: email, senha_hash: senha, }, 
                attributes: { exclude: ['senha_hash'], },
                include: [ 
                    { model: db.portais, as: 'portais', },
                ]
            });
            if (usuario) {
                usuario.setDataValue('token', UsuariosController.getToken(usuario.id));
                ServerResponse.success(response, 'Login efetuado.', [ usuario ]);
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

    static async atualizarPerfil(request, response) {
        try {
            const path_image = request.usuario.id_usuario + '.' + uuid() + '.jpg';
            const nome = request.body.publicante_nome.replace(/\s\s+/g, ' ');
            const resumo = request.body.publicante_resumo.replace(/\s\s+/g, ' ');
            const telefone = request.body.publicante_telefone = request.body.publicante_telefone.replace(/\D/g,'');
            const signedUrls = request.body.path_image ? [ storage.getUploadUrl(path_image) ] : [];
            await db.usuarios.update({ 
                publicante_nome: nome, 
                publicante_resumo: resumo,
                publicante_telefone: telefone,
                path_image: path_image,
            }, {
                where: { id: request.usuario.id_usuario, }
            });
            const usuario = await db.usuarios.findOne({ where: { id: request.usuario.id_usuario, } });
            ServerResponse.success(response, 'Perfil atualizado.', [ { signedUrls: signedUrls, }, usuario, ]);
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
                ServerResponse.success(response, 'Senha alterada.');
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
}

module.exports = UsuariosController;
