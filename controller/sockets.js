
const Usuario = require('../models/usuario');

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


module.exports = {
    usuarioConetado,
    usuarioDesconetado
}