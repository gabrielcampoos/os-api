import { FindOptionsWhere } from "typeorm";
import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { Os } from "../../../models";
import { OsEntity, UsuariosEntity } from "../../../shared/entities";
import { AlterarOsDTO, CriarOsDTO } from "../dto";
import { ListarOsFiltroDTO } from "../dto/listar-os-filtro.dto";

export class OsRepository {
  private _manager = DatabaseConnection.connection.manager;

  async usuarioExiste(username: string): Promise<boolean> {
    const usuarioExiste = await this._manager.findOneBy(UsuariosEntity, {
      username,
    });

    return !!usuarioExiste;
  }

  async verificarSeOsExiste(
    username: string,
    id: string
  ): Promise<Os | undefined> {
    const osExistente = await this._manager.findOne(OsEntity, {
      where: {
        id: id,
        criadoPor: username,
      },
      relations: { usuario: true },
    });

    if (!osExistente) return undefined;

    return this.entityToModel(osExistente);
  }

  async criarOs(os: CriarOsDTO): Promise<Os> {
    const criarOs = this._manager.create(OsEntity, { ...os });

    const osCriada = await this._manager.save(criarOs);

    return this.entityToModel(osCriada);
  }

  async listarOs(username: string, filtros?: ListarOsFiltroDTO): Promise<Os[]> {
    const clausula: FindOptionsWhere<OsEntity> = {
      nomeCliente: filtros?.nomeCliente,
      equipamento: filtros?.equipamento,
      valor: filtros?.valor,
    };

    if (filtros) {
      if (filtros.nomeCliente) {
        clausula.nomeCliente = filtros.nomeCliente;
      }

      if (filtros.equipamento) {
        clausula.equipamento = filtros.equipamento;
      }

      if (filtros.valor) {
        clausula.valor = filtros.valor;
      }
    }

    const osListadas = await this._manager.find(OsEntity, {
      where: clausula,
    });

    return osListadas.map((os) => this.entityToModel(os));
  }

  async editarOs(dados: AlterarOsDTO): Promise<void> {
    const { idOs, equipamento, descricao, valor } = dados;

    await this._manager.update(
      OsEntity,
      { id: idOs },
      { equipamento, descricao, valor }
    );
  }

  async excluirOs(id: string): Promise<void> {
    const os = await this._manager.delete(OsEntity, { id: id });

    if (!os) return undefined;
  }

  private entityToModel(dadosDB: OsEntity): Os {
    return new Os(
      dadosDB.id,
      dadosDB.nomeCliente,
      dadosDB.equipamento,
      dadosDB.descricao,
      dadosDB.valor,
      dadosDB.criadoPor
    );
  }
}
