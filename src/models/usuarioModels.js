// ------------------------------------------------------------
// 📂 ARQUIVO: usuarioModels.js
// 📌 Função: Gerenciar as operações com usuários (tabela 'Usuarios')
// ------------------------------------------------------------

// Importa o objeto 'mssql' para executar comandos SQL
const { mssql } = require("../config/db");

// Importa o 'bcrypt' para gerar hash das senhas (segurança)
const bcrypt = require("bcryptjs");

// ------------------------------------------------------------
// 👤 FUNÇÃO: buscarPorEmail(email)
// Objetivo: Localizar um usuário pelo seu e-mail (único no sistema).
// ------------------------------------------------------------
async function buscarPorEmail(email) {
  const result = await mssql.query`
    SELECT * FROM Usuarios WHERE Email = ${email}
  `;

  // Retorna o primeiro resultado (ou undefined se não encontrar)
  return result.recordset[0];
}

// ------------------------------------------------------------
// 👤 FUNÇÃO: inserir(usuario)
// Objetivo: Inserir um novo usuário na tabela 'Usuarios'.
// ------------------------------------------------------------
async function inserir(usuario) {
  // Extrai os campos do objeto recebido
  const { nome, email, senha } = usuario;

  // Gera um hash seguro da senha (10 rounds de criptografia)
  const senhaHash = await bcrypt.hash(senha, 10);

  // Insere o novo usuário no banco de dados
  await mssql.query`
    INSERT INTO Usuarios (Nome, Email, SenhaHash)
    VALUES (${nome}, ${email}, ${senhaHash})
  `;

  // Retorna uma mensagem de sucesso
  return { mensagem: "Usuário cadastrado com sucesso" };
}

// ------------------------------------------------------------
// ✉️ EXPORTAÇÃO
// ------------------------------------------------------------

// Exporta as funções para o controller de usuários
module.exports = { buscarPorEmail, inserir };
