import { Document } from "mongoose";
import { StatusEnum } from "../../shared/enum/Status.enum";
import { IPessoaFisica } from "./IPessoaFisica";

export interface ICliente extends Document {
    codigo: string;
    status: string;
    pessoaFisica: IPessoaFisica;
}
