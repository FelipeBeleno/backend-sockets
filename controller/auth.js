const { response, request } = require("express");
const bcryp = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req = request, res = response) => {

    try {

        const { email, password, name } = req.body;


        let existeEmail = await Usuario.findOne({ email })

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe'
            })
        }

        // Todo encriptar contraseña


        const usuario = new Usuario({
            email, password, name
        })

        const salt = bcryp.genSaltSync();

        usuario.password = bcryp.hashSync(password, salt)

        await usuario.save()


        //Generar JWT

        const token = await generarJWT(usuario.id);



        res.json({
            ok: true,
            token,
            usuario
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}



//login
const login = async (req = request, res = response) => {


    const { email, password } = req.body;

    try {


        const usuarioDB = await Usuario.findOne({ email });



        // TODO quitar pista a la persona de lo que no es valido

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //validar password
        const validOassword = bcryp.compareSync(password, usuarioDB.password);


        if (!validOassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no es correcto'
            });
        }

        // generar JWT
        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }



}

// revalidar tocken
const revalidar = async (req = request, res = response) => {

    const uid = req.uid;

    // generar nuevo jwt

    const token = await generarJWT(uid);

    // obtener usuario por uid

    const usuario = await Usuario.findById(uid); 


    res.json({ ok: true, token, usuario })
}



module.exports = {
    crearUsuario,
    login,
    revalidar
}