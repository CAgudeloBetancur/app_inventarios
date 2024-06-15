import { 
  crearEstadoEquipo, 
  editarEstadoEquipo, 
  eliminarEstadoEquipo, 
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
    await crearEstadoEquipo(req.body);
    res.status(201).json({success: true});
  } catch (error) {
    console.log(error);
    return res.status(500).send('Ocurrio un error');
  }
}

export const editarEstadoEquipoHandler = async (req, res) => {
  try {
    await editarEstadoEquipo(req.params.id, req.body);    
    res.status(201).json({success: true});
  } catch (error) {
    console.log(error);
    return res.status(500).send('Ocurrio un error');
  }
}

export const eliminarEstadoEquipoHandler = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await eliminarEstadoEquipo(id);
    if(!result.deleted) return res.status(400).json({error: "EstadoEquipo inexistente"});
    return res.status(200).json(result);    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Algo salió mal"})
  }
}