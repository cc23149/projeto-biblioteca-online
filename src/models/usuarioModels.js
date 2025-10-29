const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuarioModels");
require("dotenv").config();

const SECRET = process.env.SECRET;

// Cadastrar usuário
exports.cadastrar = async (req, res) => {
  try {
    const resultado = await Usuario.inserir(req.body);
    res.status(201).json(resultado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.buscarPorEmail(email);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

    const senhaValida = await bcrypt.compare(senha, usuario.SenhaHash);
    if (!senhaValida) return res.status(401).json({ erro: "Senha incorreta" });

    const token = jwt.sign(
      { id: usuario.Id, email: usuario.Email, nome: usuario.Nome },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ sucesso: true, mensagem: "Login realizado com sucesso", token });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
