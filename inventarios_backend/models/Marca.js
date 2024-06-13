import { Schema, model } from 'mongoose';

const MarcaSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
    enum: [
      'Activo', 'Inactivo'
    ]
  },
  fechaCreacion: {
    type: Date,
    required: true,
  },
  fechaActualizacion: {
    type: Date,
    required: true,
  }
});

export default model('Marca', MarcaSchema);