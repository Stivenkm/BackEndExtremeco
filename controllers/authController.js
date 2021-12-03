const httpError  = require('../helpers/httpState').httpResult
const { encrypt, compare } = require('../helpers/Bcrypt')
const { tokenSign } = require('../helpers/generateToken')
const userModel = require('../models/userModel')



const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.MymodelfindOne({ email })

        if (!user) {
            res.status(404)
            res.send({ error: 'User not found' })
        }

        const checkPassword = await compare(password, user.password) //TODO: Contraseña!

        const tokenSession = await tokenSign(user) 
        if (checkPassword) {
            res.send({
                data: user,
                tokenSession
            })
            return
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Invalid password'
            })
            return
        }

    } catch (e) {
        httpError.hpptError(res, e,'')
    }
}


const register = async (req, res) => {
    try {
        const { email, password, name } = req.body

        const passwordHash = await encrypt(password) 
        const registerUser = await userModel.create({
            email,
            name,
            password: passwordHash
        })

        res.send({ data: registerUser })

    } catch (e) {
        httpError(res, e)
    }
}



module.exports = { login, register }