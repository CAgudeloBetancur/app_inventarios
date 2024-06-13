import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
    enum: ['Activo', 'Inactivo']
  },
  rol: {
    type: String,
    enum: ["Administrador", "Docente"],
    required: true
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

export default model('Usuario', UsuarioSchema);