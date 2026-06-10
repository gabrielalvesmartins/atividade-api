# Índice Completo do Projeto

## 📚 Documentação Principal

### Guias de Execução
1. **[README.md](./README.md)** - Visão geral do projeto
2. **[SETUP_COMPLETO.md](./SETUP_COMPLETO.md)** - Passo a passo de instalação e execução
3. **[ARQUITETURA_DETALHADA.md](./ARQUITETURA_DETALHADA.md)** - Análise profunda da arquitetura
4. **[CHECKLIST_CONFORMIDADE.md](./CHECKLIST_CONFORMIDADE.md)** - Verificação de critérios AV1

### Documentação por Componente
- **[backend/README.md](./backend/README.md)** - Backend: Setup, API, endpoints
- **[frontend/README.md](./frontend/README.md)** - Frontend: Componentes, estrutura, como usar

## 🗂️ Estrutura de Arquivos

### Backend - API REST

```
backend/
├── src/
│   ├── controllers/
│   │   └── TarefaController.js      # Controladores de requisição
│   ├── models/
│   │   └── tarefaModel.js            # Lógica de banco de dados
│   ├── routes/
│   │   └── tarefaRoutes.js           # Definição de rotas
│   ├── config/
│   │   └── prisma.js                 # Configuração do Prisma
│   ├── app.js                        # Setup do Express
│   └── server.js                     # Entry point
├── prisma/
│   └── schema.prisma                 # Schema do banco de dados
├── package.json                      # Dependências
├── .env.example                      # Exemplo de variáveis
├── .gitignore
└── README.md                         # Documentação backend
```

#### Backend - Detalhamento

**TarefaController.js**
- `listar()` - GET /tasks
- `buscarPorId(id)` - GET /tasks/:id
- `criar()` - POST /tasks
- `atualizar(id)` - PUT /tasks/:id
- `excluir(id)` - DELETE /tasks/:id

**tarefaModel.js**
- Funções Prisma para CRUD
- Validação de dados
- Tratamento de erros

**tarefaRoutes.js**
- Mapeia URLs para controllers
- Define métodos HTTP

**app.js**
- Middleware CORS
- Middleware JSON
- Roteamento
- Error handler

**prisma.js**
- Conexão com banco de dados
- Test de conexão

### Frontend - React SPA

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx                # Header da página
│   │   ├── TaskForm.jsx              # Formulário para criar
│   │   ├── TaskList.jsx              # Lista de tarefas
│   │   └── TaskCard.jsx              # Card individual
│   ├── pages/
│   │   └── HomePage.jsx              # Página principal
│   ├── services/
│   │   └── api.js                    # Serviço de API
│   ├── App.jsx                       # Componente raiz
│   ├── main.jsx                      # Entry point
│   ├── App.css                       # Estilos customizados
│   └── index.css                     # Estilos globais
├── public/                           # Assets estáticos
├── package.json                      # Dependências
├── .env.example                      # Exemplo de variáveis
├── vite.config.js                    # Configuração Vite
├── eslint.config.js                  # Configuração ESLint
├── .gitignore
└── README.md                         # Documentação frontend
```

#### Frontend - Componentes

**Header.jsx**
- Logo e título
- Descrição da aplicação

**TaskForm.jsx**
- Input de título
- Textarea de descrição
- Botão de envio
- Estados: loading, error, success

**TaskList.jsx**
- Carrega tarefas inicialmente
- Exibe lista de tarefas
- Gerencia loading/erro
- Coordena ações

**TaskCard.jsx**
- Exibe informação da tarefa
- Checkbox de conclusão
- Modo visualização/edição
- Botões de ação

**HomePage.jsx**
- Container principal
- Coordena componentes
- Gerencia atualização de lista

**api.js**
- `getTasks()` - Lista tarefas
- `getTaskById(id)` - Busca por ID
- `createTask(data)` - Cria tarefa
- `updateTask(id, data)` - Atualiza tarefa
- `deleteTask(id)` - Deleta tarefa

## 📡 API Endpoints

### Base URL
`http://localhost:3000`

### Endpoints

| Método | URL | Descrição | Corpo |
|--------|-----|-----------|-------|
| GET | `/health` | Health check | - |
| GET | `/` | Info da API | - |
| GET | `/tasks` | Listar todas | - |
| GET | `/tasks/:id` | Buscar por ID | - |
| POST | `/tasks` | Criar | `{title, description}` |
| PUT | `/tasks/:id` | Atualizar | `{title?, description?, completed?}` |
| DELETE | `/tasks/:id` | Deletar | - |

