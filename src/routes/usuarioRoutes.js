// ------------------------------------------------------------
// 📂 ARQUIVO: usuarioRoutes.js
// 📌 Função: Definir as rotas relacionadas aos usuários (cadastro e login)
// ------------------------------------------------------------

// Importa o Express e cria um roteador
const express = require("express");
const router = express.Router();

// Importa o controller responsável pela lógica de usuários
const usuarioController = require("../controller/usuarioController");

// ------------------------------------------------------------
// 👤 ROTAS DE USUÁRIOS
// ------------------------------------------------------------

/**
 * 🔹 Rota: POST /
 * Objetivo: Cadastrar um novo usuário no sistema.
 * Exemplo: POST http://localhost:8081/usuarios
 * Corpo esperado (JSON):
 * {
 *   "nome": "João Silva",
 *   "email": "joao@email.com",
 *   "senha": "123456"
 * }
 */
router.post("/", usuarioController.cadastrar);

/**
 * 🔹 Rota: POST /login
 * Objetivo: Realizar o login de um usuário existente.
 * Caso o login seja bem-sucedido, o sistema gera um token JWT.
 * Exemplo: POST http://localhost:8081/usuarios/login
 * Corpo esperado (JSON):
 * {
 *   "email": "joao@email.com",
 *   "senha": "123456"
 * }
 */
router.post("/login", usuarioController.login);

// ------------------------------------------------------------
// ✉️ EXPORTAÇÃO
// ------------------------------------------------------------

// Exporta o roteador para ser utilizado no arquivo principal da aplicação (app.js)
module.exports = router;
