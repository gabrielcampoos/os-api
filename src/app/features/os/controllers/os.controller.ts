import { Request, Response } from "express";
import { Resultado, httpHelper } from "../../../shared/utils";
import {
  CriarOsUsecase,
  EditarOsUsecase,
  ExcluirOsUsecase,
  ListarOsUsecase,
} from "../usecases";

export class OsController {
  static async criarOs(request: Request, response: Response) {
    const { nomeCliente, equipamento, descricao, valor } = request.body;

    try {
      const usecase = new CriarOsUsecase();

      const resultado = await usecase.execute({
        nomeCliente,
        equipamento,
        descricao,
        valor,
      });

      return httpHelper.success(response, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        response,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  static async listarOs(request: Request, response: Response) {
    const { nomeCliente, equipamento, valor } = request.body;

    try {
      const usecase = new ListarOsUsecase();

      const resultado = await usecase.execute({
        nomeCliente,
        equipamento,
        valor,
      });

      return httpHelper.success(response, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        response,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  static async editarOs(request: Request, response: Response) {
    const { idOs } = request.params;
    const { equipamento, descricao, valor } = request.body;

    try {
      const usecase = new EditarOsUsecase();

      const resultado = await usecase.execute({
        idOs,
        novosDados: {
          equipamento,
          descricao,
          valor,
        },
      });

      if (!resultado.sucesso)
        return httpHelper.badRequestError(response, resultado);

      return httpHelper.success(response, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(response, erro.toString());
    }
  }

  static async excluirOs(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const usecase = new ExcluirOsUsecase();

      const resultado = await usecase.execute(id);

      if (!resultado.sucesso)
        return httpHelper.badRequestError(response, resultado);

      return httpHelper.success(response, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(response, erro.toString());
    }
  }
}
