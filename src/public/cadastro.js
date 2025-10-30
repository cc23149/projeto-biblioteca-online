const API = "http://localhost:8081";

document.getElementById("formCadastro").addEventListener("submit", async e => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!nome || !email || !senha) {
    mostrarMensagem("Preencha todos os campos!");
    return;
  }

  try {
    const resposta = await fetch(`${API}/usuarios`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "login.html";
    } else {
      mostrarMensagem(dados.erro || "Erro no cadastro");
    }
  } catch {
    mostrarMensagem("Erro ao conectar com o servidor");
  }
});

function mostrarMensagem(msg) {
  document.getElementById("mensagem").textContent = msg;
}
