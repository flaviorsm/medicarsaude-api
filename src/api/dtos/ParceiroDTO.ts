export interface ParceiroDTO {
    //Parceiro
    categoria: string;
    status: string;
    CRM: string;

    //Pessoa
    nome: string;
    email: string;
    telefone: string;

    //PessoaFisica
    cpf: string;
    rg: string;
    dataNascimento: Date;
    
    //PessoaJuridica
    cnpj: string;
    nomeFantasia: string;
    IE: string;
    dataFundacao: Date;

    //Endereco
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    
    pessoa?: any;
    pessoaFisica?: any;
    pessoaJuridica?: any;
    endereco?: any;
}