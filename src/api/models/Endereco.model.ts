import { IEndereco } from '../interfaces/IEndereco';
import { model, Model, Schema } from 'mongoose';

const EnderecoSchema = new Schema<IEndereco>({
    cep: { type: String, required: true },
    rua: { type: String, required: true },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true, maxlength: 2 },

}, { versionKey: false });

export const EnderecoModel: Model<IEndereco> = model<IEndereco>('Endereco', EnderecoSchema);