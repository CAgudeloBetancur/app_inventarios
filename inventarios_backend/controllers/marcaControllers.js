import Inventario from "../models/Inventario.js";
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
  const conteoReferencias = await Inventario.countDocuments({marca: id});
  if(conteoReferencias > 0) return {deleted: false, referencias: conteoReferencias}
  let marcaEliminada = await Marca.findByIdAndDelete(id);
  return (marcaEliminada !== null) ? {deleted: true} : {deleted: false};
}