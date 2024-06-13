import { Router } from 'express';
import { check } from 'express-validator';
import { 
  editarTipoEquipoHandler, 
  crearTipoEquipoHandler, 
  listarTipoEquipoHandler 
  } from '../handlers/tipoEquipoHandlers.js';

const tipoEquipoRouter = Router();

// ? Obtener todos los tipos de equipo

tipoEquipoRouter.get('/', listarTipoEquipoHandler);

// ? Crear un nuevo tipo de equipo

tipoEquipoRouter.post(
  '/', 
  [
    check('nombre', 'nombre.requerido').not().isEmpty(),
    check('estado', 'estado.requerido').isIn(['Activo', 'Inactivo'])
  ],
  crearTipoEquipoHandler
);

// ? Actualizar un tipo de equipo

tipoEquipoRouter.put(
  '/:tipoEquipoId',
  [
    check('nombre', 'nombre.requerido').not().isEmpty(),
    check('estado', 'estado.requerido').isIn(['Activo','Inactivo'])
  ],
  editarTipoEquipoHandler
);

export default tipoEquipoRouter;