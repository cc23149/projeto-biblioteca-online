// URL base da API
const API = "http://localhost:8081";

// Recupera as informações do usuário e o token do localStorage
const usuario = JSON.parse(localStorage.getItem("usuario"));
const token = localStorage.getItem("token");

// Quando a página é carregada, busca os livros
document.addEventListener("DOMContentLoaded", carregarLivros);

// 🔹 Função para listar todos os livros
async function carregarLivros() {
  try {
    const resposta = await fetch(`${API}/livros`);
    const livros = await resposta.json();

    const corpoTabela = document.getElementById("corpoTabela");
    corpoTabela.innerHTML = "";

    // Caso não haja livros cadastrados
    if (!livros.length) {
      corpoTabela.innerHTML = "<tr><td colspan='6'>Nenhum livro encontrado.</td></tr>";
      return;
    }

    // Cria dinamicamente as linhas da tabela com os livros
    livros.forEach(livro => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${livro.Titulo}</td>
        <td>${livro.Autor}</td>
        <td>${livro.Genero || "-"}</td>
        <td>${livro.AnoPublicacao || "-"}</td>
        <td>${livro.Disponivel ? "Sim" : "Não"}</td>
        <td>
          ${
            livro.Disponivel
              ? `<button class="reservar" onclick="reservar(${livro.Id})">Reservar</button>`
              : `<button class="cancelar" onclick="cancelarReserva(${livro.Id})">Cancelar</button>`
          }
        </td>
      `;
      corpoTabela.appendChild(linha);
    });
  } catch {
    mostrarMensagem("Erro ao carregar livros.", true);
  }
}

// 🔹 Buscar livros por título
async function buscarLivro() {
  const titulo = document.getElementById("tituloBusca").value.trim();

  if (!titulo) {
    mostrarMensagem("Digite um título para buscar.", true);
    return;
  }

  try {
    const resposta = await fetch(`${API}/livros/titulo/${encodeURIComponent(titulo)}`);

    if (!resposta.ok) {
      mostrarMensagem("Livro não encontrado.", true);
      return;
    }

    const livros = await resposta.json();
    const corpoTabela = document.getElementById("corpoTabela");
    corpoTabela.innerHTML = "";

    if (!livros.length) {
      corpoTabela.innerHTML = "<tr><td colspan='6'>Nenhum livro encontrado.</td></tr>";
      return;
    }

    livros.forEach(livro => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${livro.Titulo}</td>
        <td>${livro.Autor}</td>
        <td>${livro.Genero || "-"}</td>
        <td>${livro.AnoPublicacao || "-"}</td>
        <td>${livro.Disponivel ? "Sim" : "Não"}</td>
        <td>
          ${livro.Disponivel
            ? `<button class="reservar" onclick="reservar(${livro.Id})">Reservar</button>`
            : `<button class="cancelar" onclick="cancelarReserva(${livro.Id})">Cancelar</button>`}
        </td>
      `;
      corpoTabela.appendChild(linha);
    });
  } catch {
    mostrarMensagem("Erro ao buscar livro.", true);
  }
}

// 🔹 Reservar um livro
async function reservar(livroId) {
  if (!token) {
    alert("Você precisa fazer login para reservar.");
    window.location.href = "login.html";
    return;
  }

  try {
    const resposta = await fetch(`${API}/reservas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ usuarioId: usuario.id, livroId })
    });

    const dados = await resposta.json();
    mostrarMensagem(dados.mensagem || "Reserva realizada com sucesso!");
    carregarLivros();
  } catch {
    mostrarMensagem("Erro ao reservar livro.", true);
  }
}

// 🔹 Cancelar uma reserva
async function cancelarReserva(livroId) {
  if (!token) {
    alert("Você precisa estar logado.");
    return;
  }

  try {
    const resposta = await fetch(`${API}/reservas/${livroId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    const dados = await resposta.json();
    mostrarMensagem(dados.mensagem || "Reserva cancelada.");
    carregarLivros();
  } catch {
    mostrarMensagem("Erro ao cancelar reserva.", true);
  }
}

// 🔹 Exibir mensagens de feedback
function mostrarMensagem(msg, erro = false) {
  const div = document.getElementById("mensagem");
  div.style.color = erro ? "red" : "green";
  div.textContent = msg;
  setTimeout(() => (div.textContent = ""), 3000);
}
