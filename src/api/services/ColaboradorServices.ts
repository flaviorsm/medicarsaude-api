import { ServiceBase } from '../../core/ServiceBase';
import { StatusEnum } from '../../shared/enum/Status.enum';
import { RegraEnum } from '../../shared/enum/TipoUsuarioEnum';
import APIException from '../../shared/utils/exceptions/APIException';
import HttpException from '../../shared/utils/exceptions/HttpException';
import { UsuarioDTO } from '../dtos/UsuarioDTO';
import { IColaborador } from '../interfaces/IColaborador';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { ColaboradorDTO } from './../dtos/ColaboradorDTO';
import { ColaboradorRepository } from './../repositories/ColaboradorRepository';
import bcrypt = require('bcryptjs');

export class ColaboradorService extends ServiceBase<IColaborador, ColaboradorDTO, ColaboradorRepository> {

    private usuarioRepository: UsuarioRepository;

    constructor() {
        super(ColaboradorRepository);
        this.usuarioRepository = new UsuarioRepository();
    }

    entityToDTO(entity: IColaborador): ColaboradorDTO {
        return {
            id: entity._id,
            usuario: entity.usuario,
            codigo: entity.codigo,
            status: entity.status,
            ctps: entity.ctps,
            dataContratacao: entity.dataContratacao,
            funcao: entity.funcao,

            rg: entity.pessoaFisica.rg,
            cpf: entity.pessoaFisica.cpf,
            dataNascimento: entity.pessoaFisica.dataNascimento,

            nome: entity.pessoaFisica.pessoa.nome,
            telefone: entity.pessoaFisica.pessoa.telefone,
            email: entity.pessoaFisica.pessoa.email,

            cep: entity.pessoaFisica.pessoa.endereco.cep,
            rua: entity.pessoaFisica.pessoa.endereco.rua,
            bairro: entity.pessoaFisica.pessoa.endereco.bairro,
            cidade: entity.pessoaFisica.pessoa.endereco.cidade,
            estado: entity.pessoaFisica.pessoa.endereco.estado,
        };
    }

    async create(dto: ColaboradorDTO): Promise<IColaborador> {
        let colaborador = null;
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            dto.endereco = await this.enderecoRepository.create(dto, session).then(ed => ed._id);

            const pessoaFisica = await this.pessoaFisicaRepository.findOne({ cpf: dto.cpf });
            if (!pessoaFisica) {
                dto.pessoa = await this.pessoaRepository.create(dto, session).then(ps => ps._id);
                dto.pessoaFisica = await this.pessoaFisicaRepository.create(dto, session).then(pf => pf._id);
            } else {
                dto.pessoaFisica = pessoaFisica._id;
            }

            colaborador = await this.repository.create(dto, session).then(res => res);

            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            throw new APIException(error);
        }

        session.endSession();

        if (colaborador) {
            const colaboradorCompleto = await this.repository.findById(colaborador._id);

            if (dto.usuario) {
                colaboradorCompleto.usuario = false;
                const usuario = {
                    usuario: colaboradorCompleto.pessoaFisica.pessoa.email,
                    senha: await bcrypt.hash('medicar', 10),
                    regra: RegraEnum.COLABORADOR,
                    status: StatusEnum.ATIVO,
                    pessoaFisica: colaboradorCompleto.pessoaFisica._id
                }
                colaboradorCompleto.usuario = await this.usuarioRepository.create(usuario as UsuarioDTO).then(res => res ? true : false);
            }

            return colaboradorCompleto;
        }

        return colaborador;
    }

    async update(id: string, dto: ColaboradorDTO): Promise<IColaborador> {
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            const colaborador = await this.repository.update(id, dto, session).then(cli => {
                if (cli) {
                    return cli;
                }
                throw new HttpException(404, `Colaborador ${dto.nome} não encontrado`);
            })

            const pessoaFisica = await this.pessoaFisicaRepository.update(colaborador.pessoaFisica.toString(), dto, session)
                .then(pf => pf);

            const pessoa = await this.pessoaRepository.update(pessoaFisica.pessoa.toString(), dto, session).then(pes => pes);

            await this.enderecoRepository.update(pessoa.endereco.toString(), dto, session).then(end => end);

            await session.commitTransaction();


        } catch (error) {
            await session.abortTransaction();
            throw new APIException(error);
        }

        session.endSession();
        return await this.findById(id);
    }
}