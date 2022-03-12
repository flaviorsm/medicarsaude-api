export interface ParceiroDTO {
    id?: string;
    categoria: string;
    status: number;
    CRM: string;

    nome: string;
    email: string;
    telefone: string;

    cpf?: string;
    rg?: string;
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