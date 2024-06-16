import EstadoEquipo from "../models/EstadoEquipo.js";
import Inventario from "../models/Inventario.js";

export const listarEstadosEquipo = async () => {
  return await EstadoEquipo.find();
}

export const crearEstadoEquipo = async (estadoEquipoRequest) => {
    estadoEquipoRequest.fechaCreacion = new Date();
    estadoEquipoRequest.fechaActualizacion = new Date();
    await EstadoEquipo.create(estadoEquipoRequest);
}

export const editarEstadoEquipo = async (estadoEquipoId, estadoEquipoRequest) => {
  estadoEquipoRequest.fechaActualizacion = new Date();
  await EstadoEquipo.findByIdAndUpdate(estadoEquipoId, estadoEquipoRequest);
}

export const eliminarEstadoEquipo = async (id) => {
  const conteoReferencias = await Inventario.countDocuments({estadoEquipo: id});
  if(conteoReferencias > 0) return {deleted: false, referencias: conteoReferencias}
  let estadoEquipoEliminado = await EstadoEquipo.findByIdAndDelete(id);
  return (estadoEquipoEliminado !== null) ? {deleted: true} : {deleted: false};
}