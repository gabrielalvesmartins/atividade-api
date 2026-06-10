# Frontend - Gerenciador de Tarefas

## 📋 Sobre o Projeto

Interface web para gerenciar tarefas, desenvolvida com:
- **React** (SPA - Single Page Application)
- **Vite** (build tool)
- **Tailwind CSS** (estilização)
- **Fetch API** (consumo de API)

## 🏗️ Estrutura de Diretórios

```
frontend/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   ├── Header.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   └── TaskCard.jsx
│   ├── pages/          # Páginas principais
│   │   └── HomePage.jsx
│   ├── services/       # Serviços (API)
│   │   └── api.js
│   ├── App.jsx         # Componente raiz
│   ├── main.jsx        # Entry point
│   ├── App.css
│   └── index.css
├── public/             # Arquivos estáticos
├── package.json
├── .env.example        # Variáveis de ambiente
├── vite.config.js      # Configuração do Vite
└── README.md           # Este arquivo
```

## 🚀 Como Executar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite o `.env.local` com suas configurações:

```env
VITE_API_URL=http://localhost:3000
```

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará rodando em: `http://localhost:5173`

### 4. Build para produção

```bash
npm run build
```

Os arquivos compilados estarão em `dist/`

## 📱 Funcionalidades

### ✅ Listar Tarefas
- Exibe todas as tarefas cadastradas
- Mostra título, descrição, data de criação e status

### ✅ Criar Tarefa
- Formulário para criar nova tarefa
- Campos: título (obrigatório) e descrição (opcional)
- Validações básicas

### ✅ Editar Tarefa
- Clique em "Editar" para modificar tarefa
- Altere título, descrição ou status (concluído/pendente)

### ✅ Deletar Tarefa
- Remove tarefa com confirmação
- Solicita confirmação antes de deletar

### ✅ Status de Carregamento
- Exibe mensagem enquanto carrega tarefas
- Trata erros com mensagens amigáveis

### ✅ Marcar como Concluído
- Checkbox para marcar tarefa como concluída
- Tarefa concluída aparece com estilo diferente

## 🎨 Componentes

### Header
Exibe o título e descrição da aplicação

### TaskForm
Formulário para criar nova tarefa com campos de título e descrição

### TaskList
Lista todas as tarefas com tratamento de estados (carregamento, erro, vazio)

### TaskCard
Card individual de tarefa com opções de editar, deletar e marcar como concluído

## 🔗 Integração com API

O serviço `services/api.js` fornece métodos para integração:

```javascript
import { apiService } from './services/api'

// Listar tarefas
const tasks = await apiService.getTasks()

// Criar tarefa
const newTask = await apiService.createTask({
  title: 'Minha tarefa',
  description: 'Descrição',
  completed: false
})

// Atualizar tarefa
const updated = await apiService.updateTask(id, {
  title: 'Tarefa atualizada',
  completed: true
})

// Deletar tarefa
await apiService.deleteTask(id)
```

## 🎯 Estados da Aplicação

### Loading
Mostrado enquanto a API está sendo consultada

### Error
Exibe mensagens de erro ao usuário

### Empty
Mensagem quando não há tarefas cadastradas

### Success
Confirmação ao criar/editar/deletar tarefa

## 🎨 Tailwind CSS

A aplicação utiliza **Tailwind CSS** para estilização:

- Classes utilitárias do Tailwind
- Design responsivo
- Temas de cores consistentes
- Componentes prontos (botões, inputs, cards)

## 📝 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `VITE_API_URL` | URL da API backend | `http://localhost:3000` |

## 🧪 Como Testar

1. Inicie o backend (instruções em `../backend/README.md`)
2. Inicie o frontend: `npm run dev`
3. Abra `http://localhost:5173` no navegador
4. Teste as funcionalidades:
   - Crie uma tarefa
   - Liste todas as tarefas
   - Edite uma tarefa
   - Marque como concluída
   - Delete uma tarefa

## 📊 Fluxo de Dados

```
Usuario interage com a Interface
        ↓
Componentes React atualizam o estado
        ↓
Chamadas para apiService
        ↓
Requisições para Backend (http://localhost:3000)
        ↓
API retorna dados
        ↓
Frontend atualiza UI
```

## 🔧 Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Prévia de produção
npm run preview

# Lint do código
npm run lint
```

## 📦 Dependências Principais

- **react**: Biblioteca de UI
- **react-dom**: Renderização React no DOM
- **tailwindcss**: Framework CSS
- **@tailwindcss/vite**: Plugin Vite para Tailwind
- **vite**: Build tool e dev server

## ⚡ Dicas de Performance

- Componentes são reutilizáveis e bem organizados
- Uso eficiente de estados
- Carregamento sob demanda
- Otimização de renderização

## 🐛 Tratamento de Erros

- Validações no cliente (antes de enviar para API)
- Tratamento de erros de requisições
- Mensagens de erro amigáveis ao usuário
- Console logs para debug

## 🔗 Links Úteis

- [Documentação React](https://react.dev/)
- [Documentação Vite](https://vitejs.dev/)
- [Documentação Tailwind CSS](https://tailwindcss.com/)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## 📸 Capturas de Tela

(Adicionar screenshots da interface quando disponível)
