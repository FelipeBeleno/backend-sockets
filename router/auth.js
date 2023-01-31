/*
    path: /api/login
*/

const { check } = require('express-validator')


const { Router } = require('express');
const { crearUsuario, login, revalidar } = require('../controller/auth');
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-token');


const router = Router();

// crear nuevos usuarios
router.post('/new', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    validarCampos
], crearUsuario)

//login
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    validarCampos
], login)

// revalidar tocken
router.get('/renew', [validarJWT], revalidar)


module.exports = router;