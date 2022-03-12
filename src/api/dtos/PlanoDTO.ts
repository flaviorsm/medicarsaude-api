import { StatusEnum } from './../../shared/enum/Status.enum';

export interface PlanoDTO {
    id: string;
    nome: string;
    descricao: string;
    valor: number;
    status: StatusEnum;
}