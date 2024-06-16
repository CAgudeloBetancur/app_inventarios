import Inventario from "../models/Inventario.js";
import TipoEquipo from "../models/TipoEquipo.js";

export const listarTiposEquipo = async () => {
  return await TipoEquipo.find();
}

export const crearTipoEquipo = async (tipoEquipoRequest) => {
  tipoEquipoRequest.fechaCreacion = new Date();
  tipoEquipoRequest.fechaActualizacion = new Date();
  await TipoEquipo.create(tipoEquipoRequest);
}

export const editarTipoEquipo = async (tipoEquipoId, tipoEquipoRequest) => {
  tipoEquipoRequest.fechaActualizacion = new Date();
  await TipoEquipo.findByIdAndUpdate(tipoEquipoId, tipoEquipoRequest);
}

export const eliminarTipoEquipo = async (id) => {
  const conteoReferencias = await Inventario.countDocuments({tipoEquipo: id});
  if(conteoReferencias > 0) return {deleted: false, referencias: conteoReferencias}
  let tipoEquipoEliminado = await TipoEquipo.findByIdAndDelete(id);
  return (tipoEquipoEliminado !== null) ? {deleted: true} : {deleted: false};
}