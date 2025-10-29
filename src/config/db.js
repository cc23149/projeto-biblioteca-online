const mssql = require("mssql");
require("dotenv").config();

const stringSQL = process.env.CONNECTION_STRING;

async function conectaBD() {
  try {
    await mssql.connect(stringSQL);
    console.log("BD conectado com sucesso.");
  } catch (error) {
    console.error("Erro na conexão com o BD:", error);
  }
}

module.exports = { conectaBD, mssql };
