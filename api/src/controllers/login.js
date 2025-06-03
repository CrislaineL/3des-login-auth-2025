/* jsonwebtoken: biblioteca usada para gerar e verificar tokens JWT.
crypto: módulo nativo do Node.js usado aqui para gerar um ID aleatório com randomUUID(). */
const jsonwebtoken = require("jsonwebtoken");
const crypto = require('node:crypto');

//Extrai user e psw (usuário e senha) do corpo da requisição.
const Login = (req, res) => {
    const { user, psw } = req.body;
    
    try {
        //Validação simples, comparando com valores fixos (não busca em banco de dados).
        // Se o e-mail ou senha estiverem errados, retorna erro 401 Unauthorized.
        const correctPassword = ((user === "usuario@gmail.com") && (psw === "a1b2@b3c4"));

        if(!correctPassword) res.status(401).send({message:'E-mail or Password incorrect !'});

        /*Gera um token assinado com:
Payload: dados do usuário (ID aleatório, nome e avatar).
Chave secreta (process.env.SECRET_JWT): define a segurança do token.
Validade: 2 minutos (expiresIn: "2min").*/ 
        const token = jsonwebtoken.sign(
            {
                id: crypto.randomUUID(),
                name: "Fulano da Silva",
                avatar: "https://cdn-icons-png.flaticon.com/128/1326/1326377.png"
            },
            process.env.SECRET_JWT,
            { expiresIn: "2min" }
        );

        //Envia o token como resposta em JSON.
        // O .end() finaliza a resposta.
        res.status(200).json({ token : token }).end();
    }catch(err) {
        //Em caso de erro inesperado (ex: variável mal definida, falha na geração do token), retorna erro 500.
        res.status(500).send(err).end();
    }
    
    res.status(200).end();
};

module.exports = {
    Login
}
