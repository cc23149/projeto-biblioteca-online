const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;

function autenticar(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ erro: "Token não fornecido" });

  const [bearer, token] = authHeader.split(" ");
  if (!token) return res.status(401).json({ erro: "Token não fornecido" });

  jwt.verify(token, SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ erro: "Token inválido ou expirado" });
    req.usuario = usuario; // usuário decodificado do token
    next();
  });
}

module.exports = { autenticar };
