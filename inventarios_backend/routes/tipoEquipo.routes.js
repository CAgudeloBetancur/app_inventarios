import { Router } from 'express';
import { 
  editarTipoEquipoHandler, 
  crearTipoEquipoHandler, 
  listarTipoEquipoHandler, 
  eliminarTipoEquipoHandler
  } from '../handlers/tipoEquipoHandlers.js';
import { validacionesMetodoPostTipoEquipo, validacionesMetodoPutTipoEquipo } from '../validations/modelsRequests/validationsByModel/validarTipoEquipoRequests.js';
import { validarParametroIdEnUrl } from '../validations/modelsRequests/commonValidations/validarParametroIdEnUrl.js';

const tipoEquipoRouter = Router();

// ? Obtener todos los tipos de equipo

tipoEquipoRouter.get('/', listarTipoEquipoHandler);

// ? Crear un nuevo tipo de equipo

tipoEquipoRouter.post(
  '/', 
  validacionesMetodoPostTipoEquipo,
  crearTipoEquipoHandler
);

// ? Actualizar un tipo de equipo

tipoEquipoRouter.put(
  '/:id',
  validacionesMetodoPutTipoEquipo,
  editarTipoEquipoHandler
);

tipoEquipoRouter.delete(
  '/:id',
  validarParametroIdEnUrl,
  eliminarTipoEquipoHandler
);

export default tipoEquipoRouter;