
/*
path: /api/mensajes

*/


const { Router } = require('express');
const { obtenerChat } = require('../controller/mensajes');
const validarJWT = require('../middlewares/validar-token');

const router = Router();



router.get('/:de', validarJWT, obtenerChat)


module.exports = router