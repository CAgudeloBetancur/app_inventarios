import { check } from 'express-validator';
import { estadosModelo } from '../../../utils/valoresComunes.js';
import { ejecutarCadenaDeValidaciones } from '../ejecutarCadenaDeValidaciones.js';
import { validarParametroIdEnUrl } from '../commonValidations/validarParametroIdEnUrl.js';
import Usuario from '../../../models/Usuario.js';

const validarEmailExistente = () => {
  return async (value, {req}) => {
    if(req.method === 'POST') {
      const emailExistente = await Usuario.findOne({email: value});
      if(emailExistente) {
        throw new Error('El email ingresado ya existe');
      }
    }
    if(req.method === 'PUT') {
      let emailExistente = await Usuario.findOne({
        email: req.body.email, 
        _id: { $ne: usuario._id } // diferente al usuario actual
      });
      if(emailExistente) {
        throw new Error ('Este Email ya está en uso por otro usuario');
      }
    }
  }
}

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
    .isEmail()
    .bail()
    .custom(validarEmailExistente()),
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
  [...validarPropiedadesExistentesEnBody, ...validarParametroIdEnUrl(Usuario)]
);