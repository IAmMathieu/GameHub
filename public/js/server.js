const express = require('express');
const router = require('./router')
const path = require('path')
const port = 3000;

// declaré mais non utilisé car express sait ou trouver le module installé npm install ejs
const ejs = require('ejs');

const server = express();

server.set('view engine', 'ejs');

// configuration pour utiliser un moteur de template / view engine
server.set('view engine', 'ejs');
const pathToViews = path.resolve(__dirname, '../../views');
//je configure mon serveur pour aller les chercher dans le bon dossier
server.set('views', pathToViews);


// le chemin absolu vers le dossier contenant les fichiers statiques à servir
const pathToStaticDirectory = path.resolve(__dirname, '../../public');
// de quoi servir tous les fichiers
const allStaticFiles = express.static(pathToStaticDirectory);
// on configure le serveur pour servir les fichiers du dossier configuré au dessus
server.use(allStaticFiles);

server.use(router);



server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  });
  
module.exports = server;
