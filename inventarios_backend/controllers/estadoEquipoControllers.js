import EstadoEquipo from "../models/EstadoEquipo.js";

export const listarEstadosEquipo = async () => {
  return await EstadoEquipo.find();
}

export const crearEstadoEquipo = async (estadoEquipoRequest) => {
    let estadoEquipo = new EstadoEquipo();
    estadoEquipo.nombre = estadoEquipoRequest.nombre;
    estadoEquipo.estado = estadoEquipoRequest.estado;
    estadoEquipo.fechaCreacion = new Date();
    estadoEquipo.fechaActualizacion = new Date();
    await estadoEquipo.save();
}

export const editarEstadoEquipo = async (estadoEquipoFromDb, estadoEquipoRequest) => {
  estadoEquipoFromDb.nombre = estadoEquipoRequest.nombre;
  estadoEquipoFromDb.estado = estadoEquipoRequest.estado;
  estadoEquipoFromDb.fechaActualizacion = new Date();
  await estadoEquipoFromDb.save();
}