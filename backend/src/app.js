import express from "express";
import cors from "cors";
import tarefaRoutes from "./routes/tarefaRoutes.js";

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS policy: origin not allowed'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

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
