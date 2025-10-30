const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuarioModels");
require("dotenv").config();

const SECRET = process.env.SECRET;

// Cadastro de usuário
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

    if (!email || !senha) {
      return res.status(400).json({ erro: "Preencha todos os campos" });
    }

    const usuario = await Usuario.buscarPorEmail(email);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.SenhaHash);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: usuario.Id, email: usuario.Email, nome: usuario.Nome },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ mensagem: "Login realizado com sucesso", token });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
