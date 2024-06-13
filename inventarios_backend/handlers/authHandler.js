import { signUp } from "../controllers/authControllers.js"

export const signUpHandler = async (req, res) => {
  signUp();
  return res.status(200).json({saludo: "Hola mi perro"});
}