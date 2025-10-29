const express = require("express");
const router = express.Router();
const livroController = require("../controller/livroController");

// Listar todos os livros
router.get("/", livroController.listar);

// Buscar livro por ID
router.get("/id/:id", livroController.buscarPorId);

// Buscar livro por título
router.get("/titulo/:titulo", livroController.buscarPorTitulo);

module.exports = router;
