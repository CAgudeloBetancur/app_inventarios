import { param } from "express-validator";

export const validarParametroIdEnUrl = [
  param('id', 'No se envió un id en la url, o el que se envió no es correcto')
    .exists()
    .bail()
    .isMongoId(),
];