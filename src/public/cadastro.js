// URL base da API
const API = "http://localhost:8081";

// Adiciona evento ao formulário de cadastro
document.getElementById("formCadastro").addEventListener("submit", async e => {
  e.preventDefault(); // Evita o recarregamento da página ao enviar o formulário

  // Captura os valores digitados pelo usuário
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  // Verifica se todos os campos foram preenchidos
  if (!nome || !email || !senha) {
    mostrarMensagem("Preencha todos os campos!");
    return;
  }

  try {
    // Envia os dados para a API para cadastrar o usuário
    const resposta = await fetch(`${API}/usuarios`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha })
    });

    // Converte a resposta da API para JSON
    const dados = await resposta.json();

    // Se o cadastro foi bem-sucedido
    if (resposta.ok) {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "login.html"; // Redireciona para a tela de login
    } else {
      // Exibe a mensagem de erro da API
      mostrarMensagem(dados.erro || "Erro no cadastro");
    }
  } catch {
    mostrarMensagem("Erro ao conectar com o servidor");
  }
});

// Exibe mensagens abaixo do formulário
function mostrarMensagem(msg) {
  document.getElementById("mensagem").textContent = msg;
}
