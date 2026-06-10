# Guia Completo de Setup e Execução

## 🎯 Objetivo

Configurar e executar o projeto completo de gerenciamento de tarefas com backend em Node.js/Express/Prisma/MySQL e frontend em React/Tailwind.

## 📋 Pré-requisitos

1. **Node.js** (v16 ou superior)
   - Verificar: `node --version`
   
2. **npm** (geralmente vem com Node.js)
   - Verificar: `npm --version`
   
3. **MySQL** (v5.7 ou superior)
   - Verificar: `mysql --version`
   - Ou usar ferramentas como XAMPP, Docker, etc.

## 🔧 Passo 1: Preparar o Banco de Dados

### Opção A: Criação Manual

```bash
# Acessar MySQL
mysql -u root -p

# Criar o banco de dados
CREATE DATABASE tarefas_db;

# Sair
EXIT;
```

### Opção B: Deixar o Prisma Criar

Se usar esta opção, pule para o Passo 3.

## 🚀 Passo 2: Configurar Backend

### 2.1 Navegar até a pasta backend

```bash
cd backend
```

### 2.2 Instalar dependências

```bash
npm install
```

### 2.3 Copiar arquivo de ambiente

```bash
cp .env.example .env
```

### 2.4 Editar o arquivo `.env`

Edite o arquivo `.env` com seus dados do MySQL:

```env
DATABASE_URL="mysql://seu_usuario:sua_senha@localhost:3306/tarefas_db"
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Exemplo com usuário root sem senha:**
```env
DATABASE_URL="mysql://root@localhost:3306/tarefas_db"
```

### 2.5 Executar migrações do Prisma

```bash
npm run prisma:push
```

Ou se preferir criar uma migração nomeada:

```bash
npm run prisma:migrate
```

Isso criará automaticamente a tabela `Task` no banco de dados.

### 2.6 Iniciar o servidor

```bash
npm run dev
```

**Resultado esperado:**
```
Conexão bem-sucedida com o banco de dados!
Servidor rodando em http://localhost:3000
```

### 2.7 Testar a API

Abra outra aba do terminal e teste:

```bash
# Health check
curl http://localhost:3000/health

# Listar tarefas (deve retornar array vazio)
curl http://localhost:3000/tasks

# Criar tarefa
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tarefa de teste",
    "description": "Descrição da tarefa",
    "completed": false
  }'
```

## 💻 Passo 3: Configurar Frontend

### 3.1 Abrir novo terminal

Deixe o backend rodando e abra outro terminal.

### 3.2 Navegar até a pasta frontend

```bash
cd frontend
```

### 3.3 Instalar dependências

```bash
npm install
```

### 3.4 Copiar arquivo de ambiente

```bash
cp .env.example .env.local
```

### 3.5 Editar o arquivo `.env.local` (opcional)

Se a API está em `http://localhost:3000`, o padrão já está correto.

```env
VITE_API_URL=http://localhost:3000
```

### 3.6 Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

**Resultado esperado:**
```
  VITE v8.0.10  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

## 🌐 Passo 4: Acessar a Aplicação

1. Abra o navegador
2. Acesse: `http://localhost:5173`
3. A interface do gerenciador de tarefas deve aparecer

## ✅ Testes Funcionais

### 4.1 Criar uma Tarefa

1. Preencha o formulário:
   - **Título**: "Aprender React"
   - **Descrição**: "Estudar fundamentos de React"
2. Clique em "Criar Tarefa"
3. A tarefa deve aparecer na lista abaixo

### 4.2 Listar Tarefas

A lista deve exibir todas as tarefas criadas com:
- Título em negrito
- Descrição abaixo
- Data de criação
- Botões de ação

### 4.3 Marcar como Concluído

1. Clique no checkbox de uma tarefa
2. A tarefa deve mudar de estilo (ficar com linha e cor diferente)

### 4.4 Editar uma Tarefa

1. Clique no botão "Editar" em uma tarefa
2. O card deve se transformar em formulário
3. Modifique os dados
4. Clique em "Salvar"
5. As alterações devem aparecer na lista

### 4.5 Deletar uma Tarefa

1. Clique no botão "Deletar"
2. Confirme a ação
3. A tarefa deve ser removida da lista

## 🔍 Troubleshooting

### Erro: "ECONNREFUSED - Conexão recusada"

**Problema**: Backend não está rodando ou banco de dados não está conectado.

**Solução**:
```bash
# Certifique-se de que o backend está rodando
cd backend
npm run dev

# Verifique se MySQL está rodando
# Teste a conexão ao banco
mysql -u root -p tarefas_db
```

### Erro: "Cannot find module '@prisma/client'"

**Problema**: Dependências não foram instaladas.

**Solução**:
```bash
cd backend
npm install
npm run prisma:generate
```

### Erro: "Database doesn't exist"

**Problema**: Banco de dados não foi criado.

**Solução**:
```bash
cd backend
npm run prisma:push
```

### Erro: "CORS policy blocked"

**Problema**: Frontend não consegue acessar API.

**Solução**: Verifique se:
1. Backend está rodando em `http://localhost:3000`
2. Frontend está em `http://localhost:5173`
3. CORS está habilitado no `app.js`

### Erro: "Network error when fetching"

**Problema**: Frontend não consegue conectar ao backend.

**Solução**: Verifique o arquivo `.env.local` do frontend:
```env
VITE_API_URL=http://localhost:3000
```

## 📊 Estrutura de Pastas Confirmada

```
projeto/
├── backend/
│   ├── src/
│   ├── prisma/
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── README.md
└── README.md
```

## 🔄 Ciclo de Desenvolvimento

### Durante o desenvolvimento:

1. **Terminal 1** - Backend:
```bash
cd backend
npm run dev
```

2. **Terminal 2** - Frontend:
```bash
cd frontend
npm run dev
```

3. **Terminal 3** - Qualquer comando adicional

O backend e frontend têm **hot reload** automático (atualizam quando você salva os arquivos).

## 📦 Build para Produção

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## 🧹 Limpeza

### Limpar cache do npm

```bash
npm cache clean --force
```

### Reinstalar dependências

```bash
# Backend
cd backend
rm -rf node_modules
npm install

# Frontend
cd frontend
rm -rf node_modules
npm install
```

### Reset do banco de dados

```bash
cd backend
npm run prisma:migrate reset
```

**⚠️ Aviso**: Isso deletará todos os dados!

## 📚 Documentação Adicional

- [Backend - README.md](./backend/README.md)
- [Frontend - README.md](./frontend/README.md)
- [Checklist de Conformidade](./CHECKLIST_CONFORMIDADE.md)

## 🎓 Resumo do Fluxo

1. **Usuário acessa** `http://localhost:5173`
2. **Frontend carrega** a interface React
3. **Frontend faz requisição** GET `/tasks` para o backend
4. **Backend consulta** o banco de dados MySQL
5. **Backend retorna** lista de tarefas em JSON
6. **Frontend exibe** as tarefas na interface
7. **Usuário interage** (criar, editar, deletar)
8. **Frontend faz requisição** POST/PUT/DELETE
9. **Backend valida** e executa operação
10. **Backend atualiza** banco de dados
11. **Frontend atualiza** interface com novos dados

## ✨ Próximos Passos

Depois de confirmar que tudo está funcionando:

1. Fazer commits no Git
2. Push para GitHub
3. Preparar a apresentação
4. Revisar a documentação

---

**Tempo estimado de setup**: 15-20 minutos
**Status**: Pronto para usar ✅
