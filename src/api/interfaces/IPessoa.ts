import { Document } from "mongoose";

export interface IPessoa extends Document {
    nome: string;
    endereco: string;
    email: string;
    telefone: string;
}