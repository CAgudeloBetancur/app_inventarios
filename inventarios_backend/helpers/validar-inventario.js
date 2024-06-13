const validarInventario = (req) => {
  const validaciones = [];
  if(!req.body.serial) {
    validaciones.push('Serial es requerido');
  }
  if(!req.body.modelo) {
    validaciones.push('Modelo es requerido');
  }
  if(!req.body.description) {
    validaciones.push('Description es requerido');
  }
  if(!req.body.foto) {
    validaciones.push('Foto es requerida');
  }
  if(!req.body.fechaCompra) {
    validaciones.push('Fecha de Compra es requerida');
  }
  if(!req.body.precio) {
    validaciones.push('Precio es requerido');
  }
  if(!req.body.usuario) {
    validaciones.push('Usuario es requerido');
  }
  if(!req.body.marca) {
    validaciones.push('Marca es requerido');
  }
  if(!req.body.tipoEquipo) {
    validaciones.push('Tipo de Equipo es requerido');
  }
  if(!req.body.estadoEquipo) {
    validaciones.push('Estado de Equipo es requerido');
  }
  return validaciones;
}

module.exports = {
  validarInventario,
}