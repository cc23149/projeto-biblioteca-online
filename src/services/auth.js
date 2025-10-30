// Importa a biblioteca JSON Web Token, usada para gerar e validar tokens de autenticação
const jwt = require("jsonwebtoken");

// Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();

// Obtém a chave secreta usada para verificar a autenticidade do token JWT
const SECRET = process.env.SECRET;

/**
 * Middleware de autenticação.
 * Essa função é executada antes das rotas protegidas para verificar
 * se o usuário enviou um token JWT válido no cabeçalho da requisição.
 */
function autenticar(req, res, next) {
  // Recupera o cabeçalho de autorização (Authorization: Bearer <token>)
  const authHeader = req.headers["authorization"];

  // Se o cabeçalho não existir, o usuário não enviou o token
  if (!authHeader) return res.status(401).json({ erro: "Token não fornecido" });

  // Divide o cabeçalho em duas partes: "Bearer" e o próprio token
  const [bearer, token] = authHeader.split(" ");

  // Se o token não estiver presente, retorna erro
  if (!token) return res.status(401).json({ erro: "Token não fornecido" });

  // Verifica a validade do token com a chave secreta
  jwt.verify(token, SECRET, (err, usuario) => {
    // Caso o token seja inválido ou tenha expirado
    if (err) return res.status(403).json({ erro: "Token inválido ou expirado" });

    // Armazena os dados do usuário decodificados no objeto da requisição
    req.usuario = usuario;

    // Passa a execução para a próxima função (rota protegida)
    next();
  });
}

// Exporta a função para ser usada nas rotas protegidas
module.exports = { autenticar };
