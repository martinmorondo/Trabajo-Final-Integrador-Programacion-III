import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarioModel.js';

// REGISTRO DE USUARIO
export const register = async (req, res) => {
    try {
        const { documento, apellido, nombres, email, password, foto_path, rol } = req.body;

        // 1. Validar campos obligatorios
        if (!documento || !apellido || !nombres || !email || !password || !rol) {
            return res.status(400).json({ mensaje: 'Todos los campos obligatorios deben estar presentes' });
        }

        // 2. Verificar si el email ya existe
        const usuarioExistente = await Usuario.findByEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El email ya está registrado' });
        }

        // 3. Encriptar la contraseña
        const saltRounds = 10;
        const passwordHasheada = await bcrypt.hash(password, saltRounds);

        // 4. Guardar en la BD enviando "contrasenia" para que coincida con la columna
        const result = await Usuario.create({
            documento,
            apellido,
            nombres,
            email,
            contrasenia: passwordHasheada,
            foto_path,
            rol
        });

        res.status(201).json({ 
            mensaje: 'Usuario registrado con éxito', 
            id_usuario: result.insertId 
        });
    } catch (error) {
        // Capturar error si el DNI (documento) ya existe (es UNIQUE en la BD)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ mensaje: 'El documento o email ya existe en el sistema' });
        }
        res.status(500).json({ mensaje: 'Error al registrar el usuario', error: error.message });
    }
};

// LOGIN DE USUARIO
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ mensaje: 'El email y la contraseña son obligatorios' });
        }

        const usuario = await Usuario.findByEmail(email);
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        // 3. Comparar contra "usuario.contrasenia" 
        const passwordValida = await bcrypt.compare(password, usuario.contrasenia);
        if (!passwordValida) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        // 4. Token Payload con el ROL numérico
        const tokenPayload = {
            id_usuario: usuario.id_usuario,
            rol: usuario.rol
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({
            mensaje: 'Inicio de sesión exitoso',
            token: token,
            usuario: {
                nombres: usuario.nombres,
                apellido: usuario.apellido,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
};