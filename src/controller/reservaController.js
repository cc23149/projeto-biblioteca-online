// Importa o model de reservas, responsável pela comunicação com o banco
const Reserva = require("../models/reservaModels");

/**
 * Controlador responsável pelas operações de reserva de livros.
 * As ações possíveis são: reservar, cancelar e listar reservas por usuário.
 */

// 🔹 FAZER UMA NOVA RESERVA
exports.reservar = async (req, res) => {
  try {
    // Desestrutura os dados enviados no corpo da requisição
    const { usuarioId, livroId } = req.body;

    // Chama o model para realizar a reserva no banco
    const resultado = await Reserva.reservar(usuarioId, livroId);

    // Retorna status 201 (criado com sucesso) e o resultado da reserva
    res.status(201).json(resultado);
  } catch (err) {
    // Retorna erro interno, caso algo dê errado no processo
    res.status(500).json({ erro: err.message });
  }
};

// 🔹 CANCELAR UMA RESERVA EXISTENTE
exports.cancelar = async (req, res) => {
  try {
    // Pega o ID da reserva a ser cancelada a partir da URL (ex: /reservas/10)
    const { id } = req.params;

    // Chama o model para excluir a reserva no banco de dados
    const resultado = await Reserva.cancelar(id);

    // Retorna o resultado da operação (mensagem de sucesso)
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// 🔹 LISTAR TODAS AS RESERVAS DE UM USUÁRIO
exports.listarReservas = async (req, res) => {
  try {
    // Pega o ID do usuário via query string (ex: /reservas?usuarioId=5)
    const { usuarioId } = req.query;

    // Busca todas as reservas feitas por esse usuário
    const reservas = await Reserva.listarPorUsuario(usuarioId);

    // Retorna a lista em formato JSON
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
