import { 
  crearUsuario, 
  listarUsuarios, 
  editarUsuario,
  eliminarUsuario, 
  } from "../controllers/usuarioControllers.js";
import { crearTokens } from "../utils/jwtUtils.js";
import UsuarioToken from "../models/UsuarioToken.js";

export const crearUsuarioHandler = async (req, res) => {
  try {
    const usuario_id_rol = await crearUsuario(req.body);
    const {accessToken, refreshToken} = await crearTokens(usuario_id_rol);
    res.status(201).json({success: true, accessToken, refreshToken});
  } catch (error) {
    console.log(error);
    return res.status(500).send({error: 'Ocurrio un error'});
  }
}

export const listarUsuariosHandler = async (req, res) => {
  try {
    const listaUsuarios = await listarUsuarios();
    return res.status(200).json(listaUsuarios);
  } catch (error) {
    console.log(error);
    return res.status(500).send({error: 'Ocurrio un error'});
  }
}

export const editarUsuarioHandler = async (req, res) => {
  try {
    const usuario_id_rol = await editarUsuario(req.params.id, req.body);
    const {accessToken, refreshToken} = await crearTokens(usuario_id_rol);
    return res.status(201).json({success: true, accessToken, refreshToken});
  } catch (error) {
    console.log(error);
    return res.status(500).send({error: 'Ocurrio un error'});
  }
}

export const eliminarUsuarioHandler = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await eliminarUsuario(id);
    if(!result.deleted) {
      if(result.referencias) {
        return res.status(400).json({
          error: `No se puede eliminar este registro porque está referenciado por ${result.referencias} inventario(s)`
        });
      }
      return res.status(400).json({error: "usuario inexistente"});
    }
    return res.status(200).json(result);    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Algo salió mal"})
  }
}