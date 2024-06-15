import { 
  crearMarca, 
  editarMarca, 
  eliminarMarca, 
  listarMarcas 
  } from "../controllers/marcaControllers.js";

export const listarMarcasHandler = async (req, res) => {
  try {
    const listaMarcas = await listarMarcas();
    return res.status(200).json(listaMarcas);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Ocurrio un error');
  }
}

export const crearMarcaHandler = async (req, res) => {
  try {
    await crearMarca(req.body);
    return res.status(201).json({success: true});
  } catch (error) {
    console.log(error);
    return res.status(500).send('Ocurrio un error');
  }
}

export const editarMarcaHandler = async (req, res) => {
  try {
    await editarMarca(req.params.id, req.body);
    return res.status(201).json({success: true});
  } catch (error) {
    console.log(error);
    return res.status(500).send('Ocurrio un error');
  }
}

export const eliminarMarcaHandler = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await eliminarMarca(id);
    if(!result.deleted) return res.status(400).json({error: "EstadoEquipo inexistente"});
    return res.status(200).json(result);    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Algo salió mal"})
  }
}