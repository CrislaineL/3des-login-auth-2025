
// Importa o módulo que controla as ações relacionadas aos posts (funções para listar, criar, editar posts)
const postsController = require("../controllers/posts");

// Importa o middleware de validação para autenticar usuários antes de permitir acesso às rotas
const validate = require("../middlewares/auth");

// Importa a biblioteca Express para criar rotas e servidores web
const express = require('express');

// Cria um roteador específico para as rotas relacionadas aos posts
const postsRoutes = express.Router();

// Define que ao receber uma requisição GET no caminho '/posts',
// o Express primeiro executa a função 'validate' para validar o usuário autenticado
// e se estiver validado, executa a função 'posts' do postsController para devolver os posts
postsRoutes.get('/posts', validate, postsController.posts);

// Exporta as rotas dos posts para que possam ser usadas em outros arquivos do projeto
module.exports = postsRoutes;
