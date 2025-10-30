// ------------------------------------------------------------
// 📂 ARQUIVO: livroModels.js
// 📌 Função: Realizar operações relacionadas à tabela 'Livros' no banco de dados
// ------------------------------------------------------------

// Importa o objeto 'mssql' que permite executar comandos SQL
const { mssql } = require("../config/db");

// ------------------------------------------------------------
// 📘 FUNÇÃO: listar()
// Objetivo: Retornar todos os livros cadastrados na tabela 'Livros'.
// ------------------------------------------------------------
async function listar() {
  // Executa uma consulta SQL que seleciona todos os campos da tabela Livros
  const result = await mssql.query`SELECT * FROM dbo.Livros;`;

  // Retorna o conjunto de registros encontrados (array de objetos)
  return result.recordset;
}

// ------------------------------------------------------------
// 📘 FUNÇÃO: buscarPorTitulo(titulo)
// Objetivo: Buscar livros cujo título contenha uma palavra ou trecho informado.
// ------------------------------------------------------------
async function buscarPorTitulo(titulo) {
  // Usa o operador LIKE com curingas (%) para busca parcial
  const result = await mssql.query`
    SELECT * FROM Livros WHERE Titulo LIKE ${"%" + titulo + "%"}
  `;

  // Retorna os registros encontrados (pode ser mais de um)
  return result.recordset;
}

// ------------------------------------------------------------
// 📘 FUNÇÃO: buscarPorId(id)
// Objetivo: Buscar um livro específico pelo seu ID numérico.
// ------------------------------------------------------------
async function buscarPorId(id) {
  const result = await mssql.query`
    SELECT * FROM Livros WHERE Id = ${id}
  `;

  // Retorna apenas o primeiro registro (ou null, se não existir)
  return result.recordset[0] || null;
}

// ------------------------------------------------------------
// ✉️ EXPORTAÇÃO
// ------------------------------------------------------------

// Exporta as funções para serem utilizadas no controller de livros
module.exports = { listar, buscarPorTitulo, buscarPorId };
