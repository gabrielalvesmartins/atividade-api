
# 📊 Visualização da Estrutura do Projeto

Estrutura completa do projeto AV1 - Desenvolvimento de Sistemas Web

## 🏗️ Arquitetura Geral

```
av1-dsw-nome-sobrenome-2bimestre/
│
├── 📁 backend/                    ← API REST + Banco de Dados (PARTE 1 ✅)
│   ├── 📁 src/
│   │   ├── 📁 controllers/
│   │   │   └── 📄 TarefaController.js      (Lógica de negócio)
│   │   ├── 📁 routes/
│   │   │   └── 📄 tarefas.js               (Definição de rotas)
│   │   └── 📄 app.js                       (Configuração Express)
│   │
│   ├── 📁 prisma/
│   │   └── 📄 schema.prisma                (Modelo do banco)
│   │
│   ├── 📄 package.json                     (Dependências)
│   ├── 📄 .env.example                     (Variáveis de ambiente)
│   ├── 📄 .gitignore                       (Ignorar arquivos)
│   └── 📄 README.md                        (Instruções)
│
├── 📁 frontend/                   ← Interface React (PARTE 2 ⏳)
│   ├── 📁 src/                             (A ser criado)
│   ├── 📄 package.json                     (A ser criado)
│   └── 📄 README.md                        (Placeholder)
│
├── 📄 README.md                   ← Documentação principal
├── 📄 SETUP_MYSQL.md              ← Guia de configuração do MySQL
├── 📄 GIT_GITHUB_GUIDE.md         ← Guia de versionamento
├── 📄 CHECKLIST_ENTREGA.md        ← Checklist de entrega
├── 📄 APRESENTACAO.md             ← Resumo para apresentação
├── 📄 GUIA_PARTE2_REACT.md        ← Guia de implementação do React
├── 📄 API_COLLECTION.json         ← Exemplos para Postman/Insomnia
├── 📄 .gitignore                  ← Configuração Git
└── 🔒 .git/                       ← Histórico Git

```

## 📋 Detalhamento de Arquivos Importantes

### Backend - Arquivo Principal (`app.js`)

```javascript
import express from "express";
import cors from "cors";
import tarefasRouter from "./routes/tarefas.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", tarefasRouter);  // Monta as rotas em /api
```

### Backend - Controller (`TarefaController.js`)

```javascript
// 4 principais funções CRUD:
export async function getTarefas(req, res)      // GET  - Listar
export async function criarTarefa(req, res)     // POST - Criar
export async function atualizarTarefa(req, res) // PUT  - Atualizar
export async function deletarTarefa(req, res)   // DELETE - Deletar
```

### Backend - Routes (`tarefas.js`)

```javascript
router.get("/tarefas", getTarefas);
router.post("/tarefas", criarTarefa);
router.put("/tarefas/:id", atualizarTarefa);
router.delete("/tarefas/:id", deletarTarefa);
```

### Banco de Dados - Schema (`schema.prisma`)

```prisma
model Tarefa {
  id        Int     @id @default(autoincrement())
  titulo    String  @db.VarChar(255)
  concluida Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔄 Fluxo de Dados - Exemplo: Criar Tarefa

```
Frontend (React)
        ↓
  [Form Submit]
        ↓
  API Client (fetch)
        ↓
  POST /api/tarefas
        ↓ (Network)
Backend (Express)
        ↓
  Router (tarefas.js)
        ↓
  Controller (TarefaController.js)
        ↓
  Validação (título não-vazio)
        ↓
  Prisma ORM
        ↓
  MySQL Database
        ↓ (INSERT)
  [Tarefa criada com ID auto-increment]
        ↓
  Resposta JSON (201 Created)
        ↓ (Network)
Frontend (React)
        ↓
  Update State
        ↓
  [Nova tarefa aparece na lista]
```

## 📡 Endpoints da API

```
GET    http://localhost:3000/health
└─ Retorna: { "status": "OK", "message": "API rodando" }

GET    http://localhost:3000/api/tarefas
└─ Retorna: [{ id: 1, titulo: "...", concluida: false, ... }, ...]

