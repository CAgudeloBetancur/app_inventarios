import UsuarioToken from "../models/UsuarioToken.js";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const crearTokens = async (usuarioPayload) => {
  const accessToken = jwt.sign(
    usuarioPayload, 
    process.env.ACCESS_TOKEN_SECRET, 
    { expiresIn: '10m' }
  );
  const refreshToken = jwt.sign(
    usuarioPayload, 
    process.env.REFRESH_TOKEN_SECRET, 
    { expiresIn: '7d' }
  );
  // Si existe elimina el token, si no, no hace nada.
  await UsuarioToken.findOneAndDelete( {usuarioId: usuarioPayload._id} );
  // Creamos nuevo refresh token
  await new UsuarioToken({usuarioId: usuarioPayload._id, token: refreshToken}).save();
  return {accessToken, refreshToken}
}