import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Resultado, ResultadoDTO } from "../../../shared/utils";
import { CriarOsDTO } from "../dto";
import { OsRepository } from "../repository";

const PREFIX_CACHE = "listar-os";

export class CriarOsUsecase {
  async execute(dados: CriarOsDTO): Promise<ResultadoDTO> {
    const osRepository = new OsRepository();
    const cacheRepository = new CacheRepository();

    const novaOs = await osRepository.criarOs(dados);

    await cacheRepository.delete(`${PREFIX_CACHE}`);

    return Resultado.sucesso(200, "Os criada com sucesso.", novaOs.toJSON());
  }
}
