import { validationResult } from "express-validator";
import { 
  crearTipoEquipo, 
  editarTipoEquipo, 
  listarTiposEquipo 
  } from "../controllers/tipoEquipoControllers.js";

export const listarTipoEquipoHandler = async (req, res) => {
  try {    
    const listaTiposEquipo = await listarTiposEquipo();
    return res.status(200).json(listaTiposEquipo);
  } catch (error) {    
    console.log(error);
    return res.status(500).send('Ocurrio un error en el servidor');
  }
}

export const crearTipoEquipoHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({
        messages: errors.array()
      });
    }
    await crearTipoEquipo(req.body);
    return res.status(201).json({success: true});      
  } catch (error) {      
    console.log(error);
    return res.status(500).send('Ocurrio un error');
  }
}

export const editarTipoEquipoHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()});
    }
    await editarTipoEquipo(req.params.tipoEquipoId, req.body);
    return res.status(201).json({success: true});
  } catch (error) {
    console.log(error);
    return res.status(500).send('Ocurrio un error');
  }
}