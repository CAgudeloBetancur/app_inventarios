import { check } from 'express-validator';
import { estadosModelo } from '../../../utils/valoresComunes.js';
import { ejecutarCadenaDeValidaciones } from '../../ejecutarCadenaDeValidaciones.js';
import { validarParametroIdEnUrl } from '../commonValidations/validarParametroIdEnUrl.js';
import EstadoEquipo from '../../../models/EstadoEquipo.js';

const validarPropiedadesExistentesEnBody = [
  check('nombre', 'nombre requerido')
    .exists()
    .bail()
    .notEmpty(),
  check('estado', 'No se envió un estado, o el que se envió no es válido')
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isIn(estadosModelo)
];

export const validacionesMetodoPostEstadoEquipo = ejecutarCadenaDeValidaciones(
  validarPropiedadesExistentesEnBody
);

export const validacionesMetodoPutEstadoEquipo = ejecutarCadenaDeValidaciones(
  [...validarPropiedadesExistentesEnBody, ...validarParametroIdEnUrl(EstadoEquipo)]
);