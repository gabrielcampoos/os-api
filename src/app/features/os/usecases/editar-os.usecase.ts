import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Resultado, ResultadoDTO } from "../../../shared/utils";
import { UsuariosRepository } from "../../usuarios/repository";
import { EditarOsDTO } from "../dto";
import { OsRepository } from "../repository";

const PREFIX_CACHE = "listar-os";

export class EditarOsUsecase {
  async execute(dados: EditarOsDTO): Promise<ResultadoDTO> {
    const { idOs, username, novosDados } = dados;

    const osRepository = new OsRepository();
    const usuariosRepository = new UsuariosRepository();
    const cacheRepository = new CacheRepository();

    const usuarioEncontrado =
      await usuariosRepository.verificarSeUsuarioExistePorUsername(username);

    if (!usuarioEncontrado)
      return Resultado.erro(400, "Usuário não encontrado.");

    const os = await osRepository.verificarSeOsExiste(username, idOs);

    if (!os) return Resultado.erro(400, "Os não encontrada.");

    const atualizada = os.atualizarOs({
      equipamento: novosDados.equipamento,
      descricao: novosDados.descricao,
      valor: novosDados.valor,
    });

    await cacheRepository.delete(`${PREFIX_CACHE}-${username}`);
    await cacheRepository.delete(`${PREFIX_CACHE}-${idOs}`);

    if (!atualizada) return Resultado.erro(400, "Os não pode ser editada.");

    const osJSON = os.toJSON();

    osRepository.editarOs({
      idOs,
      equipamento: osJSON.equipamento,
      descricao: osJSON.descricao,
      valor: osJSON.valor,
    });

    return Resultado.sucesso(200, "Os editada.", os);
  }
}
