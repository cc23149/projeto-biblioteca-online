const Livro = require("../models/livroModels");

// Listar todos os livros
exports.listar = async (req, res) => {
  try {
    const livros = await Livro.listar();
    res.json(livros);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Buscar por título
exports.buscarPorTitulo = async (req, res) => {
  try {
    const { titulo } = req.params;
    const livros = await Livro.buscarPorTitulo(titulo);

    if (livros.length === 0)
      return res.status(404).json({ mensagem: "Nenhum livro encontrado." });

    res.json(livros);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Buscar livro por ID
exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const livro = await Livro.buscarPorId(id);

    if (!livro)
      return res.status(404).json({ mensagem: "Livro não encontrado." });

    res.json(livro);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
