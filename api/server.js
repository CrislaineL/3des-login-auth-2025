require("dotenv").config(); //Carrega variáveis de ambiente do arquivo .env para process.env.
const express = require('express'); //Objetivo: Importa o framework Express, que facilita a criação de servidores web e APIs RESTful em Node.js.
const app = express(); // Objetivo: Inicializa o aplicativo Express. app é a instância principal que será usada para definir rotas, middlewares e iniciar o servidor.

const port = 3000; //Define a porta na qual o servidor irá escutar. 

const loginRoutes = require('./src/routes/login'); //Objetivo: Importa dois arquivos de rotas personalizadas:
const postsRoutes = require('./src/routes/posts');

//Objetivo: Middleware que permite ao Express entender requisições com corpo em JSON (Content-Type: application/json).
app.use(express.json());

//Objetivo: Diz ao Express para usar as rotas importadas.
app.use(loginRoutes); 
app.use(postsRoutes);

//Objetivo: Inicia o servidor na porta definida (3000 neste caso).
O console.log confirma no terminal que o servidor está rodando.
app.listen(port, () => {
    console.log('listening on ' + port);
})
