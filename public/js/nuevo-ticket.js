//Referencias HTML
const lblNuevoTicket = document.getElementById("lblNuevoTicket");
const btnNuevoTicket = document.getElementById("btnNuevoTicket");

const socket = io();

socket.on("connect", () => {
  btnNuevoTicket.disabled = false;
});
socket.on("disconnect", () => {
  btnNuevoTicket.disabled = true;
});
socket.on("ultimo-ticket", (ultimo) => {
  lblNuevoTicket.textContent = `Ticket ${ultimo}`;
});

btnNuevoTicket.addEventListener("click", () => {
  socket.emit("siguiente-ticket", null, (ticket) => {
    lblNuevoTicket.textContent = ticket;
  });
});
