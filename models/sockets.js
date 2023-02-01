const { usuarioConetado, usuarioDesconetado, getUsuarios, grabarMensaje } = require("../controller/sockets");
const { comprobarJWT } = require("../helpers/jwt");


class Sockets {

    constructor(io) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {


            let [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);

            if (!valido) {
                return socket.disconnect()
            }



            await usuarioConetado(uid);

            socket.join(uid);

            // TODO: validar el JWT
            // Si el token no es valido desconectartlo.

            //TODO: saber que usuario esta activo

            //TODO: emitir todos los usarios conectados


            this.io.emit('lista-usuarios', await getUsuarios());

            //TODO: Socket join unir usuario en salas en particular

            //TODO: Escuchar cuando el cliente manda el mensaje

            socket.on('mensaje-personal', async (payload) => {

                const mensaje = await grabarMensaje(payload);

                this.io.to(payload.para).emit('mensaje-personal', mensaje)
                this.io.to(payload.de).emit('mensaje-personal', mensaje)

            })



            //TODO: Disconect
            //Marcar en base de datos que el usuario se desconceto

            //TODO: Emitir todos los usuarios desconectados


            socket.on('disconnect', async () => {
                await usuarioDesconetado(uid)

                this.io.emit('lista-usuarios', await getUsuarios());
            })


        });
    }


}


module.exports = Sockets;