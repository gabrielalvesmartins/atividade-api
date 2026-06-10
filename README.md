# AV1 - Desenvolvimento de Sistemas Web (DSW)

Projeto completo de React + API + Banco de Dados - Sistema de Gerenciamento de Tarefas

## 📌 Informações do Projeto

- **Disciplina**: Desenvolvimento de Sistemas Web (DSW)
- **Avaliação**: AV1 (Parte 1 e Parte 2)
- **Tema**: Sistema de Gerenciamento de Tarefas
- **Entrega Parte 1**: 08/05 ✅
- **Entrega Parte 2**: 29/05 ✅

## 🏗️ Estrutura do Repositório

```
av1-dsw-nome-sobrenome-2bimestre/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── TarefaController.js
│   │   ├── models/
│   │   │   └── tarefaModel.js
│   │   ├── routes/
│   │   │   └── tarefaRoutes.js
│   │   ├── config/
│   │   │   └── prisma.js
│   │   ├── app.js
│   │   └── server.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskCard.jsx
│   │   ├── pages/
│   │   │   └── HomePage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── .env.example
│   ├── vite.config.js
│   └── README.md
└── README.md (este arquivo)
```

## 🛠️ Tecnologias

### Backend (Parte 1) ✅
- **Node.js** + **Express**
- **Prisma ORM**
- **MySQL**
- **CORS** (habilitado)
- **Dotenv**

### Frontend (Parte 2) ✅
- **React** (SPA - Single Page Application)
- **Tailwind CSS**
- **Vite** (build tool)
- **Fetch API** (consumo de API)

## 🚀 Guia Rápido de Execução

### Pré-requisitos

- **Node.js** v16+
- **npm** ou **yarn**
- **MySQL** 5.7+

### 1. Backend

```bash
cd backend

# Instalar dependências
npm install

# Copiar arquivo de configuração
cp .env.example .env

# Editar .env com suas credenciais do MySQL
# DATABASE_URL="mysql://seu_usuario:sua_senha@localhost:3306/tarefas_db"

# Criar banco de dados (opcional, Prisma criará)
# mysql> CREATE DATABASE tarefas_db;

# Executar migrações
npm run prisma:migrate dev

# Iniciar servidor
npm run dev
```

**Backend rodando em**: `http://localhost:3000`

### 2. Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Copiar arquivo de configuração
cp .env.example .env.local

# Iniciar dev server
npm run dev
```

**Frontend rodando em**: `http://localhost:5173`

### 3. Testar a Aplicação

1. Abra `http://localhost:5173` no navegador
2. Crie uma nova tarefa usando o formulário
3. Veja a lista de tarefas atualizar
4. Teste editar, marcar como concluído e deletar

## 📡 API REST Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/health` | Health check da API |
| GET | `/` | Informações da API |
| GET | `/tasks` | Listar todas as tarefas |
| GET | `/tasks/:id` | Buscar tarefa por ID |
| POST | `/tasks` | Criar nova tarefa |
| PUT | `/tasks/:id` | Atualizar tarefa |
| DELETE | `/tasks/:id` | Deletar tarefa |

### Exemplos de Requisições

**GET - Listar tarefas**
```bash
curl http://localhost:3000/tasks
```

**POST - Criar tarefa**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Minha tarefa",
    "description": "Descrição da tarefa",
    "completed": false
  }'
```

**PUT - Atualizar tarefa**
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tarefa atualizada",
    "completed": true
  }'
```

**DELETE - Deletar tarefa**
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## 📋 Funcionalidades Implementadas

### ✅ Parte 1 - Backend
- [x] API REST com Node.js + Express
- [x] Padrão MVC implementado
- [x] Banco de dados MySQL com Prisma ORM
- [x] CRUD completo (Create, Read, Update, Delete)
- [x] Health check endpoint
- [x] CORS habilitado
- [x] Tratamento de erros
- [x] Validações básicas
- [x] README descritivo

