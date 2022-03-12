
export interface PagamentoDTO {
    id?: string;
    codigo: string;
    referencia: Date;
    valorPago: number;
    dataVencimento: Date;
    dataPagamento: Date;
    status: string;
    contrato?: any;
}