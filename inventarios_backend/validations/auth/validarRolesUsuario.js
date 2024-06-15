export const validarRolesUsuario = (authorizedRoles) => {
  return (req, res, next) => {
    if(authorizedRoles.includes(req.user.rol)) {
      next();
    }else {
      return res.status(403).json({error: "No está autorizado"});
    }
  }
}