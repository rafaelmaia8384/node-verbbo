const fs = require('fs');
const usuariosRouter = require('./routes.usuarios.js');
const portaisRouter = require('./routes.portais.js');

/** Aqui declaramos nossas rotas */
const router = (app, static) => {
    // Rotas
    app.use('/api/v1/usuarios', usuariosRouter);
    app.use('/api/v1/portais', portaisRouter);
};

module.exports  = router;