# 📋 Guia de Setup - MySQL + Prisma

Este documento descreve como configurar o MySQL e conectar ao projeto.

## Pré-requisitos

- MySQL 5.7+ instalado e rodando
- MySQL Workbench ou MySQL Shell (opcional, para visualização)

## Passo 1: Criar Banco de Dados

### Opção A: Usando MySQL Workbench

1. Abra MySQL Workbench
2. Conecte ao seu servidor MySQL local
3. Clique em `File` → `New Query Tab`
4. Cole e execute:

```sql
CREATE DATABASE av1_tarefas;
```

### Opção B: Usando MySQL CLI

```bash
mysql -u root -p
```

Dentro do prompt MySQL:
```sql
CREATE DATABASE av1_tarefas;
EXIT;
```

## Passo 2: Configurar Variáveis de Ambiente

Na pasta `backend/`, copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
DATABASE_URL="mysql://seu_usuario:sua_senha@localhost:3306/av1_tarefas"
PORT=3000
```

### Exemplos de DATABASE_URL

**Usuário root sem senha:**
```
DATABASE_URL="mysql://root:@localhost:3306/av1_tarefas"
```

**Usuário root com senha:**
```
DATABASE_URL="mysql://root:senha123@localhost:3306/av1_tarefas"
```

**Outro usuário:**
```
DATABASE_URL="mysql://seu_usuario:sua_senha@localhost:3306/av1_tarefas"
```

## Passo 3: Instalar Dependências

```bash
cd backend
npm install
```

## Passo 4: Executar Migrações do Prisma

```bash
npm run prisma:migrate
```

Prisma criará a tabela `tarefas` automaticamente. Confirme a migração quando solicitado.

## Passo 5: Verificar Conexão

### Opção A: Usar Prisma Studio

```bash
npm run prisma:studio
```

Acesse `http://localhost:5555` para visualizar o banco em uma interface web.

### Opção B: Testar a API

```bash
npm run dev
```

Em outro terminal, teste um endpoint:

```bash
curl http://localhost:3000/health
```

Você deve receber:
```json
{
  "status": "OK",
  "message": "API rodando"
}
```

## ❌ Solução de Problemas

### Erro: "Can't connect to MySQL server"

**Causas possíveis:**
- MySQL não está rodando
- Credenciais incorretas
- Banco não foi criado

**Solução:**
1. Verifique se MySQL está rodando
2. Teste a conexão manualmente:
   ```bash
   mysql -u root -p -h localhost
   ```
3. Verifique se o banco `av1_tarefas` existe:
   ```sql
   SHOW DATABASES;
   ```

### Erro: "Unknown database"

O banco `av1_tarefas` não existe.

**Solução:**
Crie o banco conforme Passo 1.

### Erro: "Access denied for user"

Credenciais incorretas no `.env`.

**Solução:**
1. Verifique a senha e usuário
2. Teste a conexão manualmente:
   ```bash
   mysql -u seu_usuario -p -h localhost
   ```
3. Atualize o arquivo `.env`

### Migration falha

O Prisma CLI está travado.

**Solução:**
```bash
npm run prisma:generate
npm run prisma:migrate
```

## ✅ Verificação Final

Após completar todos os passos:

1. ✅ Banco `av1_tarefas` existe
2. ✅ Tabela `tarefas` foi criada
3. ✅ API responde em `http://localhost:3000`
4. ✅ Prisma Studio acessível em `http://localhost:5555`

## 📚 Referências

- [Prisma Docs](https://www.prisma.io/docs/)
- [MySQL Docs](https://dev.mysql.com/doc/)
- [Express Docs](https://expressjs.com/)
