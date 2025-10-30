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
    const resposta = await fetch(`${API}/reservas?usuarioId=${usuario.id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!resposta.ok) {
      throw new Error("Erro ao buscar reservas.");
    }

    const reservas = await resposta.json();

    const corpoAtivas = document.getElementById("corpoAtivas");
    const corpoInativas = document.getElementById("corpoInativas");
    corpoAtivas.innerHTML = "";
    corpoInativas.innerHTML = "";

    if (!reservas || reservas.length === 0) {
      corpoAtivas.innerHTML = "<tr><td colspan='5'>Você não possui reservas.</td></tr>";
      corpoInativas.innerHTML = "<tr><td colspan='5'>Nenhuma reserva cancelada ou concluída.</td></tr>";
      return;
    }

    let temAtiva = false;
    let temInativa = false;

    reservas.forEach(r => {
      const linha = document.createElement("tr");

      // Substitui LivroId por ISBN
      const isbn = r.ISBN || "(Sem ISBN)";

      if (r.Status.toLowerCase() === "ativa") {
        linha.innerHTML = `
          <td>${r.Id}</td>
          <td>${r.Titulo || "(Sem título)"}</td>
          <td>${isbn}</td>
          <td>${r.Status}</td>
          <td><button class="cancelar" onclick="cancelarReserva(${r.Id})">Cancelar</button></td>
        `;
        corpoAtivas.appendChild(linha);
        temAtiva = true;
      } else {
        linha.innerHTML = `
          <td>${r.Id}</td>
          <td>${r.Titulo || "(Sem título)"}</td>
          <td>${isbn}</td>
          <td>${r.Status}</td>
          <td>${r.DataReserva ? new Date(r.DataReserva).toLocaleDateString() : "-"}</td>
        `;
        corpoInativas.appendChild(linha);
        temInativa = true;
      }
    });

    if (!temAtiva)
      corpoAtivas.innerHTML = "<tr><td colspan='5'>Nenhuma reserva ativa.</td></tr>";

    if (!temInativa)
      corpoInativas.innerHTML = "<tr><td colspan='5'>Nenhuma reserva cancelada ou concluída.</td></tr>";

  } catch (erro) {
    mostrarMensagem("Erro ao carregar reservas.", true);
  }
}

async function cancelarReserva(id) {
  if (!confirm("Tem certeza que deseja cancelar esta reserva?")) return;

  try {
    const resposta = await fetch(`${API}/reservas/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });

    const dados = await resposta.json();
    mostrarMensagem(dados.mensagem || "Reserva cancelada com sucesso!");
    carregarReservas();
  } catch (erro) {
    mostrarMensagem("Erro ao cancelar reserva.", true);
  }
}

function mostrarMensagem(msg, erro = false) {
  const div = document.getElementById("mensagem");
  div.style.color = erro ? "red" : "green";
  div.textContent = msg;
  setTimeout(() => (div.textContent = ""), 3000);
}
