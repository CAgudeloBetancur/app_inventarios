import { Router } from 'express';
import { check } from 'express-validator';
import { 
  listarMarcasHandler, 
  crearMarcaHandler, 
  editarMarcaHandler 
  } from '../handlers/marcaHandlers.js';

const marcaRouter = Router();

// ? Listado de marcas existentes

marcaRouter.get('/', listarMarcasHandler);

// ? Crear una marca nueva

marcaRouter.post(
  '/',
  [
    check('nombre', 'nombre.required').not().isEmpty(),
    check('estado', 'estado.required').isIn(['Activo', 'Inactivo'])
  ],
  crearMarcaHandler
);

// ? Actualizar una marca

marcaRouter.put(
  '/:marcaId',
  [
    check('nombre', 'nombre.requerido').not().isEmpty(),
    check('estado', 'estado.requerido').isIn(['Activo','Inactivo'])
  ],
  editarMarcaHandler
);

export default marcaRouter;