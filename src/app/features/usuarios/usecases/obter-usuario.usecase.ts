import { Resultado, ResultadoDTO } from "../../../shared/utils";
import { UsuariosRepository } from "../repository";

export class ObterUsuarioUsecase {
  async execute(username: string): Promise<ResultadoDTO> {
    const usuarioRepository = new UsuariosRepository();

    const usuario = await usuarioRepository.verificarSeUsuarioExistePorUsername(
      username
    );

    if (!usuario) return Resultado.erro(400, "Usuário não encontrado.");

    return Resultado.sucesso(
      200,
      "Usuário encontrado com sucesso.",
      usuario.toJSON()
    );
  }
}
