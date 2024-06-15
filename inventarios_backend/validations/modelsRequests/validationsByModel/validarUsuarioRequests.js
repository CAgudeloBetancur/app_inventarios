import { check } from 'express-validator';
import { estadosModelo } from '../../../utils/valoresComunes.js';
import { ejecutarCadenaDeValidaciones } from '../ejecutarCadenaDeValidaciones.js';
import { validarParametroIdEnUrl } from '../commonValidations/validarParametroIdEnUrl.js';

const validarPropiedadesExistentesEnBody = [
  check('nombre', 'nombre requerido')
    .exists()
    .bail()
    .notEmpty(),
  check('email', 'No se envió un email, o el que se envió no es valido')
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isEmail(),
  check('password', 'La contraseña es obligatoria; debe tener mínimo 6 caracteres (letras y numeros)')
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,}$/, 'i'),
  check('estado', 'No se envió un estado, o el que se envió no es válido')
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isIn(estadosModelo),
  check('rol', 'No se envió el rol, o el rol ingresado no es correcto')
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isIn(['Administrador', 'Docente'])
];

export const validacionesMetodoPostUsuario = ejecutarCadenaDeValidaciones(
  validarPropiedadesExistentesEnBody
);

export const validacionesMetodoPutUsuario = ejecutarCadenaDeValidaciones(
  [...validarPropiedadesExistentesEnBody, ...validarParametroIdEnUrl]
);