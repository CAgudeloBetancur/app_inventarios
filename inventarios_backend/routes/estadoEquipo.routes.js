import { Router } from 'express';
import { check } from 'express-validator';
import { 
  listarEstadosEquipoHandler, 
  crearEstadoEquipoHandler, 
  editarEstadoEquipoHandler 
  } from '../handlers/estadoEquipoHandlers.js';

const estadoEquipoRouter = Router();

// ? Listar todos los estados existentes

estadoEquipoRouter.get('/', listarEstadosEquipoHandler);

// ? Crear un nuevo estado

estadoEquipoRouter.post(
  '/',
  [
    check('nombre', 'nombre.required').not().isEmpty(),
    check('estado', 'estado.required').isIn(['Activo', 'Inactivo'])
  ],
  crearEstadoEquipoHandler
);

// ? Eliminar un estado de equipo

estadoEquipoRouter.put(
  '/:estadoEquipoId',
  [
    check('nombre', 'nombre.required').not().isEmpty(),
    check('estado', 'estado.required').isIn(['Activo', 'Inactivo'])
  ],
  editarEstadoEquipoHandler
);

export default estadoEquipoRouter;