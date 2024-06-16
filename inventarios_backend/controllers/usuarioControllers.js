import Usuario from "../models/Usuario.js";
import bcrypt from 'bcrypt';
import UsuarioToken from "../models/UsuarioToken.js";
import Inventario from "../models/Inventario.js";

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
  const usuario = await Usuario.findByIdAndUpdate(usuarioId, usuarioRequest, {new: true});
  return {_id: usuario._id, rol: usuario.rol}
}

export const eliminarUsuario = async (id) => {
  const conteoReferencias = await Inventario.countDocuments({usuario: id});
  if(conteoReferencias > 0) return {deleted: false, referencias: conteoReferencias}
  let usuarioEliminado = await Usuario.findByIdAndDelete(id);
  if(usuarioEliminado) {
    await UsuarioToken.findOneAndDelete( {usuarioId: id} );
    return {deleted: true};
  }
  return {deleted: false};
}