import { NextFunction, Request, Response } from "express";
import { httpHelper } from "../../../shared/utils";
import { Resultado } from "../../../shared/utils/resultado.helper";

export const validarCamposNovoUsuario = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nome, username, senha } = req.body;

  if (!nome || typeof nome !== "string") {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(400, "É necessário nome em formato string")
    );
  }

  if (!username || typeof username !== "string") {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(400, "É necessário username em formato string")
    );
  }

  if (!senha || typeof senha !== "string") {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(400, "É necessário senha em formato string")
    );
  }

  if (senha.length < 6) {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(400, "A senha deve conter pelo menos 6 caracteres.")
    );
  }
  return next();
};
