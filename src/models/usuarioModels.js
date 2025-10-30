// src/models/usuarioModels.js
const { mssql } = require("../config/db");
const bcrypt = require("bcryptjs");

async function buscarPorEmail(email) {
  const result = await mssql.query`SELECT * FROM Usuarios WHERE Email = ${email}`;
  return result.recordset[0];
}

async function inserir(usuario) {
  const { nome, email, senha } = usuario;
  const senhaHash = await bcrypt.hash(senha, 10);
  await mssql.query`
    INSERT INTO Usuarios (Nome, Email, SenhaHash)
    VALUES (${nome}, ${email}, ${senhaHash})
  `;
  return { mensagem: "Usuário cadastrado com sucesso" };
}

module.exports = { buscarPorEmail, inserir };
