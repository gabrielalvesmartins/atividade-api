import express from "express";
import {
  getTarefas,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa
} from "../controllers/TarefaController.js";

const router = express.Router();

router.get("/tarefas", getTarefas);
router.post("/tarefas", criarTarefa);
router.put("/tarefas/:id", atualizarTarefa);
router.delete("/tarefas/:id", deletarTarefa);

export default router;
