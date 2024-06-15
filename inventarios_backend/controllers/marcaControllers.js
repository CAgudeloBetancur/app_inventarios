import Marca from "../models/Marca.js";

export const listarMarcas = async () => {
  return await Marca.find();
}

export const crearMarca = async (marcaRequest) => {
  marcaRequest.fechaCreacion = new Date();
  marcaRequest.fechaActualizacion = new Date();
  await Marca.create(marcaRequest);
}

export const editarMarca = async (marcaId, marcaRequest) => {
  marcaRequest.fechaActualizacion = new Date();
  await Marca.findByIdAndUpdate(marcaId, marcaRequest);
}

export const eliminarMarca = async (id) => {
  let marcaEliminada = await Marca.findByIdAndDelete(id);
  return (marcaEliminada !== null) ? {deleted: true} : {deleted: false};
}