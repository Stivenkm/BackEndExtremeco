const publicationModel = require('../models/publicationModel').publication
const publicationController = {}

publicationController.get = (req, res) => {
    publicationModel.get(null, (respuesta) => {
        try {
            res.status(200).json({
                info: respuesta.info
            })
        } catch (error) {
            res.status(500).json(respuesta)
        }

    })
}
publicationController.add = (req, res) => {
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

    publicationModel.add(reqVal, (respuesta) => {
        if (respuesta.state == true) {
            res.json({
                state: true,
                mensaje: 'Publicacion Creado Correctamente',
                info: reqVal
            })
        } else {
            res.json({
                state: false,
                mensaje: 'Error al Crear Publicacion'
            })
        }
    })



}
publicationController.remove = (req, res) => {
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

    publicationModel.remove(reqVal, (respuesta) => {
        if (respuesta.state == true) {
            res.status(200).json({
                state: true,
                mensaje: 'Publicacion Se Elimino correctamente'
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
module.exports.publication = publicationController;