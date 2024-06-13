import Marca from "../models/Marca.js";

export const listarMarcas = async () => {
  return await Marca.find();
}

export const crearMarca = async (marcaRequest) => {
  let marca = new Marca();
  marca.nombre = marcaRequest.nombre;
  marca.estado = marcaRequest.estado;
  marca.fechaCreacion = new Date();
  marca.fechaActualizacion = new Date();
  await marca.save();
}

export const editarMarca = async (marcaId, marcaRequest) => {
  marcaRequest.fechaActualizacion = new Date();
  await Marca.findByIdAndUpdate(marcaId, marcaRequest);
}