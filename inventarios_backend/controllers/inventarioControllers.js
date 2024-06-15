import Inventario from "../models/Inventario.js";

export const listarInventarios = async () => {
  const listaInventarios = await Inventario.find().populate([
    {
      path: 'usuario', 
      select: 'nombre email estado'
    },
    {
      path: 'marca',
      select: 'nombre estado'
    },
    {
      path: 'tipoEquipo',
      select: 'nombre estado'
    },
    {
      path: 'estadoEquipo',
      select: 'nombre estado'
    }
  ]);
  return listaInventarios;
}

export const obtenerInventarioPorId = async (inventarioId) => {
  const inventario = await Inventario.findById(inventarioId).populate([
    {
      path: 'usuario', 
      select: 'nombre email estado'
    },
    {
      path: 'marca',
      select: 'nombre estado'
    },
    {
      path: 'tipoEquipo',
      select: 'nombre estado'
    },
    {
      path: 'estadoEquipo',
      select: 'nombre estado'
    }
  ]);
  return inventario;
}

export const crearInventario = async (inventarioRequest) => {
    inventarioRequest.fechaCreacion = new Date();
    inventarioRequest.fechaActualizacion = new Date();
    await Inventario.create(inventarioRequest);
}

export const editarInventario = async (inventarioId, inventarioRequest) => {
    inventarioRequest.fechaActualizacion = new Date();
    await Inventario.findByIdAndUpdate(inventarioId, inventarioRequest);    
}

export const eliminarInventario = async (id) => {
  let inventarioEliminado = await Inventario.findByIdAndDelete(id);
  return (inventarioEliminado !== null) ? {deleted: true} : {deleted: false};
}