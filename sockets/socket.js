const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("The Killers"));
bands.addBand(new Band("The National"));
bands.addBand(new Band("The Black Keys"));

// Mensajes Sockets
io.on("connection", (client) => {
  console.log("Cliente Conectado");

  // Envia al cliente las bandas al conectarse
  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  // on es para escuchar determinado evento
  client.on("mensaje", (payload) => {
    console.log("Llegó un mensaje: ", payload);

    // io hace referencia a todo el servidor
    io.emit("mensaje", { admin: "Nuevo Mensaje" });
  });

  client.on("emitir-mensaje", (payload) => {
    // console.log(payload);
    // io.emit("mensaje", payload); //Para todos los clientes conectados
    client.broadcast.emit("emitir-mensaje", payload); //Para todos, excepto quien lo emitió
  });

  // VOTE BAND
  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  // ADD BAND
  client.on("add-band", (payload) => {
    console.log(payload);
    const newBand = new Band(payload.name);
    bands.addBand(newBand);
    io.emit("active-bands", bands.getBands());
  });

  // DELETE BAND
  client.on("delete-band", (payload) => {
    bands.deleteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });
});
