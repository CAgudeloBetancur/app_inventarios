import { validationResult } from "express-validator";
import { 
  signUp, 
  listarUsuarios, 
  editarUsuario, 
  logIn,
  refreshToken
  } from "../controllers/usuarioControllers.js";
import Usuario from "../models/Usuario.js";
import { crearTokens } from "../utils/jwtUtils.js";
import { validarRefreshToken } from "../validations/validarRefreshToken.js";

export const signUpHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({message: errors.array()});
    }
    const usuario_id_rol = await signUp(req.body);
    const {accessToken, refreshToken} = await crearTokens(usuario_id_rol);
    res.status(201).json({success: true, accessToken, refreshToken});
  } catch (error) {
    console.log(error);
    return res.status(500).send('Ocurrio un error');
  }
}

export const logInHandler = async (req, res) => {
  try {
    const user = await logIn(req.body);
    const {accessToken, refreshToken} = await crearTokens({_id: user._id, rol: user.rol});
    return res.status(201).json({accessToken, refreshToken, user});
  } catch (error) {
    console.log(error);
    res.status(500).json('Ha ocurrido un error');
  }

}

export const refreshTokenHandler = async (req, res) => {
  try {
    const userPayload = await validarRefreshToken(req.body.refreshToken);
    const accessToken = await refreshToken(userPayload);
    return res.status(200).json({accessToken});    
  } catch (error) {
    console.log(error);
    return res.status(400).json({error: 'Ocurrio un error'});
  }
}

export const listarUsuariosHandler = async (req, res) => {
  try {
    const listaUsuarios = await listarUsuarios();
    return res.status(200).json(listaUsuarios);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Ocurrio un error');
  }
}

export const editarUsuarioHandler = async (req, res) => {
  try {
    let existeEmail = await Usuario.findOne({
      email: req.body.email, 
      _id: { $ne: usuario._id }
    });
    if(existeEmail) {
      return res.status(400).json({message: 'Este Email ya existe'})
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()});
    }
    await editarUsuario(req.params.usuarioId, req.body);
    return res.status(201).json({success: true});
  } catch (error) {
    console.log(error);
    return res.status(500).send('Ocurrio un error');
  }
}