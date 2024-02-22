import { NextFunction, Request, Response } from "express";

export const limparCampos = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nome, username, senha } = req.body;

  req.body.nome = nome.trim();
  req.body.username = username.trim();
  req.body.senha = senha.trim();

  next();
};