POST   http://localhost:3000/api/tarefas
├─ Body: { "titulo": "Minha tarefa" }
└─ Retorna: { id: 1, titulo: "Minha tarefa", concluida: false, ... }

PUT    http://localhost:3000/api/tarefas/1
├─ Body: { "titulo": "Tarefa atualizada", "concluida": true }
└─ Retorna: { id: 1, titulo: "Tarefa atualizada", concluida: true, ... }

DELETE http://localhost:3000/api/tarefas/1
└─ Retorna: 204 No Content
```

## 🔑 Variáveis de Ambiente

### `.env` (Backend)
```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/av1_tarefas"
PORT=3000
```

### Frontend (a ser configurado)
```env
VITE_API_URL=http://localhost:3000/api
```

## 📦 Dependências

### Backend
```json
{
  "@prisma/client": "^5.8.0",
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

### Frontend (a ser instalado)
```json
{
  "react": "^18.x.x",
  "react-dom": "^18.x.x",
  "axios": "^1.x.x" // ou usar fetch nativo
}
```

## 🚀 Ciclo de Desenvolvimento

### Inicialização
```bash
# Backend
cd backend
npm install
cp .env.example .env        # Editar com credenciais
npm run prisma:migrate      # Criar tabelas
npm run dev                 # Iniciar servidor

# Frontend (Parte 2)
cd frontend
npm create vite . -- --template react
npm install
npm run dev                 # Iniciar dev server
```

### Desenvolvimento Contínuo
```bash
# Terminal 1: Backend rodando
cd backend && npm run dev   # Porta 3000

# Terminal 2: Frontend rodando
cd frontend && npm run dev  # Porta 5173

# Terminal 3 (opcional): Visualizar DB
cd backend && npm run prisma:studio  # Porta 5555
```

### Testes
```bash
# Com cURL
curl http://localhost:3000/health

# Com Postman/Insomnia
# Importar API_COLLECTION.json

# No navegador
# Acessar http://localhost:5173
```

## 📊 Resumo de Cobertura

| Requisito | Parte 1 | Parte 2 | Status |
|-----------|---------|---------|--------|
| Node.js + Express | ✅ | - | Completo |
| Prisma ORM | ✅ | - | Completo |
| MySQL | ✅ | - | Completo |
| API REST CRUD | ✅ | - | Completo |
| React | - | ⏳ | Pendente |
| Tailwind CSS | - | ⏳ | Pendente |
| Integração F/B | - | ⏳ | Pendente |
| Tratamento Erros | ✅ | ⏳ | Parcial |
| Validações | ✅ | ⏳ | Parcial |
| Documentação | ✅ | ⏳ | Parcial |
| GitHub | ⏳ | ⏳ | Pendente |

## 🎯 Próximos Passos

1. **Setup MySQL** → Seguir `SETUP_MYSQL.md`
2. **Testar API** → Usar `API_COLLECTION.json` no Postman
3. **Fazer Commits** → Seguir `GIT_GITHUB_GUIDE.md`
4. **Push para GitHub** → Criar repositório público
5. **Implementar React** → Seguir `GUIA_PARTE2_REACT.md`
6. **Testar Integração** → Verificar fluxo completo
7. **Apresentação** → Usar `APRESENTACAO.md`

## 📞 Arquivos de Referência

| Arquivo | Propósito | Usar para |
|---------|-----------|-----------|
| `README.md` | Visão geral | Entender projeto |
| `SETUP_MYSQL.md` | Configurar BD | Setup do MySQL |
| `GIT_GITHUB_GUIDE.md` | Versionamento | Fazer commits |
| `CHECKLIST_ENTREGA.md` | Verificação | Validar entrega |
| `APRESENTACAO.md` | Apresentação | Demo para prof |
| `GUIA_PARTE2_REACT.md` | React | Criar frontend |
| `API_COLLECTION.json` | Testes | Postman/Insomnia |

---

**Status Geral**: Parte 1 ✅ Pronta | Parte 2 ⏳ Próxima  
**Data de Atualização**: 05/05/2024  
**Próxima Entrega**: 08/05/2024
