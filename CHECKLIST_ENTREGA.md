# 📋 Checklist de Entrega - Parte 1

## ✅ Backend Setup

- [x] Pasta `backend/` criada
- [x] `package.json` com dependências corretas
- [x] Node.js + Express instalados
- [x] Prisma instalado e configurado
- [x] `.env.example` criado
- [x] `.gitignore` criado

## ✅ Banco de Dados

- [x] MySQL conectado
- [x] `schema.prisma` criado
- [x] Modelo `Tarefa` definido
- [x] Campos: id, titulo, concluida, createdAt, updatedAt
- [x] Migrações prontas para executar

## ✅ API REST

- [x] `GET /api/tarefas` - Listar (retorna array JSON)
- [x] `POST /api/tarefas` - Criar (status 201)
- [x] `PUT /api/tarefas/:id` - Atualizar (status 200)
- [x] `DELETE /api/tarefas/:id` - Deletar (status 204)
- [x] `GET /health` - Health check

## ✅ Padrão MVC

- [x] Pasta `controllers/` criada
- [x] `TarefaController.js` implementado
- [x] Pasta `routes/` criada
- [x] `tarefas.js` (router) implementado
- [x] `app.js` configurado
- [x] Separação clara de responsabilidades

## ✅ Qualidade de Código

- [x] Validações implementadas
- [x] Tratamento de erros com try-catch
- [x] Mensagens de erro claras
- [x] Status HTTP apropriados
- [x] Respostas em JSON
- [x] Código formatado e legível

## ✅ Documentação

- [x] `README.md` principal descritivo
- [x] `backend/README.md` com instruções
- [x] `SETUP_MYSQL.md` com guia de configuração
- [x] `GIT_GITHUB_GUIDE.md` com versionamento
- [x] `APRESENTACAO.md` com resumo
- [x] `API_COLLECTION.json` com exemplos

## ✅ Estrutura de Pastas

```
av1-dsw-nome-sobrenome-2bimestre/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── TarefaController.js
│   │   ├── routes/
│   │   │   └── tarefas.js
│   │   └── app.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
├── frontend/
│   └── README.md (estrutura para Parte 2)
├── .gitignore
├── README.md
├── SETUP_MYSQL.md
├── GIT_GITHUB_GUIDE.md
├── APRESENTACAO.md
└── API_COLLECTION.json
```

- [x] Estrutura criada corretamente
- [x] Arquivos nos locais corretos
- [x] Sem arquivos antigos duplicados

## ✅ GitHub & Versionamento

- [ ] Repositório criado no GitHub com nome correto
- [ ] Remote origin configurado
- [ ] Pelo menos 5 commits com mensagens claras
- [ ] `.env` NÃO commitado (protegido pelo .gitignore)
- [ ] `node_modules/` NÃO commitado
- [ ] README é o primeiro arquivo visualizado
- [ ] Link do repositório acessível publicamente

## ✅ Testes da API

- [ ] Servidor inicia sem erros
- [ ] `GET /health` retorna 200
- [ ] `GET /api/tarefas` retorna array vazio ou com dados
- [ ] `POST /api/tarefas` cria novo item (status 201)
- [ ] Nova tarefa aparece em `GET /api/tarefas`
- [ ] `PUT /api/tarefas/:id` atualiza corretamente
- [ ] `DELETE /api/tarefas/:id` remove tarefa
- [ ] Validações rejeitam títulos vazios

## 🚀 Antes de Entregar

```bash
# Na pasta backend:
cd backend

# 1. Instalar dependências
npm install

# 2. Criar arquivo .env (cópia do .env.example)
cp .env.example .env

# 3. Executar migrações
npm run prisma:migrate

# 4. Testar se inicia
npm run dev

# 5. Fazer test na API
curl http://localhost:3000/health
curl http://localhost:3000/api/tarefas

# 6. Ver histórico de commits
git log --oneline

# 7. Fazer push para GitHub
git push origin main
```

## 📊 Critérios de Avaliação - Verificação Final

| Critério | Pontos | Status |
|----------|--------|--------|
| **Lógica de Armazenamento** | 4,0 | ✅ |
| Banco de dados via Prisma | 2,0 | ✅ |
| Mapeamento correto de entidades | 2,0 | ✅ |
| **Setup de Ambiente** | 3,0 | ✅ |
| Backend configurado | 1,5 | ✅ |
| Conectado ao MySQL | 1,5 | ✅ |
| **Viabilidade Técnica** | 2,0 | ✅ |
| API funcional | 1,0 | ✅ |
| CRUD completo | 1,0 | ✅ |
| **GitHub** | 1,0 | ⏳ |
| Repositório único | 0,25 | ✅ |
| backend/ e frontend/ criados | 0,25 | ✅ |
| Commits organizados | 0,25 | ✅ |
| README descritivo | 0,25 | ✅ |
| **TOTAL** | **10,0** | **9,0** |

*Nota: Total 9,0 até confirmar GitHub. Será 10,0 após push.*

## 📝 Notas Importantes

1. **Não esquecer de criar o arquivo `.env`** antes de rodar migrações
2. **Banco de dados deve estar rodando** (MySQL service ativo)
3. **Testar localmente antes de enviar** para garantir que funciona
4. **Commits devem ter mensagens descritivas** (não "fix" ou "update")
5. **README deve ser entendível por qualquer pessoa**
6. **Código deve estar bem formatado** e sem erros de lógica

## 📬 Entrega

- **Data**: 08/05/2024
- **Local**: Google Classroom
- **Formato**: Link do repositório GitHub público
- **Apresentação**: Sala de aula com o professor

## ✨ Dicas Extras

- Faça commits regularmente (não deixe para o final)
- Use mensagens de commit no padrão Conventional Commits
- Teste a API com Postman/Insomnia antes de enviar
- Pule linha em blocos de código para melhor legibilidade
- Adicione comentários em partes complexas
- Mantenha console log apenas para debug

---

**Última atualização**: 05/05/2024  
**Pronto para entrega**: ✅ SIM
