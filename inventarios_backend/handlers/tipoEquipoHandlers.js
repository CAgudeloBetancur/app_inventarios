import { 
  crearTipoEquipo, 
  editarTipoEquipo, 
  eliminarTipoEquipo, 
  listarTiposEquipo 
  } from "../controllers/tipoEquipoControllers.js";

export const listarTipoEquipoHandler = async (req, res) => {
  try {    
    const listaTiposEquipo = await listarTiposEquipo();
    return res.status(200).json(listaTiposEquipo);
  } catch (error) {    
    console.log(error);
    return res.status(500).send({error: 'Ocurrio un error en el servidor'});
  }
}

export const crearTipoEquipoHandler = async (req, res) => {
  try {
    await crearTipoEquipo(req.body);
    return res.status(201).json({success: true});      
  } catch (error) {      
    console.log(error);
    return res.status(500).send({error: 'Ocurrio un error'});
  }
}

export const editarTipoEquipoHandler = async (req, res) => {
  try {
    await editarTipoEquipo(req.params.id, req.body);
    return res.status(201).json({success: true});
  } catch (error) {
    console.log(error);
    return res.status(500).send({error: 'Ocurrio un error'});
  }
}

export const eliminarTipoEquipoHandler = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await eliminarTipoEquipo(id);
    if(!result.deleted) {
      if(result.referencias) {
        return res.status(400).json({
          error: `No se puede eliminar este registro porque está referenciado por ${result.referencias} inventario(s)`
        });
      }
      return res.status(400).json({error: "tipoEquipo inexistente"});
    }
    return res.status(200).json(result);    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Algo salió mal"});
  }
}