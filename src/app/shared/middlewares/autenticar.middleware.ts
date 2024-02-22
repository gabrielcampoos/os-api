import { NextFunction, Request, Response } from "express";
import { httpHelper, jwt } from "../utils";
import { Resultado } from "../utils/resultado.helper";

export const autenticar = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;

  if (!token) {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(401, "Token inválido.")
    );
  }

  try {
    const usuario = jwt.decoded(token as string);
    req.usuario = usuario;
    return next();
  } catch (erro: any) {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(401, erro.toString())
    );
  }
};
