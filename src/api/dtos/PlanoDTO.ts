import { StatusEnum } from './../../shared/enum/Status.enum';

export interface PlanoDTO {
    nome: string;
    descricao: string;
    valor: number;
    status: StatusEnum;
}