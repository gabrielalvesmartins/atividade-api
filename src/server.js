import express from "express";
import { tarefas, criarTarefa, atualizarTarefa, deletarTarefa } from "./dados.js";

const app = express();
const PORTA = process.env.PORT || 3000;

app.use(express.json());

app.get("/tarefas", (req, res) => {
  res.status(200).json(tarefas);
});

app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;
  if (!titulo || titulo.trim() === "") {
    return res.status(400).json({ erro: "Título é obrigatório." });
  }
  const nova = criarTarefa(titulo.trim());
  res.status(201).json(nova);
});

app.put("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, concluida } = req.body;
  const tarefa = atualizarTarefa(id, titulo, concluida);
  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada." });
  }
  res.status(200).json(tarefa);
});

app.delete("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const deletado = deletarTarefa(id);
  if (!deletado) {
    return res.status(404).json({ erro: "Tarefa não encontrada." });
  }
  res.status(204).send();
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
