import Usuario from "../models/Usuario.js";
import bcrypt from 'bcrypt';
import UsuarioToken from "../models/UsuarioToken.js";

export const listarUsuarios = async () => {
  return await Usuario.find();
}

export const crearUsuario = async (usuarioRequest) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(usuarioRequest.password, salt);
  usuarioRequest.password = hash;
  usuarioRequest.fechaCreacion = new Date();
  usuarioRequest.fechaActualizacion = new Date();
  const usuario = await Usuario.create(usuarioRequest);
  return {_id: usuario._id, rol: usuario.rol};
}

export const editarUsuario = async (usuarioId, usuarioRequest) => {
  usuarioRequest.fechaActualizacion = new Date();
  await Usuario.findByIdAndUpdate(usuarioId, usuarioRequest);
}

export const eliminarUsuario = async (id) => {
  let usuarioEliminado = await Usuario.findByIdAndDelete(id);
  if(usuarioEliminado) {
    await UsuarioToken.findOneAndDelete( {usuarioId: id} );
    return {deleted: true};
  }
  return {deleted: false};
}