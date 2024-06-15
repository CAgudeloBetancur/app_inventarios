import UsuarioToken from "../../models/UsuarioToken.js";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";

config();

export const validarRefreshToken = async (refreshToken) => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  const usuarioToken = await UsuarioToken.findOne({token: refreshToken});
  if(!usuarioToken) return {error: 'Refresh Token invalido'}
  const {_id, rol} =  jwt.verify(refreshToken, secret);
  return {_id, rol};
}