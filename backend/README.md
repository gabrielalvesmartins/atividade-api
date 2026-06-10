# Backend - API de Gerenciamento de Tarefas

## 📋 Sobre o Projeto

API REST para gerenciamento de tarefas, desenvolvida com:
- **Node.js** + **Express**
- **Prisma ORM**
- **MySQL**
- Padrão de arquitetura **MVC**

## 🏗️ Estrutura de Diretórios

```
backend/
├── src/
│   ├── controllers/      # Lógica das requisições
│   ├── models/          # Lógica de dados (Prisma)
│   ├── routes/          # Definição de rotas
│   ├── config/          # Configurações (banco de dados)
│   ├── app.js           # Configuração do Express
│   └── server.js        # Inicialização do servidor
├── prisma/
│   └── schema.prisma    # Schema do banco de dados
├── package.json         # Dependências
├── .env.example         # Exemplo de variáveis de ambiente
└── README.md            # Este arquivo
```

## 🚀 Como Executar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` e crie um `.env`:

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:

```env
DATABASE_URL="mysql://seu_usuario:sua_senha@localhost:3306/tarefas_db"
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Configurar banco de dados

Execute as migrações do Prisma para criar as tabelas:

```bash
npm run prisma:migrate
```

Ou sincronize o schema:

```bash
npm run prisma:push
```

### 4. Iniciar o servidor

Modo desenvolvimento (com auto-reload):

```bash
npm run dev
```

Modo produção:

```bash
npm start
```

O servidor estará rodando em: `http://localhost:3000`

## 📡 Endpoints da API

### Base URL
```
http://localhost:3000
```

### Health Check
```
GET /health
```
Retorna o status da API.

### Tarefas

#### Listar todas as tarefas
```
GET /tasks
```
**Resposta (200):**
```json
[
  {
    "id": 1,
    "title": "Minha tarefa",
    "description": "Descrição da tarefa",
    "completed": false,
    "createdAt": "2024-05-08T10:30:00.000Z"
  }
]
```

#### Buscar tarefa por ID
```
GET /tasks/:id
```
**Parâmetro:**
- `id` (número): ID da tarefa

**Resposta (200):**
```json
{
  "id": 1,
  "title": "Minha tarefa",
  "description": "Descrição da tarefa",
  "completed": false,
  "createdAt": "2024-05-08T10:30:00.000Z"
}
```

#### Criar nova tarefa
```
POST /tasks
```
**Body (JSON):**
```json
{
  "title": "Nova tarefa",
  "description": "Descrição opcional",
  "completed": false
}
```
**Resposta (201):**
```json
{
  "id": 2,
  "title": "Nova tarefa",
  "description": "Descrição opcional",
  "completed": false,
  "createdAt": "2024-05-09T14:20:00.000Z"
}
```

#### Atualizar tarefa
```
PUT /tasks/:id
```
**Parâmetro:**
- `id` (número): ID da tarefa

**Body (JSON):**
```json
{
  "title": "Tarefa atualizada",
  "description": "Nova descrição",
  "completed": true
}
```
**Resposta (200):**
```json
{
  "id": 1,
  "title": "Tarefa atualizada",
  "description": "Nova descrição",
  "completed": true,
  "createdAt": "2024-05-08T10:30:00.000Z"
}
```

#### Deletar tarefa
```
DELETE /tasks/:id
```
**Parâmetro:**
- `id` (número): ID da tarefa

**Resposta (200):**
```json
{
  "message": "Tarefa deletada com sucesso",
  "id": 1
}
```

## 🧪 Testando com Postman ou Insomnia

1. Importe a coleção (se disponível) ou crie manualmente as requisições
2. Configure a variável de ambiente `{{base_url}}` como `http://localhost:3000`
3. Teste cada endpoint

## 📁 Configuração do Banco de Dados

### Schema Prisma

O arquivo `prisma/schema.prisma` define o modelo de dados:

```prisma
model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
}
```

### Alterar Schema

1. Edite `prisma/schema.prisma`
2. Execute: `npm run prisma:migrate dev`
3. Nomeie a migração
4. Pronto! O schema foi atualizado

## 🔧 Scripts Disponíveis

```bash
# Iniciar em modo desenvolvimento
npm run dev

# Iniciar em modo produção
npm start

# Abrir Prisma Studio (GUI para banco de dados)
npm run prisma:studio

# Executar migrações
npm run prisma:migrate

# Sincronizar schema
npm run prisma:push
```

## 📝 Padrão MVC

### Models (models/)
- Lógica de manipulação de dados via Prisma
- Consultas ao banco de dados
- Validações de dados

### Controllers (controllers/)
- Processam requisições HTTP
- Chamam os models
- Retornam respostas formatadas

### Routes (routes/)
- Definem os endpoints
- Mapeiam requisições para controllers
- Validações básicas

## ⚙️ Middleware Configurados

- **CORS**: Permite requisições do frontend
- **express.json()**: Processa JSON
- **express.urlencoded()**: Processa dados de formulários

## 🐛 Tratamento de Erros

Todos os endpoints retornam erros padronizados:

```json
{
  "erro": "Descrição do erro",
  "detalhes": "Informações adicionais (em desenvolvimento)"
}
```

## 📚 Dependências Principais

- **express**: Framework web
- **prisma**: ORM para banco de dados
- **@prisma/client**: Cliente Prisma
- **dotenv**: Variáveis de ambiente
- **mysql2**: Driver MySQL
- **nodemon**: Auto-reload em desenvolvimento

