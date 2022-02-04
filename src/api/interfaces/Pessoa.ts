import { Document } from "mongoose";


export interface Pessoa extends Document {
    nome: string;
    endereco: string;
    email: string;
    telefone: string;
}