import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Resultado, ResultadoDTO } from "../../../shared/utils";
import { UsuariosRepository } from "../../usuarios/repository";
import { OsRepository } from "../repository";

const PREFIX_CACHE = "listar-os";

export class ExcluirOsUsecase {
  async execute(id: string, username: string): Promise<ResultadoDTO> {
    const osRepository = new OsRepository();
    const usuariosRepository = new UsuariosRepository();
    const cacheRepository = new CacheRepository();

    const usuarioEncontrado =
      await usuariosRepository.verificarSeUsuarioExistePorUsername(username);

    if (!usuarioEncontrado)
      return Resultado.erro(
        400,
        "Usuário não encontrado. Não foi possível excluir a os."
      );

    const os = await osRepository.verificarSeOsExiste(username, id);

    if (!os) return Resultado.erro(400, "Os não encontrada.");

    await osRepository.excluirOs(id);
    await cacheRepository.delete(`${PREFIX_CACHE}-${username}`);
    await cacheRepository.delete(`${PREFIX_CACHE}-${id}`);

    return Resultado.sucesso(200, "Os excluida com sucesso.", id);
  }
}
