import { param } from "express-validator";

export const validarParametroIdEnUrl = (modelo) => {
  
  return [
    param('id')
      .exists()
      .withMessage('No se envió un id en la url')
      .bail()
      .isMongoId()
      .withMessage('El id que se envió en la Url no tiene formato apropiado')
      .bail()
      .custom(async (value, {req}) => {
        const elementoExistente = await modelo.findById(req.params.id) 
        if(!elementoExistente) {
          throw new Error('El id pasado por Url no referencia un elemento existente');
        } 
      })
  ];
}