// ------------------------------------------------------------
// 📂 ARQUIVO: db.js
// 📌 Função: Configurar e gerenciar a conexão com o banco de dados SQL Server
// ------------------------------------------------------------

// Importa o pacote 'mssql', responsável por permitir a conexão e execução de comandos SQL no Node.js
const mssql = require("mssql");

// Importa as variáveis de ambiente definidas no arquivo .env
require("dotenv").config();

// Lê a string de conexão do arquivo .env
// Essa string contém o endereço do servidor, banco de dados, usuário e senha
const stringSQL = process.env.CONNECTION_STRING;

/**
 * 🔧 Função: conectaBD
 * Objetivo: Realizar a conexão com o banco de dados SQL Server
 * 
 * A função é assíncrona porque a conexão pode demorar alguns segundos.
 * Caso a conexão seja bem-sucedida, uma mensagem é exibida no console.
 * Se ocorrer erro, ele será capturado e mostrado.
 */
async function conectaBD() {
  try {
    // Tenta estabelecer a conexão com o banco usando a string de conexão
    await mssql.connect(stringSQL);

    // Se não houver erro, exibe no console uma mensagem de sucesso
    console.log("BD conectado com sucesso.");
  } catch (error) {
    // Caso ocorra qualquer erro (ex: senha errada, servidor offline),
    // ele é mostrado no console com uma mensagem descritiva
    console.error("Erro na conexão com o BD:", error);
  }
}

// Exporta os elementos para que possam ser utilizados em outros arquivos da aplicação
// - conectaBD: função que faz a conexão
// - mssql: objeto para executar consultas SQL
module.exports = { conectaBD, mssql };
