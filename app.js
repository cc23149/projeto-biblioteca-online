// ------------------------------------------------------------
// 📂 ARQUIVO: app.js
// 📌 Função: Arquivo principal da aplicação (ponto de entrada da API)
// ------------------------------------------------------------

// Importa e inicializa o pacote dotenv, que carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();

// Importa o framework Express, usado para criar e gerenciar o servidor HTTP e rotas da API
const express = require("express");

// Importa o CORS (Cross-Origin Resource Sharing)
// Ele permite que o front-end (HTML/JS) acesse a API mesmo que esteja hospedado em outro domínio ou porta
const cors = require("cors");

// Importa a função de conexão com o banco de dados do arquivo db.js
const { conectaBD } = require("./src/config/db");

// Cria uma instância do aplicativo Express
const app = express();

// Define a porta em que o servidor vai rodar
// Caso a variável PORTA não esteja definida no .env, usa o valor padrão 8081
const porta = process.env.PORTA || 8081;

// ------------------------------------------------------------
// 🧩 CONFIGURAÇÕES BÁSICAS DO SERVIDOR
// ------------------------------------------------------------

// Ativa o CORS para permitir requisições de qualquer origem (*)
// Isso é útil durante o desenvolvimento com front-end local
app.use(cors({ origin: "*" }));

// Permite que a API receba e interprete dados em formato JSON no corpo das requisições
app.use(express.json());

// ------------------------------------------------------------
// 🗄️ CONEXÃO COM O BANCO DE DADOS
// ------------------------------------------------------------

// Executa a função de conexão com o banco ao iniciar o servidor
// Caso o banco não esteja acessível, será exibida uma mensagem de erro no console
conectaBD();

// ------------------------------------------------------------
// 🚏 CONFIGURAÇÃO DAS ROTAS
// ------------------------------------------------------------

// Importa as rotas referentes aos livros (listagem, busca etc.)
const livroRoutes = require("./src/routes/livroRoutes");
app.use("/livros", livroRoutes); // Define o prefixo "/livros" para essas rotas

// Importa as rotas referentes às reservas (cadastrar, listar, excluir)
const reservaRoutes = require("./src/routes/reservaRoutes");
app.use("/reservas", reservaRoutes);

// Importa as rotas referentes aos usuários (cadastro e login)
const usuarioRoutes = require("./src/routes/usuarioRoutes");
app.use("/usuarios", usuarioRoutes);

// ------------------------------------------------------------
// 🌐 ROTA RAIZ
// ------------------------------------------------------------

// Define a rota inicial ("/") que apenas retorna uma mensagem simples em JSON
// Serve para testar rapidamente se a API está rodando
app.get("/", (req, res) => res.json({ mensagem: "Servidor em execução" }));

// ------------------------------------------------------------
// 🚀 INICIALIZAÇÃO DO SERVIDOR
// ------------------------------------------------------------

// Inicia o servidor Express escutando na porta configurada
// Exibe no console a mensagem indicando que o servidor está ativo
app.listen(porta, () => console.log(`API rodando na porta ${porta}`));
