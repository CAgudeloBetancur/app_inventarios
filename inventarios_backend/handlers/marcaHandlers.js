import { validationResult } from "express-validator";
import { 
  crearMarca, 
  editarMarca, 
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
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({message: errors.array()});
    }
    await crearMarca(req.body);
    return res.status(201).json({success: true});
  } catch (error) {
    console.log(error);
    return res.status(500).send('Ocurrio un error');
  }
}

export const editarMarcaHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()});
    }
    await editarMarca(req.params.marcaId, req.body);
    return res.status(201).json({success: true});
  } catch (error) {
    console.log(error);
    return res.status(500).send('Ocurrio un error');
  }
}