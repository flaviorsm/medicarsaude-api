import { IEndereco } from '../interfaces/IEndereco';
import { EnderecoModel } from './../models/Endereco.model';
import { Repository } from "../../shared/utils/Repository";

export class EnderecoRepository implements Repository<IEndereco> {
    
    async find(query: any): Promise<(IEndereco & { _id: string; })[]> {
        return await EnderecoModel.find(query);
    }

    async findOne(query: any): Promise<IEndereco & { _id: string; }> {
        return await EnderecoModel.findOne(query);
    }

    async findById(id: string): Promise<IEndereco & { _id: string; }> {
        return await EnderecoModel.findById(id);
    }

    async create(entity: any, session: any): Promise<(IEndereco & { _id: string; })[]> {
        return await EnderecoModel.create([entity], { session });
    }

    async update(id: string, entity: any, session: any): Promise<(IEndereco & { _id: string; })> {
        return await EnderecoModel.findByIdAndUpdate(id, entity, { session });
    }

    delete(id: string, session: any): void {
        EnderecoModel.deleteOne({ _id: id }, session);
    }    
}