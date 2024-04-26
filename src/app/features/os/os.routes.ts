import { Router } from "express";
import { autenticar } from "../../shared/middlewares";
import { OsController } from "./controllers";

export default () => {
  const router = Router();

  router.post("/os", autenticar, OsController.criarOs);

  router.get("/os", autenticar, OsController.listarOs);

  router.put("/os/:idOs", autenticar, OsController.editarOs);

  router.delete("/os/:id", autenticar, OsController.excluirOs);

  return router;
};
