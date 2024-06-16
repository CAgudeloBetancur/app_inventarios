import { Router } from 'express';
import { 
  listarMarcasHandler, 
  crearMarcaHandler, 
  editarMarcaHandler, 
  eliminarMarcaHandler
  } from '../handlers/marcaHandlers.js';
import { 
  validacionesMetodoPostMarca, 
  validacionesMetodoPutMarca 
  } from '../validations/modelsRequests/validationsByModel/validarMarcaRequests.js';
import { 
  validarParametroIdEnUrl 
  } from '../validations/modelsRequests/commonValidations/validarParametroIdEnUrl.js';
import Marca from '../models/Marca.js';

const marcaRouter = Router();

// ? Listado de marcas existentes

marcaRouter.get('/', listarMarcasHandler);

// ? Crear una marca nueva

marcaRouter.post(
  '/',
  validacionesMetodoPostMarca,
  crearMarcaHandler
);

// ? Actualizar una marca

marcaRouter.put(
  '/:id',
  validacionesMetodoPutMarca,
  editarMarcaHandler
);

marcaRouter.delete(
  '/:id',
  validarParametroIdEnUrl(Marca),
  eliminarMarcaHandler
);

export default marcaRouter;