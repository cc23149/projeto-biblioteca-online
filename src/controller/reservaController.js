const Reserva = require("../models/reservaModels");

// Fazer reserva
exports.reservar = async (req, res) => {
  try {
    const { usuarioId, livroId } = req.body;
    const resultado = await Reserva.reservar(usuarioId, livroId);
    res.status(201).json(resultado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Cancelar reserva
exports.cancelar = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Reserva.cancelar(id);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// 🔹 Listar reservas por usuário
exports.listarReservas = async (req, res) => {
  try {
    const { usuarioId } = req.query;
    const reservas = await Reserva.listarPorUsuario(usuarioId);
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
