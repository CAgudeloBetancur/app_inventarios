import Usuario from "../models/Usuario.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config();

export const listarUsuarios = async () => {
  return await Usuario.find();
}

export const signUp = async (usuarioRequest) => {
  const emailExistente = await Usuario.findOne({email: usuarioRequest.email});
  if(emailExistente) {
    throw Error('Este email ya existe');
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(usuarioRequest.password, salt);
  usuarioRequest.password = hash;
  usuarioRequest.fechaCreacion = new Date();
  usuarioRequest.fechaActualizacion = new Date();
  const usuario = await Usuario.create(usuarioRequest);
  return {_id: usuario._id, rol: usuario.rol};
}

export const logIn = async (usuarioRequest) => {
  const user = await Usuario.findOne({email: usuarioRequest.email});
  if(!user) throw Error('Email incorrecto');
  const match = await bcrypt.compare(usuarioRequest.password, user.password);
  if(!match) throw Error('Contraseña incorrecta');
  return user;
}

export const editarUsuario = async (usuarioId, usuarioRequest) => {
  usuarioRequest.fechaActualizacion = new Date();
  await Usuario.findByIdAndUpdate(usuarioId, usuarioRequest);
}

export const refreshToken = async (userPayload) => {
  console.log(userPayload)
  const accessToken = jwt.sign(
    userPayload, 
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m"}
  );
  return accessToken;
}