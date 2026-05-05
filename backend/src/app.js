import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tarefasRouter from "./routes/tarefas.js";

dotenv.config();

const app = express();
const PORTA = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", tarefasRouter);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "API rodando" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

// Server
app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORTA}`);
  console.log(`📊 API disponível em http://localhost:${PORTA}/api`);
});

export default app;
