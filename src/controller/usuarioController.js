// Importação dos módulos necessários
const jwt = require("jsonwebtoken"); // Biblioteca para gerar tokens de autenticação (JWT)
const bcrypt = require("bcryptjs"); // Biblioteca para criptografar e comparar senhas
const Usuario = require("../models/usuarioModels"); // Model de usuários
require("dotenv").config(); // Carrega variáveis do arquivo .env

// Obtém a chave secreta usada para assinar o token JWT
const SECRET = process.env.SECRET;

/**
 * Controlador responsável pelas operações com usuários.
 * Inclui cadastro, login e autenticação via JWT.
 */

// 🔹 CADASTRO DE USUÁRIO
exports.cadastrar = async (req, res) => {
  try {
    // Envia os dados recebidos da requisição para o model inserir no banco
    const resultado = await Usuario.inserir(req.body);

    // Retorna status 201 (criado com sucesso)
    res.status(201).json(resultado);
  } catch (err) {
    // Caso ocorra erro durante o cadastro
    res.status(500).json({ erro: err.message });
  }
};

// 🔹 LOGIN DE USUÁRIO
exports.login = async (req, res) => {
  try {
    // Pega os dados enviados no corpo da requisição
    const { email, senha } = req.body;

    // Validação: todos os campos devem ser preenchidos
    if (!email || !senha) {
      return res.status(400).json({ erro: "Preencha todos os campos" });
    }

    // Busca o usuário no banco de dados pelo e-mail informado
    const usuario = await Usuario.buscarPorEmail(email);

    // Caso o e-mail não esteja cadastrado
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    // Compara a senha informada com o hash armazenado no banco
    const senhaValida = await bcrypt.compare(senha, usuario.SenhaHash);

    // Caso a senha esteja incorreta
    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }

    // Gera o token JWT que será usado para autenticar o usuário nas próximas requisições
    const token = jwt.sign(
      {
        id: usuario.Id, // ID do usuário
        email: usuario.Email, // E-mail do usuário
        nome: usuario.Nome, // Nome do usuário
      },
      SECRET, // Chave secreta para assinatura do token
      { expiresIn: "1h" } // Token expira em 1 hora
    );

    // Retorna mensagem de sucesso e o token para o usuário
    res.json({ mensagem: "Login realizado com sucesso", token });
  } catch (err) {
    // Tratamento de erro genérico
    res.status(500).json({ erro: err.message });
  }
};
