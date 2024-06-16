import { Router } from 'express';
import { 
  listarEstadosEquipoHandler, 
  crearEstadoEquipoHandler, 
  editarEstadoEquipoHandler, 
  eliminarEstadoEquipoHandler
  } from '../handlers/estadoEquipoHandlers.js';
import { 
  validacionesMetodoPostEstadoEquipo,
  validacionesMetodoPutEstadoEquipo
  } from './../validations/modelsRequests/validationsByModel/validarEstadoEquipoRequests.js'
import { 
  validarParametroIdEnUrl 
  } from '../validations/modelsRequests/commonValidations/validarParametroIdEnUrl.js';
import EstadoEquipo from '../models/EstadoEquipo.js';

const estadoEquipoRouter = Router();

// ? Listar todos los estados existentes

estadoEquipoRouter.get('/', listarEstadosEquipoHandler);

// ? Crear un nuevo estado

estadoEquipoRouter.post(
  '/',
  validacionesMetodoPostEstadoEquipo,
  crearEstadoEquipoHandler
);

// ? Eliminar un estado de equipo

estadoEquipoRouter.put(
  '/:id',
  validacionesMetodoPutEstadoEquipo,
  editarEstadoEquipoHandler
);

estadoEquipoRouter.delete(
  '/:id',
  validarParametroIdEnUrl(EstadoEquipo),
  eliminarEstadoEquipoHandler
);

export default estadoEquipoRouter;