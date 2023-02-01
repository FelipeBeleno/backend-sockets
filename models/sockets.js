const { usuarioConetado, usuarioDesconetado } = require("../controller/sockets");
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

            // TODO: validar el JWT
            // Si el token no es valido desconectartlo.

            //TODO: saber que usuario esta activo

            //TODO: emitir todos los usarios conectados

            //TODO: Socket join unir usuario en salas en particular

            //TODO: Escuchar cuando el cliente manda el mensaje

            //TODO: Disconect
            //Marcar en base de datos que el usuario se desconceto

            //TODO: Emitir todos los usuarios desconectados


            socket.on('disconnect', async () => {
                await usuarioDesconetado(uid)

            })


        });
    }


}


module.exports = Sockets;