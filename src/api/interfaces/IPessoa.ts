import { Document } from 'mongoose';
import { IEndereco } from './IEndereco';

export interface IPessoa extends Document {
    nome: string;
    email: string;
    telefone: string;
    endereco: IEndereco;
}