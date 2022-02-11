import { Document } from 'mongoose';

export interface IEndereco extends Document {
    _id?: string;
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
}