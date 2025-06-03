/*Aqui ele importa os dados de um arquivo chamado posts.js que está na pasta data.
Esse arquivo deve exportar um array de objetos (como o que você mostrou antes com title, summary, etc.).*/ 
const dataPosts = require("../data/posts");
/* Essa função:
Recebe uma requisição HTTP (req) e uma resposta HTTP (res);
Retorna:
Status 200 (OK);
O conteúdo da variável dataPosts como corpo da resposta;
E finaliza a resposta com .end().*/
const posts = (req, res) => {
    res.status(200).send(dataPosts).end();
}//Torna a função posts disponível para ser usada em outros arquivos (por exemplo, nas rotas).
module.exports = {
    posts
}
