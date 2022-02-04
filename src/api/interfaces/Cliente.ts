import { Document } from "mongoose";
import { PessoaFisica } from "./PessoaFisica";

export interface Cliente extends Document {
    codigo: string;
    status: string;
    pessoaFisica: PessoaFisica;
}
