const jsonwebtoken = require("jsonwebtoken"); //Importa a biblioteca jsonwebtoken, usada para criar e verificar tokens JWT.

const validate = (req, res, next) => { //validate é um middleware — uma função que intercepta a requisição antes que ela chegue à rota.
    const token  = req.headers.authorization?.split(" ")[1];//Tenta pegar o token do cabeçalho Authorization 
    /*split(" ")[1] separa a string por espaço e pega a segunda parte (o token em si).
O operador ?. evita erro se authorization não estiver presente.*/

    if(!token) res.status(401).send({message : "Access Denied. No token provided."}).end(); //Se o token não foi enviado, retorna erro 401 (Não autorizado).
//end() finaliza a resposta.
    
    try {
        const payload = jsonwebtoken.verify(token, process.env.SECRET_JWT); //Verifica a validade do token usando a chave secreta definida no .env, Se o token for válido, payload conterá os dados originais (como o ID do usuário).

        req.headers['user'] = payload;//Salva os dados do usuário no cabeçalho da requisição, tornando-os acessíveis em rotas futuras (embora o mais comum seja usar req.user).

        next(); //Se tudo estiver certo, o middleware chama next(), permitindo que a rota protegida execute normalmente.
    }catch(err) {
        res.status(500).send(err).end();//Se o token for inválido (expirado, corrompido, etc.), envia erro 500 com detalhes.
    }
}
/*Permite importar esse middleware em outros arquivos, por exemplo
   const validate = require('./middlewares/validate');
   app.use('/posts', validate, postsRoutes);*/
module.exports = validate;
