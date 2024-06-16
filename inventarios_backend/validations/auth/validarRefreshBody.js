import { check } from "express-validator";
import { ejecutarCadenaDeValidaciones } from "../ejecutarCadenaDeValidaciones.js";

const validarPropiedadesExistentesEnBody = [
  check(
    'refreshToken', 
    'No se envió la propiedad refreshToken, o el valor que se envió no es válido')
    .exists()
    .bail()
    .notEmpty()
    .isJWT()
]

export const validacionesRefresh = ejecutarCadenaDeValidaciones(
  validarPropiedadesExistentesEnBody
);