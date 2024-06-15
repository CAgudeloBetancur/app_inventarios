import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import Usuario from '../../models/Usuario.js';

config();

export const autenticacionRequerida = async (req, res, next) => {
  const { authorization } = req.headers;
  if(!authorization) {
    return res.status(401).json({error: 'Token de autenticacion requerido'});
  }
  const token = authorization.split(' ')[1];
  try {
    const {_id, rol} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const usuarioId = await Usuario.findOne({_id}).select('_id');
    req.user = {_id: usuarioId._id.toString(), rol};
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json('Ha ocurrido un error');
  }
}