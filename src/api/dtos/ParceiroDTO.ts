export interface ParceiroDTO {
    id?: string;
    categoria: any;
    status: number;
    planos: any[];

    nome: string;
    email: string;
    telefone: string;

    cpf?: string;
    rg?: string;
    CRM: string;
    dataNascimento?: Date;

    cnpj?: string;
    nomeFantasia?: string;
    IE?: string;
    dataFundacao?: Date;

    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;

    pessoaFisica?: any;
    pessoaJuridica?: any;
    pessoa?: any;
    endereco?: any;
}