### ✅ Parte 2 - Frontend
- [x] SPA em React com Vite
- [x] Componentes reutilizáveis
- [x] Consumo de API via Fetch
- [x] Formulário para criar tarefas
- [x] Listagem com paginação visual
- [x] Edição de tarefas inline
- [x] Deleção com confirmação
- [x] Status de carregamento
- [x] Tratamento de erros
- [x] Tailwind CSS para estilização
- [x] Interface responsiva
- [x] README descritivo

## 🎯 Fluxo de Dados

```
┌─────────────────┐
│  React UI       │
└────────┬────────┘
         │ (Fetch)
         ↓
┌─────────────────┐
│  Express API    │
└────────┬────────┘
         │ (Queries)
         ↓
┌─────────────────┐
│  MySQL Database │
└─────────────────┘
```

## ✅ Critérios de Avaliação

### Parte 1 - Backend (10 pts)
- **Lógica de Armazenamento (4,0 pts)**: ✅ Banco de dados via Prisma
- **Setup de Ambiente (3,0 pts)**: ✅ Backend configurado e conectado ao MySQL
- **Viabilidade Técnica (2,0 pts)**: ✅ API funcional com CRUD
- **GitHub (1,0 pt)**: ✅ Repositório único, commits organizados

### Parte 2 - Frontend (10 pts)
- **Clareza da Proposta (3,0 pts)**: ✅ Sistema demonstra interação completa
- **Estrutura de Interface (4,0 pts)**: ✅ Componentes, listagens e Tailwind CSS
- **Organização (2,0 pts)**: ✅ Código estruturado e navegação compreensível
- **GitHub (1,0 pt)**: ✅ Mesmo repositório, backend e frontend funcionais

## 🔧 Scripts Disponíveis

### Backend
```bash
npm run dev              # Iniciar em modo desenvolvimento
npm start               # Iniciar em modo produção
npm run prisma:studio  # Abrir Prisma Studio (GUI)
npm run prisma:migrate # Executar migrações
npm run prisma:push    # Sincronizar schema
```

### Frontend
```bash
npm run dev     # Iniciar servidor de desenvolvimento
npm run build   # Build para produção
npm run preview # Prévia de produção
npm run lint    # Lint do código
```

## 🧪 Como Testar com Insomnia/Postman

1. Importe a coleção ou crie manualmente os endpoints
2. Configure as requisições conforme exemplos acima
3. Teste cada operação:
   - Criar tarefa (POST)
   - Listar tarefas (GET)
   - Atualizar tarefa (PUT)
   - Deletar tarefa (DELETE)

## 📚 Documentação Adicional

- [Backend - README](./backend/README.md)
- [Frontend - README](./frontend/README.md)

## 🔗 Links Úteis

- [Express.js](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 📝 Notas Importantes

- O projeto utiliza MySQL (não MariaDB)
- CORS está habilitado para `http://localhost:5173`
- Variáveis de ambiente devem ser configuradas em `.env`
- O frontend espera a API em `http://localhost:3000`
- Tailwind CSS está configurado e funcional

## 🤝 Commits no GitHub

O projeto segue boas práticas de versionamento:
- Commits descritivos e objetivos
- Estrutura clara de branches
- Histórico legível e rastreável

## 🎓 Conclusão

Este projeto demonstra:
- ✅ Fluxo completo de dados (frontend → API → banco)
- ✅ Separação entre backend e frontend
- ✅ Organização de código e versionamento
- ✅ Implementação de tecnologias obrigatórias
- ✅ Funcionalidade completa e testada
npm run prisma:studio
```

Acesse: `http://localhost:5555`

## 📝 Requisitos Atendidos

✅ Node.js + Express configurados  
✅ Prisma ORM implementado  
✅ MySQL como banco de dados  
✅ Padrão MVC estruturado  
✅ CRUD completo (GET, POST, PUT, DELETE)  
✅ Validações implementadas  
✅ Retorno de dados em JSON  
✅ Tratamento de erros  
✅ Estrutura de pastas correta  
✅ README descritivo  
✅ Commits organizados no Git  

## 📧 Autor

Projeto desenvolvido para a disciplina **Desenvolvimento de Sistemas Web**

---

**Última atualização**: 05/05/2024
