import { validationResult } from "express-validator";
import { 
  crearEstadoEquipo, 
  editarEstadoEquipo, 
  listarEstadosEquipo 
  } from "../controllers/estadoEquipoControllers.js";

export const listarEstadosEquipoHandler = async (req, res) => {
    try {
      const listaEstadosEquipo = await listarEstadosEquipo();
      res.status(200).send(listaEstadosEquipo);
    } catch (error) {
      console.log(error);
      res.status(500).send('Ocurrio un error');
    }  
}

export const crearEstadoEquipoHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({message: errors.array()});
    }
    await crearEstadoEquipo(req.body);
    res.status(201).json({success: true});
  } catch (error) {
    console.log(error);
    return res.status(500).send('Ocurrio un error');
  }
}

export const editarEstadoEquipoHandler = async (req, res) => {
  try {
    let estadoEquipoFromDb = await EstadoEquipo.findById(req.params.estadoEquipoId);
    if(!estadoEquipo){
      return res.send('No existe el estado indicado');
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()});
    }
    await editarEstadoEquipo(estadoEquipoFromDb, req.body);    
    res.status(201).json({success: true});
  } catch (error) {
    console.log(error);
    return res.status(500).send('Ocurrio un error');
  }
}