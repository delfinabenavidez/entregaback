// Dependencias
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


const productosCocina = [
  { id: 1, nombre: 'Cuchillo de chef' },
  { id: 2, nombre: 'Tabla de cortar' },
  { id: 3, nombre: 'Sarten' },
  { id: 4, nombre: 'Batidora eléctrica' },
];


app.get('/', (req, res) => {
  res.render('index', { productos: productosCocina });
});

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.emit('productos', productosCocina);
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
