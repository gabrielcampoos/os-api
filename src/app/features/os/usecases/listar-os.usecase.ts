import { OsJSON } from "../../../models";
import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Resultado, ResultadoDTO } from "../../../shared/utils";
import { ListarOsFiltroDTO } from "../dto";
import { OsRepository } from "../repository";

const PREFIX_CACHE = "listar-os";

export class ListarOsUsecase {
  async execute(filtros?: ListarOsFiltroDTO): Promise<ResultadoDTO> {
    const osRepository = new OsRepository();
    const cacheRepository = new CacheRepository();

    const osCache = await cacheRepository.get<OsJSON[]>(`${PREFIX_CACHE}`);
    let os: OsJSON[] = [];

    if (!osCache) {
      const osPrincipal = await osRepository.listarOs();
      os = osPrincipal.map((os) => os.toJSON());

      await cacheRepository.set<OsJSON[]>(`${PREFIX_CACHE}`, os);
    } else {
      os = osCache;
    }

    if (filtros) {
      if (filtros.nomeCliente) {
        os = os.filter((os) => os.nomeCliente === filtros.nomeCliente);
      }

      if (filtros.equipamento) {
        os = os.filter((os) => os.equipamento === filtros.equipamento);
      }

      if (filtros.valor) {
        os = os.filter((os) => os.valor === filtros.valor);
      }
    }

    return Resultado.sucesso(200, "Os listadas com sucesso", os);
  }
}
