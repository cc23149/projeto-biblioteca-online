// ------------------------------------------------------------
// 📂 ARQUIVO: reservaModels.js
// 📌 Função: Controlar as operações de reserva de livros no banco de dados
// ------------------------------------------------------------

// Importa o objeto mssql para executar consultas e comandos SQL
const { mssql } = require("../config/db");

// ------------------------------------------------------------
// 📕 FUNÇÃO: reservar(usuarioId, livroId)
// Objetivo: Inserir uma nova reserva na tabela 'Reservas'.
// ------------------------------------------------------------
async function reservar(usuarioId, livroId) {
  // Cria um novo objeto Request (recomendado para queries com parâmetros)
  const request = new mssql.Request();

  // Define os parâmetros de entrada da query (para evitar SQL Injection)
  await request
    .input("usuarioId", mssql.Int, usuarioId)
    .input("livroId", mssql.Int, livroId)
    .query(`
      INSERT INTO Reservas (UsuarioId, LivroId)
      VALUES (@usuarioId, @livroId)
    `);

  // Retorna uma mensagem de sucesso
  return { sucesso: true, mensagem: "Reserva feita com sucesso" };
}

// ------------------------------------------------------------
// 📕 FUNÇÃO: cancelar(id)
// Objetivo: Atualizar o status de uma reserva para "cancelada".
// ------------------------------------------------------------
async function cancelar(id) {
  const request = new mssql.Request();

  // Atualiza o campo 'Status' da reserva com base no seu ID
  await request
    .input("id", mssql.Int, id)
    .query(`
      UPDATE Reservas SET Status = 'cancelada' WHERE Id = @id
    `);

  // Retorna uma mensagem de confirmação
  return { sucesso: true, mensagem: "Reserva cancelada com sucesso" };
}

// ------------------------------------------------------------
// 📕 FUNÇÃO: listarPorUsuario(usuarioId)
// Objetivo: Retornar todas as reservas feitas por um determinado usuário.
// ------------------------------------------------------------
async function listarPorUsuario(usuarioId) {
  const request = new mssql.Request();

  // Define o ID do usuário como parâmetro da consulta
  await request.input("UsuarioId", mssql.Int, usuarioId);

  // Faz um JOIN entre as tabelas Reservas e Livros para trazer dados completos
  const result = await request.query(`
    SELECT r.Id, l.Titulo, l.ISBN, r.DataReserva, r.Status
    FROM Reservas r
    JOIN Livros l ON r.LivroId = l.Id
    WHERE r.UsuarioId = @UsuarioId
  `);

  // Retorna a lista de reservas do usuário
  return result.recordset;
}

// ------------------------------------------------------------
// ✉️ EXPORTAÇÃO
// ------------------------------------------------------------

// Exporta as funções para o controller de reservas
module.exports = { reservar, cancelar, listarPorUsuario };
