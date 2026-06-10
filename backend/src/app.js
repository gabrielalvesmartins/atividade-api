import express from "express";
import tarefaRoutes from "./routes/tarefaRoutes.js";

const app = express();

// Middleware CORS
app.use((req, res, next) => {
  const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5173',
  ];

  if (allowedOrigins.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API de tarefas está funcionando!",
    timestamp: new Date().toISOString()
  });
});

// Rota raiz
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de tarefas funcionando!",
    versao: "2.0",
    arquitetura: "MVC",
    endpoints: {
      health: "/health",
      tasks: "/tasks"
    }
  });
});

// Rotas de tarefas
app.use(tarefaRoutes);

// Middleware para rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    erro: "Rota não encontrada",
    metodo: req.method,
    url: req.url,
    mensagem: "Use GET /tasks, POST /tasks, PUT /tasks/:id, DELETE /tasks/:id"
  });
});

export default app;
