import { check } from "express-validator";
import { ejecutarCadenaDeValidaciones } from "../ejecutarCadenaDeValidaciones.js";

const validarPropiedadesExistentesEnBody = [
  check('email', 'No se envió un email para autenticación')
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isEmail(),
  check('password', 'No se envió password para autenticación')
    .exists()
    .bail()
    .notEmpty()
]

export const validacionesSignIn = ejecutarCadenaDeValidaciones(
  validarPropiedadesExistentesEnBody
);