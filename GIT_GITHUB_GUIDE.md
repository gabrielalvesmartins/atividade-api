# 📤 Guia: Git, GitHub e Commits

Instruções para versionamento do código e envio para o GitHub.

## Pré-requisitos

- Git instalado
- Conta no GitHub
- Repositório criado no GitHub

## Passo 1: Clonar ou Inicializar o Repositório

### Se o repositório já existe no GitHub:

```bash
git clone https://github.com/seu-usuario/av1-dsw-nome-sobrenome-2bimestre.git
cd av1-dsw-nome-sobrenome-2bimestre
```

### Se está iniciando um novo repositório:

```bash
git init
git remote add origin https://github.com/seu-usuario/av1-dsw-nome-sobrenome-2bimestre.git
```

## Passo 2: Configurar Git (primeira vez)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

## Passo 3: Fazer Commits Regularmente

### Visualizar status

```bash
git status
```

### Adicionar arquivos ao staging

```bash
# Adicionar um arquivo específico
git add backend/package.json

# Adicionar todos os arquivos modificados
git add .
```

### Criar um commit

```bash
git commit -m "feat: estrutura inicial do backend com Prisma"
```

### Exemplos de mensagens de commit (convenção Conventional Commits)

```bash
# Feature (nova funcionalidade)
git commit -m "feat: implementar CRUD de tarefas"

# Fix (correção)
git commit -m "fix: corrigir validação de título vazio"

# Docs (documentação)
git commit -m "docs: atualizar README com instruções de setup"

# Style (formatação)
git commit -m "style: formatar código do controller"

# Refactor (refatoração)
git commit -m "refactor: separar lógica em serviços"

# Test (testes)
git commit -m "test: adicionar testes da API"

# Chore (tarefas de manutenção)
git commit -m "chore: atualizar dependências"
```

## Passo 4: Fazer Push para o GitHub

### Push para a branch principal

```bash
git push origin main
```

ou

```bash
git push origin master
```

### Ver branches disponíveis

```bash
git branch -a
```

## Cronograma de Commits Recomendado

### Parte 1 (até 08/05)

```bash
# Setup inicial
git commit -m "feat: estrutura de pastas backend/frontend"
git commit -m "feat: configurar Express e Prisma"
git commit -m "feat: criar modelo Tarefa no Prisma"
git commit -m "feat: implementar controller de tarefas"
git commit -m "feat: implementar rotas da API"
git commit -m "docs: adicionar README descritivo"
git push origin main
```

### Parte 2 (até 29/05)

```bash
# Frontend
git commit -m "feat: criar estrutura React com Vite"
git commit -m "feat: criar componentes de lista de tarefas"
git commit -m "feat: implementar integração com API"
git commit -m "feat: adicionar Tailwind CSS"
git commit -m "feat: adicionar estados de loading e erro"
git commit -m "docs: atualizar README com instruções"
git push origin main
```

## Visualizar Histórico

```bash
# Último commit
git log -1

# Últimos 5 commits
git log -5

# Com formatação simplificada
git log --oneline

# Com grafo visual
git log --graph --oneline --all
```

## Sincronizar com Repositório Remoto

```bash
# Buscar atualizações do remoto
git fetch origin

# Trazer atualizações para branch local
git pull origin main
```

## ❌ Problemas Comuns

### "fatal: not a git repository"

Você não está em uma pasta de git.

**Solução:**
```bash
git init
# ou
cd /caminho/do/repositorio
```

### "fatal: 'origin' does not appear to be a 'git' repository"

Remote não está configurado.

**Solução:**
```bash
git remote add origin https://github.com/seu-usuario/seu-repo.git
```

### "nothing added to commit"

Você não adicionou arquivos ao staging.

**Solução:**
```bash
git add .
git commit -m "sua mensagem"
```

### "error: failed to push some refs to 'origin'"

Mudanças remotas conflitam com as locais.

**Solução:**
```bash
git pull origin main
# Resolver conflitos se houver
git add .
git commit -m "fix: merge conflict"
git push origin main
```

## 📋 Checklist para Entrega

### Parte 1 (08/05)

- [ ] Repositório criado no GitHub
- [ ] Estrutura backend/frontend criada
- [ ] Prisma configurado com schema.prisma
- [ ] MySQL conectado e funcionando
- [ ] CRUD completo implementado
- [ ] README descritivo com instruções
- [ ] Pelo menos 5 commits com mensagens claras
- [ ] Link do repositório enviado no Google Classroom

### Parte 2 (29/05)

- [ ] Frontend React criado
- [ ] Componentes reutilizáveis implementados
- [ ] API integrada com fetch/axios
- [ ] Tailwind CSS aplicado
- [ ] Estados de loading e erro
- [ ] Navegação funcional
- [ ] README atualizado
- [ ] Pelo menos 10 commits totais
- [ ] Link do repositório (mesmo) enviado no Google Classroom

## 📚 Referências

- [Git Docs](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
