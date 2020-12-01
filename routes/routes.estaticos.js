const express = require('express');
const fs = require('fs');
const estaticosRouter = express.Router();

//Mostrar uma página HTML ao invés de imagem pura!
 estaticosRouter.get('/img/imagem-exemplo', (request, response) => {
    const res = fs.readFileSync(__dirname + '/../assets/id-verification.png');
    response.setHeader('Content-Type', 'image/png');
    response.status(200).send(res);
 });

 estaticosRouter.get('/img/level/:level', (request, response) => {
    const level = request.params.level;
    const res = fs.readFileSync(__dirname + `/../assets/levels/level${level}.png`);
    response.setHeader('Content-Type', 'image/png'); 
    response.status(200).send(res);
 });

module.exports = estaticosRouter;