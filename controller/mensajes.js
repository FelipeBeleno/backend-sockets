
const { response, request } = require("express");

const Mensaje = require('../models/mensaje');

const obtenerChat = async (req = request, res = response) => {


    const myId = req.uid;

    const mensajesDe = req.params.de
    const last30 = await Mensaje.find({
        $or: [
            { de: myId, para: mensajesDe },
            { de: mensajesDe, para: myId }
        ]
    }).sort({ createdAt: 'desc' }).limit(30);

    res.json({ ok: true, myId, mensajes: last30 })

}


module.exports = {
    obtenerChat
}