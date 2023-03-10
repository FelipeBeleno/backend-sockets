// Servidor de Express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const { dbConection } = require('../database/config');
const cors = require('cors');

const Sockets = require('./sockets');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // Conectar a DB
        dbConection()

        // Http server
        this.server = http.createServer(this.app);

        // Configuraciones de sockets
        this.io = socketio(this.server, { /* configuraciones */ });


    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        // cors
        this.app.use(cors())


        // configuración para recibir data parseo del body

        this.app.use(express.json())




        // API EndPonts
        this.app.use('/api/login', require('../router/auth'));
        this.app.use('/api/mensajes', require('../router/mensajes'));

    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto:', this.port);
        });
    }
}


module.exports = Server;