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
  await request.input("UsuarioId", mssql.Int, usuarioId);
  const result = await request.query(`
    SELECT r.Id, l.Titulo, l.ISBN, r.DataReserva, r.Status
    FROM Reservas r
    JOIN Livros l ON r.LivroId = l.Id
    WHERE r.UsuarioId = @UsuarioId
  `);
  return result.recordset;
}

module.exports = { reservar, cancelar, listarPorUsuario };
