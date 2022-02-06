import { Document } from "mongoose";
import { IPessoaFisica } from "./IPessoaFisica";

export interface ICliente extends Document {
    codigo: string;
    status: string;
    pessoaFisica: IPessoaFisica;
}
