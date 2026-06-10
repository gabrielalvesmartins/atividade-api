# Arquitetura do Projeto - Análise Completa

## 📐 Visão Geral da Arquitetura

Este projeto segue uma arquitetura de **três camadas** com separação clara entre:
- **Frontend** (Apresentação)
- **Backend** (Lógica de Negócio)
- **Database** (Persistência de Dados)

```
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                    │
│                      React + Tailwind CSS                    │
│  ┌────────┐ ┌──────────┐ ┌─────────┐ ┌──────────────────┐  │
│  │ Header │ │ TaskForm │ │ TaskList│ │ TaskCard (edit)  │  │
│  └────────┘ └──────────┘ └─────────┘ └──────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │ (Fetch API)
                       │ JSON
┌──────────────────────▼──────────────────────────────────────┐
│                   CAMADA DE APLICAÇÃO                        │
│                 Node.js + Express                            │
│  ┌──────────────┐ ┌───────────────┐ ┌──────────────────┐   │
│  │ TarefaRouter │ │TarefaController│ │ TarefaModel      │   │
│  └──────────────┘ └───────────────┘ └──────────────────┘   │
│                   Validações + Lógica                        │
│                   CORS + Middleware                          │
└──────────────────────┬──────────────────────────────────────┘
                       │ (Prisma ORM)
                       │ SQL
┌──────────────────────▼──────────────────────────────────────┐
│                   CAMADA DE DADOS                            │
│                      MySQL Database                          │
│              ┌──────────────────────────┐                   │
│              │   Tabela: Task           │                   │
│              │ - id (PK)                │                   │
│              │ - title                  │                   │
│              │ - description            │                   │
│              │ - completed              │                   │
│              │ - createdAt              │                   │
│              └──────────────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

## 🏗️ Padrão MVC no Backend

### Model (Modelo)

**Arquivo**: `backend/src/models/tarefaModel.js`

Responsabilidades:
- Operações diretas com o banco de dados via Prisma
- Queries do Prisma
- Validações de dados
- Transformações antes de retornar

```javascript
export async function listar() {
  return prisma.task.findMany({
    orderBy: { id: "asc" }
  });
}
```

### View (Visão)

No contexto de uma API REST, a "View" é representada pelas **respostas JSON**.

**Padrão de Resposta**:
```json
{
  "mensagem": "Descrição da ação",
  "task": {
    "id": 1,
    "title": "Tarefa",
    "description": "Descrição",
    "completed": false,
    "createdAt": "2024-05-08T10:30:00.000Z"
  }
}
```

### Controller (Controlador)

**Arquivo**: `backend/src/controllers/tarefaController.js`

Responsabilidades:
- Processar requisições HTTP
- Validar parâmetros
- Chamar métodos do Model
- Formatar respostas
- Tratamento de erros

```javascript
export async function criar(req, res) {
  try {
    const { title, description } = req.body;
    
    // Validação
    if (!title?.trim()) {
      return res.status(400).json({ erro: "Título é obrigatório" });
    }
    
    // Chamar Model
    const task = await TarefaModel.criar({ title, description });
    
    // Responder
    res.status(201).json({ mensagem: "Criado", task });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
```

### Router (Rotas)

**Arquivo**: `backend/src/routes/tarefaRoutes.js`

Responsabilidades:
- Mapear URLs para Controllers
- Definir métodos HTTP
- Roteamento

```javascript
router.get("/tasks", TarefaController.listar);
router.post("/tasks", TarefaController.criar);
router.put("/tasks/:id", TarefaController.atualizar);
router.delete("/tasks/:id", TarefaController.excluir);
```

## 🎨 Padrão de Componentes no Frontend

### Estrutura Hierárquica

```
App
└── HomePage
    ├── Header
    ├── TaskForm
    └── TaskList
        └── TaskCard (múltiplos)
```

### Componentes Reutilizáveis

#### Header.jsx
- Componente de apresentação
- Sem estado (stateless)
- Exibe título e descrição

#### TaskForm.jsx
- Gerencia estado do formulário
- Valida dados
- Chama API para criar tarefa
- Exibe mensagens de sucesso/erro

#### TaskList.jsx
- Carrega tarefas da API
- Gerencia estado de loading/erro
- Lista tarefas usando TaskCard
- Coordena deleção de tarefas

#### TaskCard.jsx
- Card individual de tarefa
- Modo visualização e edição
- Botões de ação (editar/deletar)
- Toggle de conclusão

### Fluxo de Dados (Unidirecional)

```
HomePage (State)
    ↓
    ├→ TaskForm (Props, onTaskCreated)
    │   ↓
    │   (create task) → API → HomePage (refresh)
    │
    └→ TaskList (Props)
        ↓
        TaskCard (Props, onDelete, onUpdate)
            ↓
            (edit/delete) → API → HomePage (refresh)
```

## 🔄 Fluxo de Requisição Completo

### Criar uma Tarefa

1. **Frontend**: Usuário preenche formulário e clica "Criar"
2. **Frontend**: `TaskForm.jsx` valida dados
3. **Frontend**: `apiService.createTask()` é chamado
4. **Frontend**: Fetch POST é enviado para `http://localhost:3000/tasks`
5. **Backend**: Express recebe em `tarefaRoutes.js`
6. **Backend**: `TarefaController.criar()` é chamado
7. **Backend**: Middleware CORS permite requisição
8. **Backend**: Valida `title` e `description`
9. **Backend**: Chama `TarefaModel.criar()`
10. **Backend**: Prisma executa `prisma.task.create()`
11. **Database**: MySQL insere novo registro
12. **Backend**: Retorna tarefa criada em JSON
13. **Frontend**: `TaskList` é atualizado
14. **Frontend**: Usuário vê nova tarefa na lista

### Listar Tarefas

1. **Frontend**: `HomePage` monta
2. **Frontend**: `TaskList.useEffect()` executa
3. **Frontend**: `apiService.getTasks()` é chamado
4. **Backend**: GET `/tasks` é processado
5. **Backend**: `TarefaController.listar()` executa
6. **Backend**: `TarefaModel.listar()` consulta banco
7. **Database**: MySQL retorna todas as tarefas
8. **Backend**: Array JSON é retornado
9. **Frontend**: Estado é atualizado
10. **Frontend**: TaskList renderiza cada tarefa como TaskCard

## 🛡️ Tratamento de Erros

### Backend

```javascript
// Validação
if (!title?.trim()) {
  return res.status(400).json({ erro: "Título é obrigatório" });
}

// Erro do Prisma
if (error.code === "P2025") {
  return res.status(404).json({ erro: "Registro não encontrado" });
}

// Erro genérico
catch (error) {
  res.status(500).json({ 
    erro: "Erro interno", 
    detalhes: error.message 
  });
}
```

### Frontend

```javascript
// Estado de erro
const [error, setError] = useState(null);

// Tratamento
try {
  const data = await apiService.getTasks();
} catch (err) {
  setError(err.message);
}

// Exibição
{error && (
  <div className="error">{error}</div>
)}
```

## 🔐 Segurança

### CORS (Cross-Origin Resource Sharing)

```javascript
// Backend permite requisições de localhost:5173
app.use((req, res, next) => {
  if (req.headers.origin === 'http://localhost:5173') {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  // ... headers adicionais
});
```

### Validações

**Frontend**:
- Valida tipo de dados
- Verifica campos obrigatórios
- Limpeza de entrada (trim)

**Backend**:
- Validação completa de tipos
- Verificação de IDs
- Sanitização de entrada

## 📊 Fluxo de Estado

### Frontend (React Hooks)

```javascript
// HomePage
const [refreshKey, setRefreshKey] = useState(0);

// TaskForm
const [title, setTitle] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [success, setSuccess] = useState(false);

// TaskList
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// TaskCard
const [isEditing, setIsEditing] = useState(false);
const [editedTitle, setEditedTitle] = useState(task.title);
```

## 🗂️ Organização de Pastas

### Backend - Por Camadas

```
backend/src/
├── controllers/     # Lógica de requisição
├── models/         # Lógica de dados
├── routes/         # Definição de rotas
├── config/         # Configurações (DB)
├── app.js          # Express setup
└── server.js       # Entry point
```

**Vantagem**: Fácil localizar funcionalidade por camada

### Frontend - Por Tipo

```
frontend/src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas (containers)
├── services/      # Integrações (API)
├── App.jsx        # App principal
└── main.jsx       # Entry point
```

**Vantagem**: Fácil localizar componentes por tipo

## 🔄 Ciclo de Vida de um Componente

### TaskList

1. **Mount**: Componente é renderizado
2. **useEffect**: Hook é executado (lista vazia)
3. **Async**: `apiService.getTasks()` é chamado
4. **State**: `tasks` é atualizado
5. **Render**: Componente é re-renderizado com dados
6. **Unmount**: Componente é removido

## 📈 Escalabilidade

### Como Adicionar Nova Entidade

1. **Schema**: Adicionar modelo em `prisma/schema.prisma`
2. **Migration**: `npm run prisma:migrate`
3. **Model**: Criar `usuarioModel.js`
4. **Controller**: Criar `UsuarioController.js`
5. **Routes**: Criar `usuarioRoutes.js` e importar em `app.js`
6. **Frontend**: Criar componentes correspondentes

### Tecnologias Escaláveis

- **Express**: Suporta middlewares complexos
- **Prisma**: Facilita mudanças no schema
- **React**: Componentes reutilizáveis
- **MySQL**: Suporta crescimento de dados

## 🎓 Padrões de Design

### MVC
Separa apresentação, lógica e dados.

### Component Composition
Componentes pequeninhos e reutilizáveis.

### Service Layer
Abstração de chamadas API.

### Middleware Pattern
Express middleware para CORS, validação, etc.

## 🧪 Testabilidade

### Backend
- Controllers podem ser testados isoladamente
- Models podem ser mockados
- Endpoints podem ser testados com curl/Postman

### Frontend
- Componentes podem ser testados com Jest/React Testing Library
- Service API pode ser mockado
- Estados podem ser verificados

## 📝 Documentação de Código

```javascript
// Formato: JSDoc
/**
 * Cria uma nova tarefa no banco de dados
 * @param {Object} data - Dados da tarefa
 * @param {string} data.title - Título (obrigatório)
 * @param {string} data.description - Descrição (opcional)
 * @param {boolean} data.completed - Status inicial
 * @returns {Promise<Object>} Tarefa criada
 * @throws {Error} Se título estiver vazio
 */
export async function criar(data) {
  // implementação
}
```

---

**Conclusão**: A arquitetura está bem organizada, segue padrões estabelecidos e é escalável para crescimento futuro.
