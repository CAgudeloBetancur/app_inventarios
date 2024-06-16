import { Router } from "express";
import { logInHandler, refreshTokenHandler } from "../handlers/authHandler.js";
import { validacionesSignIn } from "../validations/auth/validarSigninBody.js";
import { validacionesRefresh } from "../validations/auth/validarRefreshBody.js";

const authRouter = Router();

authRouter.post(
  '/signin', 
  validacionesSignIn,
  logInHandler
);

authRouter.post(
  '/refresh', 
  validacionesRefresh,
  refreshTokenHandler);

export default authRouter;