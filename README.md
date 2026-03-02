# AV1 - API Node.js (Parte 1)

Projeto simples em Node + Express para a AV1.

Como usar

1. Instalar dependências:

```bash
npm install
```

2. Rodar servidor:

```bash
npm run dev
```

Rotas

- GET /tarefas — retorna a lista de tarefas (status 200)
- POST /tarefas — cria uma nova tarefa (campo `titulo` obrigatório). Retorna status 201 quando criado; 400 em caso de validação.

Exemplos (curl)

```bash
curl http://localhost:3000/tarefas

curl -X POST http://localhost:3000/tarefas -H "Content-Type: application/json" -d '{"titulo":"Nova tarefa"}'
```

Arquivos principais

- package.json
- src/server.js
- src/dados.js

Para entrega: crie um repositório público no GitHub, adicione os arquivos, commit e faça push. Envie o link do repositório conforme solicitado pela disciplina.
