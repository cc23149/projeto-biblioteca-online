// ------------------------------------------------------------
// 📂 ARQUIVO: livroRoutes.js
// 📌 Função: Definir as rotas relacionadas aos livros da biblioteca
// ------------------------------------------------------------

// Importa o Express, framework usado para criar as rotas e o servidor
const express = require("express");

// Cria um objeto Router — ele permite agrupar rotas relacionadas em um mesmo módulo
const router = express.Router();

// Importa o controller de livros, que contém as funções que serão chamadas em cada rota
const livroController = require("../controller/livroController");

// ------------------------------------------------------------
// 📚 ROTAS DE LIVROS
// ------------------------------------------------------------

/**
 * 🔹 Rota: GET /
 * Objetivo: Listar todos os livros cadastrados no banco de dados.
 * Exemplo de uso: GET http://localhost:8081/livros
 */
router.get("/", livroController.listar);

/**
 * 🔹 Rota: GET /id/:id
 * Objetivo: Buscar um livro específico com base no seu ID.
 * Exemplo de uso: GET http://localhost:8081/livros/id/3
 * Obs: o parâmetro ":id" é dinâmico e representa o número do livro.
 */
router.get("/id/:id", livroController.buscarPorId);

/**
 * 🔹 Rota: GET /titulo/:titulo
 * Objetivo: Buscar um livro específico com base no seu título.
 * Exemplo de uso: GET http://localhost:8081/livros/titulo/Harry%20Potter
 * Obs: o título pode ser parte do nome (usa LIKE no SQL).
 */
router.get("/titulo/:titulo", livroController.buscarPorTitulo);

// ------------------------------------------------------------
// ✉️ EXPORTAÇÃO
// ------------------------------------------------------------

// Exporta o objeto router para que o app principal (app.js) possa utilizá-lo
module.exports = router;
