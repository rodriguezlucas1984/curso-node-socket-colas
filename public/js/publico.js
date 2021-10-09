//Referencias HTML
const lblEscritorio1 = document.getElementById("lblEscritorio1");
const lblEscritorio2 = document.getElementById("lblEscritorio2");
const lblEscritorio3 = document.getElementById("lblEscritorio3");
const lblEscritorio4 = document.getElementById("lblEscritorio4");
const lblTicket1 = document.getElementById("lblTicket1");
const lblTicket2 = document.getElementById("lblTicket2");
const lblTicket3 = document.getElementById("lblTicket3");
const lblTicket4 = document.getElementById("lblTicket4");

const socket = io();

socket.on("connect", () => {
  console.log("Conectado..");
});

socket.on("estado-actual", (payload) => {
  const audio = new Audio("./audio/new-ticket.mp3");
  audio.play();

  const [ticket1, ticket2, ticket3, ticket4] = payload;

  lblTicket1.innerText = !ticket1
    ? "Bienvenido..."
    : `Ticket ${ticket1.numero}`;
  lblTicket2.innerText = !ticket2
    ? "Bienvenido..."
    : `Ticket ${ticket2.numero}`;
  lblTicket3.innerText = !ticket3
    ? "Bienvenido..."
    : `Ticket ${ticket3.numero}`;
  lblTicket4.innerText = !ticket3
    ? "Bienvenido..."
    : `Ticket ${ticket4.numero}`;
  lblEscritorio1.innerText = !ticket1
    ? "en breve te atenderemos"
    : `${ticket1.escritorio}`;
  lblEscritorio2.innerText = !ticket2
    ? "en breve te atenderemos"
    : `${ticket2.escritorio}`;
  lblEscritorio3.innerText = !ticket3
    ? "en breve te atenderemos"
    : `${ticket3.escritorio}`;
  lblEscritorio4.innerText = !ticket4
    ? "en breve te atenderemos"
    : `${ticket4.escritorio}`;
});
