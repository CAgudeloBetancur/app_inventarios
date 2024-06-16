import { Router } from 'express';
import { 
  crearInventarioHandler, 
  editarInventarioHandler, 
  eliminarInventarioHandler, 
  listarInventariosHandler, 
  obtenerInventarioPorIdHandler 
  } from '../handlers/inventarioHandlers.js';
import { validarRolesUsuario } from '../validations/auth/validarRolesUsuario.js';
import { 
  validacionesMetodoPutInventario, 
  validacionesMetodoPostInventario 
  } from '../validations/modelsRequests/validationsByModel/validarInventarioRequests.js';
import { 
  validarParametroIdEnUrl 
  } from '../validations/modelsRequests/commonValidations/validarParametroIdEnUrl.js';
import Inventario from '../models/Inventario.js';

const inventarioRouter = Router();

// ? Lista de todos los inventarios

inventarioRouter.get(
  '/', 
  validarRolesUsuario(["Administrador", "Docente"]),
  listarInventariosHandler
);

inventarioRouter.use( validarRolesUsuario(["Administrador"]) )

// ? inventario por Id

inventarioRouter.get(
  '/:id', 
  validarParametroIdEnUrl(Inventario),
  obtenerInventarioPorIdHandler
);

// ? Crear un inventario

inventarioRouter.post(
  '/',  
  validacionesMetodoPostInventario,
  crearInventarioHandler
);

// ? Actualizar un inventario

inventarioRouter.put(
  '/:id', 
  validacionesMetodoPutInventario,
  editarInventarioHandler
);

inventarioRouter.delete(
  '/:id',
  validarParametroIdEnUrl(Inventario),
  eliminarInventarioHandler
);

export default inventarioRouter;