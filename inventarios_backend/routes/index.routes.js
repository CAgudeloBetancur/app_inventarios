import { Router } from "express";
import estadoEquipoRouter from "./estadoEquipo.routes.js";
import inventarioRouter from "./inventario.routes.js";
import marcaRouter from "./marca.routes.js";
import tipoEquipoRouter from "./tipoEquipo.routes.js";
import usuarioRouter from "./usuario.routes.js";
import { autenticacionRequerida } from "../validations/auth/autenticacionRequerida.js";
import { validarRolesUsuario } from "../validations/auth/validarRolesUsuario.js";
import authRouter from "./auth.routes.js";

const router = Router();

router.use(
  "/auth",
  authRouter
)

router.use(autenticacionRequerida);

router.use(
  "/usuario", 
  validarRolesUsuario(["Administrador"]),
  usuarioRouter
);
router.use(
  "/estadoEquipo", 
  validarRolesUsuario(["Administrador"]), 
  estadoEquipoRouter
);
router.use(
  "/inventario", 
  inventarioRouter
);
router.use(
  "/marca", 
  validarRolesUsuario(["Administrador"]),
  marcaRouter
);
router.use(
  "/tipoEquipo", 
  validarRolesUsuario(["Administrador"]), 
  tipoEquipoRouter
);

export default router;