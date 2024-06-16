import { check } from 'express-validator';
import { estadosModelo } from '../../../utils/valoresComunes.js';
import { ejecutarCadenaDeValidaciones } from '../../ejecutarCadenaDeValidaciones.js';
import { validarParametroIdEnUrl } from '../commonValidations/validarParametroIdEnUrl.js';
import Marca from './../../../models/Marca.js';
import Usuario from './../../../models/Usuario.js';
import TipoEquipo from './../../../models/TipoEquipo.js';
import EstadoEquipo from './../../../models/EstadoEquipo.js';
import Inventario from '../../../models/Inventario.js';

// tipoMsg --> 1 = no existe | 2 = existe, pero Inactivo
const crearMensaje = (tipoMsg, id, propiedad) => {
  const msgP1 = "El _id"
  const msgP2 = "en la propiedad";
  const msgP3 = "no referencia un elemento existente en la base de datos";
  const msgP4 = "referencia un elemento existente, pero Inactivo; solo se admiten elementos Activos";
  return `${msgP1} ${id} ${msgP2} ${propiedad} ${(tipoMsg === 1) ? msgP3 : msgP4}`;
}

const validarFormatoYReferenciaAOtrosModelos = modelo => {
  return async (value, obj) => {
    const prop = obj.path.split('.')[0];
    const resultado = await modelo.findById({_id: value});
    if(!resultado) throw new Error(crearMensaje(1, value, prop));
    if(resultado.estado !== 'Activo') throw new Error(crearMensaje(2, value, obj.path));
    return true;
  }
}

const idValidoParaMongo = (id) => {
  return (/^[0-9a-fA-F]{24}$/).test(id);
} 

const validarSerial = modelo => {
  return async (value, {req}) => {
    if(req.method === 'POST') {
      const serialDuplicado = await modelo.findOne({serial: value});   
      if(serialDuplicado) {
        throw new Error('Serial duplicado; ya existe en la base de datos y debe ser único');
      } 
    }
    if(req.method === 'PUT') {
      if(idValidoParaMongo(req.params.id)) {
        const elementoExistente = await modelo.findById(req.params.id);
        if(elementoExistente) {
          const serialExistente = await modelo.findOne({
            serial: value,
            _id: {$ne: elementoExistente._id}
          });
          if(serialExistente) {
            throw new Error('Serial duplicado; ya existe en la base de datos y debe ser único');
          }
        }
      } 
    }
  }
}

const validarPropiedadesExistentesEnBody = [
  check('serial', 'Serial requerido')
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .custom(validarSerial(Inventario)),
  check('modelo', 'Modelo requerido')
    .exists()
    .bail()
    .notEmpty(),
  check('descripcion', 'Descripción requerida')
    .exists()
    .bail()
    .notEmpty(),
  check('color', 'Color requerido')
    .exists()
    .bail()
    .notEmpty(),
  check('foto', 'Foto requerida')
    .exists()
    .bail()
    .notEmpty(),
  check('fechaCompra', 'No se envió fecha de compra, o la que se envió no está en el formato correcto (YYYY-mm-dd)')
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isISO8601(),
  check('precio', 'Precio Requerido')
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isFloat({min:0}),
  check('marca', 'No se envió la propiedad marca, o se envió vacía')
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isMongoId()
    .bail()
    .custom(validarFormatoYReferenciaAOtrosModelos(Marca)),
  check('tipoEquipo', 'No se envió la propiedad tipoEquipo, o se envió vacía')
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isMongoId()
    .bail()
    .custom(validarFormatoYReferenciaAOtrosModelos(TipoEquipo)),
  check('usuario', 'No se envió la propiedad usuario, o se envió vacía')
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isMongoId()
    .bail()
    .custom(validarFormatoYReferenciaAOtrosModelos(Usuario)),
  check('estadoEquipo', 'No se envió la propiedad estadoEquipo, o se envió vacía')
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isMongoId()
    .bail()
    .custom(validarFormatoYReferenciaAOtrosModelos(EstadoEquipo))
];

export const validacionesMetodoPostInventario = ejecutarCadenaDeValidaciones(
  validarPropiedadesExistentesEnBody
);

export const validacionesMetodoPutInventario = ejecutarCadenaDeValidaciones(
  [...validarParametroIdEnUrl(Inventario), ...validarPropiedadesExistentesEnBody]
);