## 🔧 Scripts npm

### Backend

```bash
npm run dev                # Iniciar desenvolvimento
npm start                  # Iniciar produção
npm run prisma:studio     # Abrir GUI do Prisma
npm run prisma:migrate    # Criar migração
npm run prisma:push       # Sincronizar schema
npm run prisma:generate   # Gerar cliente Prisma
```

### Frontend

```bash
npm run dev               # Iniciar desenvolvimento
npm run build             # Build produção
npm run preview           # Prévia produção
npm run lint              # Lint do código
```

## 📋 Variáveis de Ambiente

### Backend (.env)

```env
DATABASE_URL      # mysql://user:password@host:port/db
PORT              # 3000
NODE_ENV          # development ou production
FRONTEND_URL      # http://localhost:5173
```

### Frontend (.env.local)

```env
VITE_API_URL      # http://localhost:3000
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **MySQL** - Banco de dados relacional
- **Dotenv** - Variáveis de ambiente
- **Nodemon** - Auto-reload em desenvolvimento

### Frontend
- **React** - Biblioteca UI
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS
- **JavaScript (ES6+)** - Linguagem

## 🚀 Como Começar

### Setup Rápido

```bash
# Terminal 1 - Backend
cd backend
cp .env.example .env
# Edite .env com suas credenciais do MySQL
npm install
npm run prisma:push
npm run dev

# Terminal 2 - Frontend
cd frontend
cp .env.example .env.local
npm install
npm run dev

# Abra http://localhost:5173
```

### Guia Completo
Veja [SETUP_COMPLETO.md](./SETUP_COMPLETO.md)

## 📊 Modelo de Dados

### Task
```
id: int (autoincrement, PK)
title: string (obrigatório)
description: string? (opcional)
completed: boolean (padrão: false)
createdAt: datetime (padrão: now())
```

## 🔄 Fluxos Principais

### Criar Tarefa
```
Usuário → Formulário → Validação → API POST
→ Controller → Model → Prisma → MySQL
→ Retorno JSON → UI Atualiza
```

### Listar Tarefas
```
App monta → useEffect → API GET
→ Controller → Model → Prisma → MySQL
→ Array JSON → State → Render
```

### Atualizar Tarefa
```
Usuário clica Editar → Form inline → API PUT
→ Controller → Model → Prisma → MySQL
→ Retorno → Lista atualiza
```

### Deletar Tarefa
```
Usuário clica Deletar → Confirmação → API DELETE
→ Controller → Model → Prisma → MySQL
→ Retorno → Lista atualiza
```

## ✅ Checklist de Verificação

- [x] Backend funcionando
- [x] Frontend funcionando
- [x] CRUD completo
- [x] Tailwind CSS aplicado
- [x] Componentes reutilizáveis
- [x] Tratamento de erros
- [x] Estados de loading
- [x] Validações
- [x] README completo
- [x] .env.example criado

## 🐛 Troubleshooting

### Backend não conecta ao banco
1. Verificar se MySQL está rodando
2. Conferir credenciais em .env
3. Executar `npm run prisma:push`

### Frontend não conecta à API
1. Verificar se backend está em `http://localhost:3000`
2. Conferir CORS habilitado
3. Verificar .env.local do frontend

### Erro de porta já em uso
```bash
# Matar processo na porta
npx kill-port 3000    # Backend
npx kill-port 5173    # Frontend
```

## 📚 Recursos Externos

- [Express.js Docs](https://expressjs.com/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Vite Docs](https://vitejs.dev/)
- [MySQL Docs](https://dev.mysql.com/doc/)

## 🎯 Próximos Passos

1. Testarprojeto localmente
2. Fazer commits no Git
3. Push para GitHub
4. Preparar apresentação
5. Review final de documentação

## 📞 Suporte

Para dúvidas sobre:
- **Backend**: Ver [backend/README.md](./backend/README.md)
- **Frontend**: Ver [frontend/README.md](./frontend/README.md)
- **Setup**: Ver [SETUP_COMPLETO.md](./SETUP_COMPLETO.md)
- **Arquitetura**: Ver [ARQUITETURA_DETALHADA.md](./ARQUITETURA_DETALHADA.md)
- **Conformidade**: Ver [CHECKLIST_CONFORMIDADE.md](./CHECKLIST_CONFORMIDADE.md)

---

**Data de Atualização**: 10/06/2026
**Versão do Projeto**: 1.0.0
**Status**: ✅ Pronto para produção
