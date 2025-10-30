// Importa o model responsável por lidar com o banco de dados dos livros
const Livro = require("../models/livroModels");

/**
 * Controlador responsável por gerenciar as requisições relacionadas aos livros.
 * Aqui ficam apenas as regras de controle (entrada e saída), enquanto
 * a lógica de acesso ao banco está no model.
 */

// 🔹 LISTAR TODOS OS LIVROS
exports.listar = async (req, res) => {
  try {
    // Chama o método do model que busca todos os livros no banco de dados
    const livros = await Livro.listar();
    // Retorna o resultado em formato JSON
    res.json(livros);
  } catch (err) {
    // Caso ocorra um erro, retorna código 500 (erro interno do servidor)
    res.status(500).json({ erro: err.message });
  }
};

// 🔹 BUSCAR LIVROS POR TÍTULO
exports.buscarPorTitulo = async (req, res) => {
  try {
    // Extrai o parâmetro 'titulo' da URL (ex: /livros/titulo/Harry)
    const { titulo } = req.params;
    // Busca os livros que contêm esse título
    const livros = await Livro.buscarPorTitulo(titulo);

    // Se nenhum livro for encontrado, retorna erro 404
    if (livros.length === 0)
      return res.status(404).json({ mensagem: "Nenhum livro encontrado." });

    // Retorna o(s) livro(s) encontrados
    res.json(livros);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// 🔹 BUSCAR LIVRO POR ID
exports.buscarPorId = async (req, res) => {
  try {
    // Extrai o parâmetro 'id' da URL (ex: /livros/id/3)
    const { id } = req.params;
    // Chama o model para buscar o livro pelo ID
    const livro = await Livro.buscarPorId(id);

    // Caso não exista um livro com o ID informado
    if (!livro)
      return res.status(404).json({ mensagem: "Livro não encontrado." });

    // Retorna o livro encontrado
    res.json(livro);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
