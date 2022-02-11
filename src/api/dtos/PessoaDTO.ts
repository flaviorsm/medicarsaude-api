import { EnderecoDTO } from "./EnderecoDTO";

export interface PessoaDTO extends EnderecoDTO {
    nome: string;
    email: string;
    telefone: string;
}