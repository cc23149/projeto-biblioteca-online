require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { conectaBD } = require("./src/config/db");

const app = express();
const porta = process.env.PORTA || 8081;

app.use(cors({ origin: "*" }));
app.use(express.json());

// conectar BD
conectaBD();

// rotas
const livroRoutes = require("./src/routes/livroRoutes");
app.use("/livros", livroRoutes);

const reservaRoutes = require("./src/routes/reservaRoutes");
app.use("/reservas", reservaRoutes);

const usuarioRoutes = require("./src/routes/usuarioRoutes");
app.use("/usuarios", usuarioRoutes);

// rota raiz
app.get("/", (req, res) => res.json({ mensagem: "Servidor em execução" }));

// iniciar servidor
app.listen(porta, () => console.log(`API rodando na porta ${porta}`));
