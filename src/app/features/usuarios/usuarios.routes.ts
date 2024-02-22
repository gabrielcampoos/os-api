import { Router } from "express";
import { autenticar } from "../../shared/middlewares";
import { UsuariosController } from "./controllers";
import {
  limparCampos,
  validarCamposNovoUsuario,
  validarLogin,
} from "./middlewares";

export default () => {
  const router = Router();

  router.post(
    "/usuarios",
    [validarCamposNovoUsuario, limparCampos],
    UsuariosController.criarUsuario
  );

  router.post("/login", validarLogin, UsuariosController.loginUsuario);
  router.get("/usuarios", UsuariosController.listarUsuarios);
  router.get(
    "/validarDadosUsuarios",
    autenticar,
    UsuariosController.obterUsuario
  );

  return router;
};
