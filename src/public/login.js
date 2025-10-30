const API = "http://localhost:8081";

// Adiciona evento ao formulário de login
document.getElementById("formLogin").addEventListener("submit", async e => {
  e.preventDefault(); // Impede o reload da página

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  try {
    // Envia os dados para a rota /usuarios/login
    const resposta = await fetch(`${API}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      // Salva o token JWT no localStorage
      localStorage.setItem("token", dados.token);

      // Decodifica o token (parte do meio) para obter as informações do usuário
      const payload = JSON.parse(atob(dados.token.split(".")[1]));

      // Armazena os dados do usuário logado
      localStorage.setItem("usuario", JSON.stringify(payload));

      alert("Login realizado com sucesso!");
      window.location.href = "home.html"; // Redireciona para a página principal
    } else {
      mostrarMensagem(dados.erro || "Erro no login");
    }
  } catch {
    mostrarMensagem("Erro ao conectar com o servidor");
  }
});

// Exibe mensagens no elemento com id="mensagem"
function mostrarMensagem(msg) {
  document.getElementById("mensagem").textContent = msg;
}
