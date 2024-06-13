import { Schema, model } from 'mongoose';

const InventarioSchema = Schema({
  serial: {
    type: String,
    required: true,
    unique: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  fechaCompra: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: false
  },
  marca: {
    type: Schema.Types.ObjectId, 
    ref: 'Marca',
    required: true,
  },
  tipoEquipo: {
    type: Schema.Types.ObjectId, 
    ref: 'TipoEquipo',
    required: true,
  },
  estadoEquipo: {
    type: Schema.Types.ObjectId,
    ref: 'EstadoEquipo',
    required: true,
  },
  fechaCreacion: {
    type: Date,
    required: true,
  },
  fechaActualizacion: {
    type: Date,
    required: true
  }
});

export default model('Inventario', InventarioSchema);