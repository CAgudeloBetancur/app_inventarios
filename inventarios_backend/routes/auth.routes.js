import { Router } from "express";
import { signUpHandler } from "../handlers/authHandler.js";
import { listarUsuariosHandler, logInHandler } from "../handlers/usuarioHandlers.js";

const authRouter = Router();

authRouter.post("/signup", signUpHandler);
authRouter.get("/", listarUsuariosHandler);
authRouter.post("/signin", logInHandler);

export default authRouter;