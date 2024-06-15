import { Router } from 'express';
import { 
  editarUsuarioHandler,
  listarUsuariosHandler,
  crearUsuarioHandler,
  eliminarUsuarioHandler
  } from '../handlers/usuarioHandlers.js';
import { validacionesMetodoPostUsuario, validacionesMetodoPutUsuario } from '../validations/modelsRequests/validationsByModel/validarUsuarioRequests.js';
import { validarParametroIdEnUrl } from '../validations/modelsRequests/commonValidations/validarParametroIdEnUrl.js';
import Usuario from '../models/Usuario.js';

const usuarioRouter = Router();

// ? Listado de usuarios

usuarioRouter.get(
  '/', 
  listarUsuariosHandler
);

// ? Crear un usuario nuevo

usuarioRouter.post(
  '/', 
  validacionesMetodoPostUsuario,
  crearUsuarioHandler
);

// ? Actualizar un usuario

usuarioRouter.put(
  '/:id',
  validacionesMetodoPutUsuario,
  editarUsuarioHandler
);

usuarioRouter.delete(
  '/:id',
  validarParametroIdEnUrl(Usuario),
  eliminarUsuarioHandler
);

export default usuarioRouter;