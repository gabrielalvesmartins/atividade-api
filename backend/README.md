# AV1 - Backend (API REST + Prisma + MySQL)

Sistema de gerenciamento de tarefas desenvolvido com Node.js, Express, Prisma ORM e MySQL.

## 🛠️ Tecnologias

- **Node.js** + **Express**: Framework web
- **Prisma ORM**: Abstração do banco de dados
- **MySQL**: Banco de dados relacional
- **CORS**: Suporte a requisições entre origens
- **Dotenv**: Gerenciamento de variáveis de ambiente

## 📋 Requisitos

- Node.js v16+
- MySQL 5.7+ ou MariaDB
- npm ou yarn

## 🚀 Instalação e Setup

### 1. Clonar o repositório
```bash
git clone <seu-repositorio>
cd av1-dsw-nome-sobrenome-2bimestre/backend
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do MySQL:
```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/av1_tarefas"
PORT=3000
```

### 4. Executar migrações do Prisma

Crie o banco de dados e as tabelas:
```bash
npm run prisma:migrate
```

Isso criará a tabela `tarefas` conforme definido em `schema.prisma`.

### 5. Iniciar o servidor

Modo desenvolvimento (com hot-reload):
```bash
npm run dev
```

Modo produção:
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`.

## 📡 API REST - Endpoints

### GET `/api/tarefas`
Retorna lista de todas as tarefas.

**Resposta (200)**:
```json
[
  {
    "id": 1,
    "titulo": "Estudar Node",
    "concluida": false,
    "createdAt": "2024-05-05T10:30:00Z",
    "updatedAt": "2024-05-05T10:30:00Z"
  }
]
```

---

### POST `/api/tarefas`
Cria uma nova tarefa.

**Body (JSON)**:
```json
{
  "titulo": "Minha nova tarefa"
}
```

**Resposta (201)**:
```json
{
  "id": 2,
  "titulo": "Minha nova tarefa",
  "concluida": false,
  "createdAt": "2024-05-05T10:35:00Z",
  "updatedAt": "2024-05-05T10:35:00Z"
}
```

**Erro (400)** - Título vazio ou não fornecido:
```json
{
  "erro": "Título é obrigatório."
}
```

---

### PUT `/api/tarefas/:id`
Atualiza uma tarefa existente.

**Body (JSON)**:
```json
{
  "titulo": "Tarefa atualizada",
  "concluida": true
}
```

**Resposta (200)**:
```json
{
  "id": 1,
  "titulo": "Tarefa atualizada",
  "concluida": true,
  "createdAt": "2024-05-05T10:30:00Z",
  "updatedAt": "2024-05-05T10:40:00Z"
}
```

**Erro (404)** - Tarefa não encontrada:
```json
{
  "erro": "Tarefa não encontrada."
}
```

---

### DELETE `/api/tarefas/:id`
Deleta uma tarefa.

**Resposta (204)**: Sem corpo

**Erro (404)** - Tarefa não encontrada:
```json
{
  "erro": "Tarefa não encontrada."
}
```

---

### GET `/health`
Health check da API.

**Resposta (200)**:
```json
{
  "status": "OK",
  "message": "API rodando"
}
```

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── controllers/
│   │   └── TarefaController.js      # Lógica de negócio das tarefas
│   ├── routes/
│   │   └── tarefas.js               # Rotas da API
│   └── app.js                       # Configuração do Express
├── prisma/
│   └── schema.prisma                # Definição do modelo de dados
├── package.json
├── .env.example
└── README.md
```

## 🧪 Testando a API

### Com cURL

```bash
# GET - Listar tarefas
curl http://localhost:3000/api/tarefas

# POST - Criar tarefa
curl -X POST http://localhost:3000/api/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Nova tarefa"}'

# PUT - Atualizar tarefa (id = 1)
curl -X PUT http://localhost:3000/api/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Tarefa atualizada","concluida":true}'

# DELETE - Deletar tarefa (id = 1)
curl -X DELETE http://localhost:3000/api/tarefas/1
```

### Com Postman ou Insomnia

1. Importe as requisições ou crie manualmente os endpoints acima
2. Teste cada operação CRUD
3. Valide as respostas e códigos de status

## 🔧 Prisma Studio

Para visualizar e gerenciar os dados do banco via interface web:

```bash
npm run prisma:studio
```

Acesse `http://localhost:5555`

## 📝 Observações

- O campo `createdAt` é preenchido automaticamente com a data/hora de criação
- O campo `updatedAt` é atualizado automaticamente quando o registro é modificado
- A API retorna os dados ordenados pela data de criação (mais recentes primeiro)
- Validação de título vazio está implementada em ambas operações (POST e PUT)

## 📧 Autor

Projeto desenvolvido para AV1 - Desenvolvimento de Sistemas Web
