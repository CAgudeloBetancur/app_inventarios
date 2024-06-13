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
    let inventario = new Inventario();
    inventario.serial = inventarioRequest.serial;
    inventario.modelo = inventarioRequest.modelo;
    inventario.description = inventarioRequest.description;
    inventario.foto = inventarioRequest.foto;
    inventario.color = inventarioRequest.color;
    inventario.fechaCompra = inventarioRequest.fechaCompra;
    inventario.precio = inventarioRequest.precio;
    inventario.usuario = inventarioRequest.usuario._id;
    inventario.marca = inventarioRequest.marca._id;
    inventario.tipoEquipo = inventarioRequest.tipoEquipo._id;
    inventario.estadoEquipo = inventarioRequest.estadoEquipo._id;
    inventario.fechaCreacion = new Date();
    inventario.fechaActualizacion = new Date();
    await inventario.save();
}

export const editarInventario = async (inventarioId, inventarioRequest) => {
    inventarioRequest.fechaActualizacion = new Date();
    await Inventario.findByIdAndUpdate(inventarioId, inventarioRequest);    
}

