// ------------------------------------------------------------
// 📂 ARQUIVO: reservaRoutes.js
// 📌 Função: Definir as rotas relacionadas às reservas de livros
// ------------------------------------------------------------

// Importa o Express e cria um roteador
const express = require("express");
const router = express.Router();

// Importa o controller que contém a lógica das operações de reserva
const reservaController = require("../controller/reservaController");

// Importa o middleware de autenticação
// Ele garante que apenas usuários logados possam realizar, listar ou cancelar reservas
const { autenticar } = require("../services/auth");

// ------------------------------------------------------------
// 📚 ROTAS DE RESERVAS
// ------------------------------------------------------------

/**
 * 🔹 Rota: POST /
 * Objetivo: Criar uma nova reserva de livro.
 * Requer autenticação (usuário logado com token válido).
 * Exemplo: POST http://localhost:8081/reservas
 */
router.post("/", autenticar, reservaController.reservar);

/**
 * 🔹 Rota: DELETE /:id
 * Objetivo: Cancelar uma reserva específica com base no ID.
 * Requer autenticação.
 * Exemplo: DELETE http://localhost:8081/reservas/2
 */
router.delete("/:id", autenticar, reservaController.cancelar);

/**
 * 🔹 Rota: GET /
 * Objetivo: Listar todas as reservas feitas pelo usuário logado.
 * Requer autenticação.
 * Exemplo: GET http://localhost:8081/reservas
 */
router.get("/", autenticar, reservaController.listarReservas);

// ------------------------------------------------------------
// ✉️ EXPORTAÇÃO
// ------------------------------------------------------------

// Exporta o roteador para ser usado no arquivo principal (app.js)
module.exports = router;
