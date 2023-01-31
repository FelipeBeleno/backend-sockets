
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {

    try {

        const token = req.header('x-token');

        if (!token) {
            res.status(401).json({
                ok: false,
                msg: 'No hay token en el petición'
            })
        }

        let statusToken = jwt.verify(token, process.env.JWT_KEY);


        if (!statusToken) {
            res.status(401).json({
                ok: false,
                msg: 'Token invalido'

            })
        }

        req.uid = statusToken.uid


        next();


    } catch (error) {
        console.log(error)
        res.status(401).json({
            ok: false,
            msg: 'Token no valido'

        })
    }

}


module.exports = validarJWT;