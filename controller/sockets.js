
const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioConetado = async (uid) => {

    const usuario = await Usuario.findById(uid);

    usuario.online = true;
    await usuario.save();
    return usuario

};

const usuarioDesconetado = async (uid) => {
    const usuario = await Usuario.findById(uid);

    usuario.online = false;
    await usuario.save();
    return usuario
}

const getUsuarios = async () => {

    const usuarios = await Usuario.find().sort('-online');

    return usuarios;
}



const grabarMensaje = async (payload) => {


    const mensaje = await Mensaje(payload);

    await mensaje.save()

    return mensaje

}

module.exports = {
    usuarioConetado,
    usuarioDesconetado,
    getUsuarios,
    grabarMensaje
}