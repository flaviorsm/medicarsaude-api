
export interface ClienteDTO {
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    rg: string;
    dataNascimento: Date,
    codigo: string;
    status: string;
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    pessoaFisica?: any;
    pessoa?: any;
    endereco?: any;
}