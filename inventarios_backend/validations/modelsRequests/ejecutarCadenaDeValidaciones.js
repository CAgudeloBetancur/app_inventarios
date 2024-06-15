import { validationResult } from "express-validator";

export const ejecutarCadenaDeValidaciones = (cadenaDeValidaciones) => {
  return (req, res, next) => {
    const listaEjecutablesDeValidaciones = cadenaDeValidaciones.map(v => v.run(req));
    Promise.all(listaEjecutablesDeValidaciones)
      .then(() => {
        const errors = validationResult(req);
        console.log(validationResult(req).array())
        if(!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array({ onlyFirstError: true })});
        }
        next();
      })
      .catch(next);    
  }
}