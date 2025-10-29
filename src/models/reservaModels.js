const { mssql } = require("../config/db");

// Fazer reserva
async function reservar(usuarioId, livroId) {
  await mssql.query`
    INSERT INTO Reservas (UsuarioId, LivroId)
    VALUES (${usuarioId}, ${livroId})
  `;
  return { sucesso: true, mensagem: "Reserva feita com sucesso" };
}

// Cancelar reserva
async function cancelar(id) {
  await mssql.query`
    UPDATE Reservas SET Status = 'cancelada' WHERE Id = ${id}
  `;
  return { sucesso: true, mensagem: "Reserva cancelada com sucesso" };
}

// Listar reservas de um usuário
async function listarPorUsuario(usuarioId) {
  const result = await mssql.query`
    SELECT r.Id, l.Titulo, r.DataReserva, r.Status
    FROM Reservas r
    JOIN Livros l ON r.LivroId = l.Id
    WHERE r.UsuarioId = ${usuarioId}
  `;
  return result.recordset;
}

module.exports = { reservar, cancelar, listarPorUsuario };
