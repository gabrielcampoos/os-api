import { Request, Response } from "express";
import { httpHelper } from "../../../shared/utils";
import { Resultado } from "../../../shared/utils/resultado.helper";
import { CriarUsuarioDTO } from "../dto";
import {
  CriarUsuarioUsecase,
  ListarTodosUsuariosUsecase,
  LoginUsuarioUsecase,
  ObterUsuarioUsecase,
} from "../usecases";

export class UsuariosController {
  static async criarUsuario(req: Request, res: Response) {
    const usuario: CriarUsuarioDTO = req.body;

    try {
      const usecase = new CriarUsuarioUsecase();

      const resultado = await usecase.execute(usuario);

      if (!resultado.sucesso) return httpHelper.badRequestError(res, resultado);

      return httpHelper.success(res, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        res,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  static async loginUsuario(req: Request, res: Response) {
    const { username, senha }: CriarUsuarioDTO = req.body;

    try {
      const usecase = new LoginUsuarioUsecase();

      const resultado = await usecase.execute({ username, senha });

      if (!resultado.sucesso) return httpHelper.badRequestError(res, resultado);

      return httpHelper.success(res, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        res,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  static async listarUsuarios(req: Request, res: Response) {
    try {
      const usecase = new ListarTodosUsuariosUsecase();

      const resultado = await usecase.execute();

      return httpHelper.success(res, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        res,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  static async obterUsuario(request: Request, response: Response) {
    try {
      const { username } = request.usuario;

      const usecase = new ObterUsuarioUsecase();

      const resultado = await usecase.execute(username);

      return httpHelper.success(response, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        response,
        Resultado.erro(500, erro.toString())
      );
    }
  }
}
