const estaticosRouter = require('./routes.estaticos.js');
const sistemaRouter = require('./routes.sistema.js');
const usuariosRouter = require('./routes.usuarios.js');
const publicacoesRouter = require('./routes.publicacoes.js');

/** Aqui declaramos nossas rotas */
const router = (app, static) => {
    // Rotas
    app.use('/api/v1/estaticos/', estaticosRouter);
    app.use('/api/v1/sistema', sistemaRouter);
    app.use('/api/v1/usuarios', usuariosRouter);
    app.use('/api/v1/publicacoes', publicacoesRouter);
};

module.exports  = router;