import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { Usuario } from "../../../models";
import { UsuariosEntity } from "../../../shared/entities";
import { CriarUsuarioDTO } from "../dto";

export class UsuariosRepository {
  private _manager = DatabaseConnection.connection.manager;

  async verificarSeUsuarioExistePorUsername(
    username: string
  ): Promise<Usuario | null> {
    const usuarioExistente = await this._manager.findOneBy(UsuariosEntity, {
      username,
    });

    if (!usuarioExistente) return null;

    return this.entityToModel(usuarioExistente);
  }

  async cadastrar(usuario: CriarUsuarioDTO): Promise<Usuario> {
    const criarUsuario = this._manager.create(UsuariosEntity, { ...usuario });

    const usuarioCriado = await this._manager.save(criarUsuario);

    return this.entityToModel(usuarioCriado);
  }

  async listarUsuarios(): Promise<Usuario[]> {
    const listaUsuarios = await this._manager.find(UsuariosEntity);

    return listaUsuarios.map((u) => this.entityToModel(u));
  }

  private entityToModel(dadosDB: UsuariosEntity): Usuario {
    return new Usuario(
      dadosDB.id,
      dadosDB.nome,
      dadosDB.username,
      dadosDB.senha
    );
  }
}
