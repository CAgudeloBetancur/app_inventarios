import { validarRefreshToken } from "../validations/auth/validarRefreshToken.js";
import { logIn, refreshToken } from "../controllers/authControllers.js";
import { crearTokens } from "../utils/jwtUtils.js";

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