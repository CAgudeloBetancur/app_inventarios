import { 
  crearInventario, 
  editarInventario, 
  listarInventarios, 
  obtenerInventarioPorId 
  } from "../controllers/inventarioControllers.js";

export const listarInventariosHandler = async (req, res) => {
  try {
    const listaInventarios = await listarInventarios();
    res.status(200).json(listaInventarios);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Ocurrio un error al consultar los inventarios');
  }
}

export const obtenerInventarioPorIdHandler = async (req, res) => {
  try {
    const inventario = await obtenerInventarioPorId(req.params.inventarioId);
    if(!inventario) {
      return res.status(400).send({message: 'No existe este inventario'});
    }
    res.status(200).json(inventario);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({message: 'Ha ocurrido un error al consultar el inventario'});
  }
}

export const crearInventarioHandler = async (req, res) => {
  try {
    const inventarioExistentePorSerial = await Inventario
      .findOne({serial: req.body.serial});
    if(inventarioExistentePorSerial) {
      return res
        .status(400)
        .json({message: 'Ya existe el serial indicado en otro equipo'});
    }
    await crearInventario(req.body);
    res.status(201).json({success: true});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({message: 'Ocurrio un error al intentar crear este inventario'});
  }
}

export const editarInventarioHandler = async (req, res) => {
  try {
    const inventarioExistentePorSerial = await Inventario.findOne({
      serial: req.body.serial, 
      _id: {$ne: inventario._id}
    });
    if(inventarioExistentePorSerial) {
      return res
        .status(400)
        .json({message: 'Ya existe el serial indicado en otro equipo'});
    }
    await editarInventario(req.params.inventarioId, req.body);
    return res.status(201).json({success: true});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({message: 'Ocurrio un error al actualizar este inventario'});
  }
}