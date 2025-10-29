const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuarioController");

router.post("/", usuarioController.cadastrar);
router.post("/login", usuarioController.login);

module.exports = router;
