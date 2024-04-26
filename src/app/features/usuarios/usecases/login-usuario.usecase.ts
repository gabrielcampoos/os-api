import { bcrypt, jwt } from "../../../shared/utils";
import {
  Resultado,
  ResultadoDTO,
} from "../../../shared/utils/resultado.helper";
import { LoginUsuarioDTO } from "../dto/login-usuario.dto";
import { UsuariosRepository } from "../repository";

export class LoginUsuarioUsecase {
  async execute(dados: LoginUsuarioDTO): Promise<ResultadoDTO> {
    const repository = new UsuariosRepository();

    const usuarioExistente =
      await repository.verificarSeUsuarioExistePorUsername(dados.username);

    if (!usuarioExistente)
      return Resultado.erro(404, "Usuário não encontrado.");

    const senhaValidada = await bcrypt.compareHash(
      dados.senha,
      usuarioExistente.toJSONComSenha().senha
    );

    if (!senhaValidada)
      return Resultado.erro(404, "Usuário ou senha inválidos.");

    const dadosUsuario = usuarioExistente.toJSON();
    const token = jwt.encoded(dadosUsuario);

    return Resultado.sucesso(200, "Usuário logado com sucesso.", {
      ...dadosUsuario,
      token,
    });
  }
}
