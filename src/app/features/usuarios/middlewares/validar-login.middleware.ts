import { NextFunction, Request, Response } from "express";
import { httpHelper } from "../../../shared/utils";
import { Resultado } from "../../../shared/utils/resultado.helper";

export const validarLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, senha } = req.body;

  if (!username || typeof username !== "string") {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(400, "É necessário informar campo em formato string.")
    );
  }

  if (!senha || typeof senha !== "string") {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(400, "É necessário informar campo em formato string.")
    );
  }
  next();
};
