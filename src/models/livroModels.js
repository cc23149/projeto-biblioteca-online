const { mssql } = require("../config/db");

// Listar todos os livros
async function listar() {
  const result = await mssql.query`SELECT * FROM dbo.Livros;`;
  return result.recordset;
}

// Buscar livros por título
async function buscarPorTitulo(titulo) {
  const result = await mssql.query`
    SELECT * FROM Livros WHERE Titulo LIKE ${"%" + titulo + "%"}
  `;
  return result.recordset;
}

// Buscar livro por ID
async function buscarPorId(id) {
  const result = await mssql.query`
    SELECT * FROM Livros WHERE Id = ${id}
  `;
  // Retorna apenas o primeiro resultado (ou null)
  return result.recordset[0] || null;
}

module.exports = { listar, buscarPorTitulo, buscarPorId };
