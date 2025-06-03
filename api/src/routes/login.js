// Importa o módulo que controla as ações relacionadas ao login (funções para verificar usuário e senha)
const loginController = require('../controllers/login');

// Importa a biblioteca Express para criar rotas e servidores web
const express = require('express');

// Cria um roteador específico para as rotas relacionadas ao login
const loginRoutes = express.Router();

// Define que ao receber uma requisição POST no caminho '/login',
// o Express deve executar a função Login do loginController
loginRoutes.post('/login', loginController.Login);

// Exporta as rotas de login para que possam ser usadas em outros arquivos do projeto
module.exports = loginRoutes;
