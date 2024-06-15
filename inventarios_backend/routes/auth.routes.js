import { Router } from "express";
import { logInHandler, refreshTokenHandler } from "../handlers/authHandler.js";

const authRouter = Router();

authRouter.post('/signin', logInHandler);
authRouter.post('/refresh', refreshTokenHandler);

export default authRouter;