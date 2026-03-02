import express from "express";
import { tarefas, criarTarefa } from "./dados.js";

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

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
