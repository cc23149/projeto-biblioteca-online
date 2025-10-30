const API = "http://localhost:8081";

document.getElementById("formLogin").addEventListener("submit", async e => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  try {
    const resposta = await fetch(`${API}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      localStorage.setItem("token", dados.token);
      const payload = JSON.parse(atob(dados.token.split(".")[1]));
      localStorage.setItem("usuario", JSON.stringify(payload));
      alert("Login realizado com sucesso!");
      window.location.href = "home.html";
    } else {
      mostrarMensagem(dados.erro || "Erro no login");
    }
  } catch {
    mostrarMensagem("Erro ao conectar com o servidor");
  }
});

function mostrarMensagem(msg) {
  document.getElementById("mensagem").textContent = msg;
}
