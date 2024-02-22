import { bcrypt } from "../../../shared/utils";
import {
  Resultado,
  ResultadoDTO,
} from "../../../shared/utils/resultado.helper";
import { CriarUsuarioDTO } from "../dto";
import { UsuariosRepository } from "../repository";

export class CriarUsuarioUsecase {
  async execute(dados: CriarUsuarioDTO): Promise<ResultadoDTO> {
    const repository = new UsuariosRepository();

    const usuarioExistente =
      await repository.verificarSeUsuarioExistePorUsername(dados.username);

    if (usuarioExistente) return Resultado.erro(400, "Usuário já cadastrado.");

    const senhaHash = await bcrypt.generateHash(dados.senha);
    dados.senha = senhaHash;

    const novoUsuario = await repository.cadastrar(dados);

    return Resultado.sucesso(
      200,
      "Usuário criado com sucesso.",
      novoUsuario.toJSON()
    );
  }
}
