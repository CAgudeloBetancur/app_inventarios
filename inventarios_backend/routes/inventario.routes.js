import { Router } from 'express';
import { 
  crearInventarioHandler, 
  editarInventarioHandler, 
  listarInventariosHandler, 
  obtenerInventarioPorIdHandler 
  } from '../handlers/inventarioHandlers.js';
import { validarRolesUsuario } from '../validations/validarRolesUsuario.js';

const inventarioRouter = Router();

// ? Lista de todos los inventarios

inventarioRouter.get('/', validarRolesUsuario(["Administrador", "Docente"]),listarInventariosHandler);

// ? inventario por Id

inventarioRouter.get('/:inventarioId', validarRolesUsuario(["Administrador", "Docente"]), obtenerInventarioPorIdHandler);

// ? Crear un inventario

inventarioRouter.post('/', validarRolesUsuario(["Administrador"]), crearInventarioHandler);

// ? Actualizar un inventario

inventarioRouter.put('/:inventarioId', validarRolesUsuario(["Administrador"]), editarInventarioHandler);

export default inventarioRouter;