import { RepositoryBase } from '../../core/RepositoryBase';
import { EnderecoDTO } from '../dtos/EnderecoDTO';
import { IEndereco } from '../interfaces/IEndereco';
import { EnderecoModel } from './../models/Endereco.model';

export class EnderecoRepository extends RepositoryBase<IEndereco, EnderecoDTO> {

    constructor() {
        super(EnderecoModel);
    }
}