import TipoEquipo from "../models/TipoEquipo.js";

export const listarTiposEquipo = async () => {
  return await TipoEquipo.find();
}

export const crearTipoEquipo = async (tipoEquipoRequest) => {
  let tipoEquipo = new TipoEquipo();
  tipoEquipo.nombre = tipoEquipoRequest.nombre;
  tipoEquipo.estado = tipoEquipoRequest.estado;
  tipoEquipo.fechaCreacion = new Date();
  tipoEquipo.fechaActualizacion = new Date();
  await tipoEquipo.save();
}

export const editarTipoEquipo = async (tipoEquipoId, tipoEquipoRequest) => {
  tipoEquipoRequest.fechaActualizacion = new Date();
  await TipoEquipo.findByIdAndUpdate(tipoEquipoId, tipoEquipoRequest);
}