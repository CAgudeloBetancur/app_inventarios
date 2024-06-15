import Usuario from "../models/Usuario.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config();

export const logIn = async (usuarioRequest) => {
  const user = await Usuario.findOne({email: usuarioRequest.email});
  if(!user) throw Error('Email incorrecto');
  const match = await bcrypt.compare(usuarioRequest.password, user.password);
  if(!match) throw Error('Contraseña incorrecta');
  return user;
}

export const refreshToken = async (userPayload) => {
  console.log(userPayload)
  const accessToken = jwt.sign(
    userPayload, 
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: "10m"}
  );
  return accessToken;
}