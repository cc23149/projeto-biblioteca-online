const API = "http://localhost:8081";
const usuario = JSON.parse(localStorage.getItem("usuario"));
const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", carregarReservas);

async function carregarReservas() {
  if (!token || !usuario) {
    alert("Faça login para acessar suas reservas.");
    window.location.href = "login.html";
    return;
  }

  try {
    const resposta = await fetch(`${API}/reserva?usuarioId=${usuario.id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    const reservas = await resposta.json();
    const container = document.getElementById("listaReservas");
    container.innerHTML = "";

    if (reservas.length === 0) {
      container.innerHTML = "<p>Você não possui reservas ativas.</p>";
      return;
    }

    reservas.forEach(r => {
      const div = document.createElement("div");
      div.classList.add("reserva-card");
      div.innerHTML = `
        <p><strong>ID:</strong> ${r.Id}</p>
        <p><strong>Livro ID:</strong> ${r.LivroId}</p>
        <p><strong>Status:</strong> ${r.Status}</p>
        <button onclick="cancelarReserva(${r.Id})">Cancelar</button>
      `;
      container.appendChild(div);
    });
  } catch {
    alert("Erro ao carregar reservas.");
  }
}

async function cancelarReserva(id) {
  try {
    const resposta = await fetch(`${API}/reserva/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });

    const dados = await resposta.json();
    alert(dados.mensagem || "Reserva cancelada!");
    window.location.reload();
  } catch {
    alert("Erro ao cancelar reserva.");
  }
}
