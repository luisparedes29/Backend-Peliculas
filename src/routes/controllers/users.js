const bcrypt = require('bcrypt');
const Users = require('../../models/users');
const { createToken } = require('./jwtCreate');


const registerUser = async (req, res) => {
    try {
        const { nombre, usuario, contraseña, isAdmin } = req.body;
        if (!nombre || !usuario || !contraseña) {
            return res.status(400).json({ error: 'El nombre, usuario y la contraseña son requeridos.' });
        }

        const usuarioExistente = await Users.findOne({ usuario });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El usuario ya existe. Por favor escoja otro.' });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(contraseña)) {
            return res.status(400).json({ error: 'La contraseña debe ser de al menos 6 caracteres, incluir una mayúscula y un número.' });
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const user = await Users.create({
            nombre,
            usuario,
            contraseña: hashedPassword
        });
        let token = createToken({ id: user._id, nombre: user.nombre, usuario: user.usuario, isAdmin: user.isAdmin });
        res.status(200).json({ token, usuario, isAdmin: user.isAdmin});
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'El usuario ya existe. Por favor escoja otro' });
        }
        res.status(500).json({ error: 'Ocurrió un error al intentar crear un nuevo user.' });
    }
};



const loginUser = async (req, res) => {
    try {
        const { usuario, contraseña, isAdmin } = req.body;
        if (!usuario || !contraseña) {
            return res.status(400).json({ error: 'El usuario y la contraseña son requeridos para iniciar sesión' });
        }
        const user = await Users.findOne({ usuario });
        if (!user) {
            return res.status(400).json({ error: 'El usuario no existe' });
        }
        const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'La contraseña es incorrecta' });
        }
        let token = createToken({ id: user._id, nombre: user.nombre, usuario: user.usuario, isAdmin: user.isAdmin });
        res.status(200).json({ token, usuario, isAdmin: user.isAdmin });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ocurrió un error al intentar iniciar sesión.' });
    }
};


module.exports = { registerUser, loginUser };