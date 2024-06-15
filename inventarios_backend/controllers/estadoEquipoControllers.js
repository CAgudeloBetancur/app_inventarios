import EstadoEquipo from "../models/EstadoEquipo.js";

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
  let estadoEquipoEliminado = await EstadoEquipo.findByIdAndDelete(id);
  return (estadoEquipoEliminado !== null) ? {deleted: true} : {deleted: false};
}