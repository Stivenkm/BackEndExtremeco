const favoriteModel = require('../models/favoriteModel').favorite
const favoriteController = {}

favoriteController.get = (req, res) => {
    favoriteModel.get(null, (respuesta) => {
        try {
            res.status(200).json({
                info: respuesta.info
            })
        } catch (error) {
            res.status(500).json(respuesta)
        }

    })
}
favoriteController.add = (req, res) => {
    const reqVal = {
        description: req.body.description,
    }

    if (reqVal.description == undefined || reqVal.description == null || reqVal.description == '') {
        res.json({
            state: false,
            mensaje: 'el campo description es obligatorio'
        })
        return;
    }

    favoriteModel.add(reqVal, (respuesta) => {
        if (respuesta.state == true) {
            res.json({
                state: true,
                mensaje: 'Favorito creado Correctamente',
                info: reqVal
            })
        } else {
            res.json({
                state: false,
                mensaje: 'Error al Crear favorito'
            })
        }
    })



}
favoriteController.remove = (req, res) => {
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

    favoriteModel.remove(reqVal, (respuesta) => {
        if (respuesta.state == true) {
            res.status(200).json({
                state: true,
                mensaje: 'favorite Se Elimino correctamente'
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
module.exports.favorite = favoriteController;