## 🔗 Links Úteis

- [Documentação Express](https://expressjs.com/)
- [Documentação Prisma](https://www.prisma.io/docs/)
- [Documentação MySQL](https://dev.mysql.com/doc/)
- ✅ **Escalabilidade**: Facilita a adição de novos recursos
- ✅ **Testabilidade**: Permite testar cada camada independentemente
- ✅ **Reutilização**: Código pode ser reutilizado em diferentes contextos

## 📂 Estrutura do Projeto

```
api-base-2bimestre/
├── src/
│   ├── models/              # Camada de Dados
│   │   └── tarefaModel.js   # Lógica de negócio das tarefas
│   │
│   ├── controllers/         # Camada de Controle
│   │   └── tarefaController.js  # Processa requisições HTTP
│   │
│   ├── routes/              # Definição de Rotas
│   │   └── tarefaRoutes.js  # Rotas da API
│   │
│   ├── views/               # Camada de Apresentação (para futuro frontend)
│   │   └── README.md
│   │
│   ├── config/              # Configurações (vazio no momento)
│   │
│   ├── app.js               # Configuração do Express
│   ├── server.js            # Inicialização do servidor
│   ├── index.js             # Arquivo de teste (opcional)
│   └── tarefas.js           # Arquivo antigo (pode ser removido)
│
├── package.json
└── README.md
```

## 🔄 Fluxo de uma Requisição

```
Cliente → Rota → Controller → Model → Controller → Resposta JSON (View)
```

**Exemplo prático:**

1. **Cliente** faz uma requisição: `GET /tarefas`
2. **Rota** (`tarefaRoutes.js`) identifica a rota e chama o controller
3. **Controller** (`tarefaController.js`) recebe a requisição
4. **Controller** chama o **Model** (`tarefaModel.js`) para buscar os dados
5. **Model** retorna os dados para o **Controller**
6. **Controller** envia a resposta JSON de volta ao **Cliente**

## 🚀 Como Executar

### Instalação

```bash
npm install
```

### Iniciar o Servidor

```bash
npm run dev
```

O servidor estará rodando em: `http://localhost:3000`

## 📡 Endpoints da API

### Listar todas as tarefas

```http
GET /tarefas
```

### Obter uma tarefa específica

```http
GET /tarefas/:id
```

### Criar uma nova tarefa

```http
POST /tarefas
Content-Type: application/json

{
  "descricao": "Minha nova tarefa"
}
```

### Atualizar uma tarefa

```http
PATCH /tarefas/:id
Content-Type: application/json

{
  "descricao": "Tarefa atualizada",
  "concluida": true
}
```

### Excluir uma tarefa

```http
DELETE /tarefas/:id
```

## 🎯 Detalhes das Camadas

### 📊 Model (`models/tarefaModel.js`)

Responsável por:

- Armazenar dados (em memória, por enquanto)
- Implementar lógica de negócio
- Operações CRUD (Create, Read, Update, Delete)

**Funções principais:**

- `obterTodasTarefas()`
- `obterTarefaPorId(id)`
- `criarNovaTarefa(descricao)`
- `atualizarTarefa(id, descricao, status)`
- `excluirTarefa(id)`

### 🎮 Controller (`controllers/tarefaController.js`)

Responsável por:

- Receber requisições HTTP
- Validar dados de entrada
- Chamar métodos do Model
- Retornar respostas HTTP apropriadas

**Funções principais:**

- `listarTarefas(req, res)`
- `obterTarefa(req, res)`
- `criarTarefa(req, res)`
- `atualizarTarefa(req, res)`
- `excluirTarefa(req, res)`

### 🛣️ Routes (`routes/tarefaRoutes.js`)

Responsável por:

- Definir as rotas da API
- Mapear URLs para controllers
- Organizar endpoints por recurso

### ⚙️ App (`app.js`)

Responsável por:

- Configurar middlewares
- Registrar rotas
- Configurar tratamento de erros
- Exportar a aplicação configurada

### 🖥️ Server (`server.js`)

Responsável por:

- Importar a aplicação
- Iniciar o servidor na porta especificada
- Separar lógica de configuração da inicialização

## 🔮 Próximos Passos

- [ ] Integrar banco de dados (MongoDB, PostgreSQL, etc.)
- [ ] Adicionar autenticação e autorização
- [ ] Implementar validação com bibliotecas (Joi, Yup)
- [ ] Criar testes unitários e de integração
- [ ] Adicionar frontend (React, Vue, etc.)
- [ ] Implementar tratamento de erros centralizado
- [ ] Adicionar paginação nas listagens
- [ ] Documentar API com Swagger

## 🛠️ Tecnologias

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web minimalista
- **ES Modules**: Uso de `import/export` ao invés de `require`

## 📝 Scripts Disponíveis

```json
{
  "dev": "np src/server.js", // Inicia o servidor em modo desenvolvimento
  "batata": "node src/index.js" // Executa o arquivo de teste
}
```

## ⚠️ Observações

- Os dados estão armazenados **em memória** e serão perdidos quando o servidor reiniciar
- Para persistência de dados, será necessário integrar um banco de dados
- O diretório `views/` está preparado para receber o frontend no futuro

## 📖 Aprendizado

Este projeto é ideal para entender:

- ✅ Como estruturar uma API REST
- ✅ O que é e como aplicar o padrão MVC
- ✅ Separação de responsabilidades
- ✅ Boas práticas de organização de código
- ✅ Como preparar um projeto para crescer

---

Desenvolvido para fins educacionais 🎓
