import {Schema, model} from "mongoose";

const UsuarioTokenSchema = new Schema({
  usuarioId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
    expires: 7 * 86400 // 7 días
  }
});

export default model('UsuarioToken', UsuarioTokenSchema);