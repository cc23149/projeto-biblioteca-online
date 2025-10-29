const express = require("express");
const router = express.Router();
const reservaController = require("../controller/reservaController");
const { autenticar } = require("../services/auth");

router.post("/", autenticar, reservaController.reservar);
router.delete("/:id", autenticar, reservaController.cancelar);
router.get("/", autenticar, reservaController.listarReservas);

module.exports = router;
