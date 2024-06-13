import { Router } from 'express';
import { check } from 'express-validator';
import { 
  signUpHandler,
  editarUsuarioHandler,
  listarUsuariosHandler,
  logInHandler,
  refreshTokenHandler
  } from '../handlers/usuarioHandlers.js';
import { validarRolesUsuario } from '../validations/validarRolesUsuario.js';
import { autenticacionRequerida } from '../validations/autenticacionRequerida.js';

const usuarioRouter = Router();

// ? Listado de usuarios

usuarioRouter.get('/', autenticacionRequerida, validarRolesUsuario(["Administrador"]), listarUsuariosHandler);

// ? Crear un usuario nuevo

// usuarioRouter.post(
//   '/signup',
//   [
//     check('nombre', 'nombre.required').not().isEmpty(),
//     check('email', 'email.required').isEmail(),
//     check('estado', 'estado.required').isIn(['Activo', 'Inactivo'])
//   ],
//   signUpHandler
// );

usuarioRouter.post('/signup', signUpHandler);

usuarioRouter.post('/signin', logInHandler);

usuarioRouter.post('/refresh', refreshTokenHandler);

// ? Actualizar un usuario

usuarioRouter.put(
  '/:usuarioId',
  autenticacionRequerida,
  validarRolesUsuario(["Administrador"]),
  [
    check('nombre', 'nombre.required').not().isEmpty(),
    check('email', 'email.required').isEmail(),
    check('estado', 'estado.required').isIn(['Activo', 'Inactivo'])
  ],
  editarUsuarioHandler
);

export default usuarioRouter;