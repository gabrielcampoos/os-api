import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Resultado, ResultadoDTO } from "../../../shared/utils";
import { EditarOsDTO } from "../dto";
import { OsRepository } from "../repository";

const PREFIX_CACHE = "listar-os";

export class EditarOsUsecase {
  async execute(dados: EditarOsDTO): Promise<ResultadoDTO> {
    const { idOs, novosDados } = dados;

    const osRepository = new OsRepository();
    const cacheRepository = new CacheRepository();

    const os = await osRepository.verificarSeOsExiste(dados.idOs);

    if (!os) return Resultado.erro(400, "Os não encontrada.");

    const atualizada = os.atualizarOs({
      equipamento: novosDados.equipamento,
      descricao: novosDados.descricao,
      valor: novosDados.valor,
    });

    await cacheRepository.delete(`${PREFIX_CACHE}`);

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
