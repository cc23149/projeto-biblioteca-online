const { mssql } = require("../config/db");

// Fazer reserva
async function reservar(usuarioId, livroId) {
  const request = new mssql.Request();
  await request
    .input("usuarioId", mssql.Int, usuarioId)
    .input("livroId", mssql.Int, livroId)
    .query(`
      INSERT INTO Reservas (UsuarioId, LivroId)
      VALUES (@usuarioId, @livroId)
    `);
  return { sucesso: true, mensagem: "Reserva feita com sucesso" };
}

// Cancelar reserva
async function cancelar(id) {
  const request = new mssql.Request();
  await request
    .input("id", mssql.Int, id)
    .query(`
      UPDATE Reservas SET Status = 'cancelada' WHERE Id = @id
    `);
  return { sucesso: true, mensagem: "Reserva cancelada com sucesso" };
}

// Listar reservas de um usuário
async function listarPorUsuario(usuarioId) {
  const request = new mssql.Request();
  const result = await request
    .input("usuarioId", mssql.Int, usuarioId)
    .query(`
      SELECT r.Id, l.Titulo, r.DataReserva, r.Status
      FROM Reservas r
      JOIN Livros l ON r.LivroId = l.Id
      WHERE r.UsuarioId = @usuarioId
    `);
  return result.recordset;
}

module.exports = { reservar, cancelar, listarPorUsuario };
