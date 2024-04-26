import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Resultado, ResultadoDTO } from "../../../shared/utils";
import { OsRepository } from "../repository";

const PREFIX_CACHE = "listar-os";

export class ExcluirOsUsecase {
  async execute(id: string): Promise<ResultadoDTO> {
    const osRepository = new OsRepository();
    const cacheRepository = new CacheRepository();

    const os = await osRepository.verificarSeOsExiste(id);

    if (!os) return Resultado.erro(400, "Os não encontrada.");

    await osRepository.excluirOs(id);
    await cacheRepository.delete(`${PREFIX_CACHE}`);

    return Resultado.sucesso(200, "Os excluida com sucesso.", id);
  }
}
