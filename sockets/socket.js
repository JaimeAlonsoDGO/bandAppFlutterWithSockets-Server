const { io } = require("../index");

// Mensajes Sockets
io.on("connection", (client) => {
  console.log("Cliente Conectado");

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  // on es para escuchar determinado evento
  client.on("mensaje", (payload) => {
    console.log("Llegó un mensaje: ", payload);

    // io hace referencia a todo el servidor
    io.emit("mensaje", { admin: "Nuevo Mensaje" });
  });
});
