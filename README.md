# AV1 - Desenvolvimento de Sistemas Web (DSW)

Projeto prático de React + API + Banco de Dados - Sistema de Gerenciamento de Tarefas

## 📌 Informações do Projeto

- **Disciplina**: Desenvolvimento de Sistemas Web (DSW)
- **Avaliação**: AV1 (Parte 1 e Parte 2)
- **Tema**: Sistema de Gerenciamento de Tarefas
- **Entrega Parte 1**: 08/05/2024 ✅
- **Entrega Parte 2**: 29/05/2024 ⏳

## 🏗️ Estrutura do Repositório

```
av1-dsw-nome-sobrenome-2bimestre/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── app.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── src/
│   ├── package.json
│   └── README.md
└── README.md (este arquivo)
```

## 🛠️ Tecnologias

### Backend (Parte 1) ✅
- **Node.js** + **Express**
- **Prisma ORM**
- **MySQL**
- **CORS** + **Dotenv**

### Frontend (Parte 2) ⏳
- **React** (SPA)
- **Tailwind CSS**
- **Fetch API** / Axios

## 🚀 Como Executar

### Backend

```bash
cd backend

# Instalar dependências
npm install

# Configurar .env (copiar de .env.example e preencher)
cp .env.example .env

# Executar migrações do Prisma
npm run prisma:migrate

# Iniciar servidor (desenvolvimento)
npm run dev

# Ou modo produção
npm start
```

O servidor estará em: `http://localhost:3000`

### Frontend (Parte 2)

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar dev server
npm run dev

# Build para produção
npm run build
```

## 📡 API REST Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/tarefas` | Listar todas as tarefas |
| POST | `/api/tarefas` | Criar nova tarefa |
| PUT | `/api/tarefas/:id` | Atualizar tarefa |
| DELETE | `/api/tarefas/:id` | Deletar tarefa |
| GET | `/health` | Health check |

### Exemplos de Requisições

**GET - Listar tarefas**
```bash
curl http://localhost:3000/api/tarefas
```

**POST - Criar tarefa**
```bash
curl -X POST http://localhost:3000/api/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Minha tarefa"}'
```

**PUT - Atualizar tarefa**
```bash
curl -X PUT http://localhost:3000/api/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Tarefa atualizada","concluida":true}'
```

**DELETE - Deletar tarefa**
```bash
curl -X DELETE http://localhost:3000/api/tarefas/1
```

## ✅ Critérios de Avaliação - Parte 1

- **Lógica de Armazenamento (4,0 pts)**: Banco de dados via Prisma mapeando corretamente as entidades ✅
- **Setup de Ambiente (3,0 pts)**: Backend configurado, conectado ao MySQL e estruturado ✅
- **Viabilidade Técnica (2,0 pts)**: API funcional com CRUD e comunicação com banco ✅
- **GitHub (1,0 pt)**: Repositório único com backend/ e frontend/, commits organizados e README descritivo ✅

## ⏳ Próximas Etapas - Parte 2

- [ ] Criar estrutura do projeto React
- [ ] Implementar componentes reutilizáveis
- [ ] Integrar com API do backend
- [ ] Estilizar com Tailwind CSS
- [ ] Implementar navegação e estados (loading, erro)
- [ ] Testar fluxo completo

## 🧪 Teste da API

### Com Postman/Insomnia

1. Importe os endpoints da seção "API REST Endpoints"
2. Configure a URL base: `http://localhost:3000/api`
3. Teste cada operação CRUD

### Com Prisma Studio

```bash
cd backend
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
