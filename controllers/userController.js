const httpStatus = require('../helpers/httpState').httpResult
const userModel = require('../models/userModel').user
const userController = {}

userController.get = (req, res) => {
    try {
        userModel.get(null, (respuesta) => {
            httpStatus.httpRespose(res,respuesta,'Se encontro usuario')
        })
    } catch (e) {
        httpStatus.hpptError(res, e, 'Error al buscar usuarios')
    }
} 

userController.add = (req, res) => {
    const reqVal = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: (req.body.password),
        confirm: (req.body.confirm)
    }

    if (reqVal.name == undefined || reqVal.name == null || reqVal.name == '') {
        httpStatus.hpptError(res,reqVal, 'el campo name es obligatorio')
        return;
    }
    if (reqVal.surname == undefined || reqVal.surname == null || reqVal.surname == '') {
        httpStatus.hpptError(res, reqVal, 'el campo surname es obligatorio')
        return;
    }

    if (reqVal.email == undefined || reqVal.email == null || reqVal.email == '') {
        httpStatus.hpptError(res, reqVal, 'el campo email es obligatorio')
        return;
    }

    if (req.body.password == undefined || req.body.password == null || req.body.password == '') {
        httpStatus.hpptError(res, '', 'el campo password es obligatorio')
        return;
    }

    if (req.body.confirm == undefined || req.body.confirm == null || req.body.confir == '') {
        httpStatus.hpptError(res, '', 'el campo confirm es obligatorio')
        return;
    }

    if (reqVal.password != reqVal.confirm) {
        httpStatus.hpptError(res,reqVal, 'el campo confirm y password no coinciden')
        return;
    }

    userModel.add(reqVal, (respuesta) => {
        if (respuesta.state == true) {
            httpStatus.httpRespose(res,respuesta, 'Usuario Creado Correctamente')
        } else {
            httpStatus.hpptError(res,'', 'Error al crear usuario')
        }
    })

}
userController.editSomeone = (req, res) => {
    const reqVal = {
        nombre: req.body.name,
        id: req.body.id
    }

    if (reqVal.nombre == undefined || reqVal.nombre == null || reqVal.nombre == '') {
        res.json({
            state: false,
            mensaje: 'el campo name es obligatorio'
        })
        return;
    }

    if (reqVal.id == undefined || reqVal.id == null || reqVal.id == '') {
        res.json({
            state: false,
            mensaje: 'el campo id es obligatorio'
        })
        return;
    }

    userModel.editSomeone(reqVal, (respuesta) => {
        if (respuesta.state == true) {
            res.status(200).json({
                state: true,
                mensaje: 'Usuario Se Actualizo correctamente'
            })
        } else {
            res.status(500).json({
                state: false,
                mensaje: 'Se presento un Error al Actualizar ',
                info: respuesta.info
            })
        }

    })

}

userController.remove = (req, res) => {
    const reqVal = {
        id: req.body.id
    }

    if (reqVal.id == undefined || reqVal.id == null || reqVal.id == '') {
        res.json({
            state: false,
            mensaje: 'el campo id es obligatorio'
        })
        return;
    }

    userModel.remove(reqVal, (respuesta) => {
        if (respuesta.state == true) {
            res.status(200).json({
                state: true,
                mensaje: 'Usuario Se Elimino correctamente'
            })
        } else {
            res.status(500).json({
                state: false,
                mensaje: 'Se presento un Error al Eliminar ',
                info: respuesta.info
            })
        }

    })
}
userController.login = (req, res) => {
    const reqVal = {
        email: req.body.email,
        password: (req.body.password)
    }

    if (reqVal.email == undefined || reqVal.email == null || reqVal.email == '') {
        
        res.json({
            state: false,
            mensaje: 'el campo email es obligatorio'
        })
        return;
    }

    if (req.body.password == undefined || req.body.password == null || req.body.password == '') {
        res.json({
            state: false,
            mensaje: 'el campo password es obligatorio'
        })
        return;
    }

    userModel.login(req, respuesta => {

        if (res[0].password == req.password) {
            res.json({
                state: true,
                mensaje: 'Bienvenido',
                id: respuesta[0]._id
            })
        } else {
            httpStatus(res, e, 'Usuario o Password incorrecto')
        }

    })
}

module.exports.user = userController;