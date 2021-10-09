//Referencias HTML
const lblEscritorio = document.querySelector("#lblEscritorio");
const lblPendientes = document.getElementById("lblPendientes");
const btnAtender = document.querySelector("#btnAtender");
const lblAlerta = document.getElementById("lblAlerta");
const divAlerta = document.getElementById("divAlerta");
const lblTicketActual = document.getElementById("lblTicketActual");

const socket = io();

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es obligatorio");
}

const escritorio = searchParams.get("escritorio");

lblEscritorio.textContent = escritorio;

divAlerta.classList.add("d-none");

socket.on("connect", () => {
  btnAtender.diasbled = false;
});

socket.on("disconnect", () => {
  btnAtender.disabled = true;
});

socket.on("estado-actual", (ultimos4) => {
  const ticket = ultimos4.find((ticket) => ticket.escritorio === escritorio);
  lblTicketActual.innerText = !ticket ? "..." : `Ticket ${ticket.numero}`;
});

socket.on("tickets-pendientes", (pendientes) => {
  lblPendientes.innerText = pendientes;
  if (pendientes === 0) {
    divAlerta.classList.remove("d-none");
    lblAlerta.innerText = "Ya no hay más tickets";
  } else {
    divAlerta.classList.add("d-none");
  }
});

btnAtender.addEventListener("click", () => {
  socket.emit(
    "atender-ticket",
    { escritorio },
    ({ ok, ticket, msg, pendientes }) => {
      if (!ok) {
        divAlerta.classList.remove("d-none");
        lblAlerta.innerText = msg;
        lblTicketActual.innerText = "nadie";
        return;
      }
      lblTicketActual.innerText = `Ticket ${ticket.numero}`;
      lblPendientes.innerText = pendientes;
    }
  );
});
