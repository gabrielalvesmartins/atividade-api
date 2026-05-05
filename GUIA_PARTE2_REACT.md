# 🎨 Guia: Implementação da Parte 2 (Frontend React)

Este documento descreve como criar o frontend React consumindo a API que desenvolvemos na Parte 1.

## Pré-requisitos

- Node.js v16+
- npm ou yarn
- API do backend rodando em `http://localhost:3000`

## Passo 1: Criar Projeto React com Vite

```bash
cd frontend

# Criar novo projeto React
npm create vite@latest . -- --template react

# Instalar dependências
npm install

# Adicionar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Passo 2: Configurar Tailwind CSS

Edite `tailwind.config.js`:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Edite `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Passo 3: Estrutura de Pastas

```bash
frontend/
├── src/
│   ├── components/
│   │   ├── TarefaForm.jsx         # Formulário para criar/editar
│   │   ├── TarefaItem.jsx         # Item individual da lista
│   │   ├── TarefaList.jsx         # Lista de tarefas
│   │   └── LoadingSpinner.jsx     # Indicador de loading
│   ├── pages/
│   │   └── HomePage.jsx           # Página principal
│   ├── services/
│   │   └── api.js                 # Chamadas à API
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js
```

## Passo 4: Criar Serviço da API

Arquivo: `src/services/api.js`

```javascript
const API_URL = 'http://localhost:3000/api';

export const api = {
  // GET - Listar todas as tarefas
  async getTarefas() {
    const response = await fetch(`${API_URL}/tarefas`);
    if (!response.ok) throw new Error('Erro ao buscar tarefas');
    return response.json();
  },

  // POST - Criar nova tarefa
  async criarTarefa(titulo) {
    const response = await fetch(`${API_URL}/tarefas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo })
    });
    if (!response.ok) throw new Error('Erro ao criar tarefa');
    return response.json();
  },

  // PUT - Atualizar tarefa
  async atualizarTarefa(id, dados) {
    const response = await fetch(`${API_URL}/tarefas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    if (!response.ok) throw new Error('Erro ao atualizar tarefa');
    return response.json();
  },

  // DELETE - Deletar tarefa
  async deletarTarefa(id) {
    const response = await fetch(`${API_URL}/tarefas/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro ao deletar tarefa');
  }
};
```

## Passo 5: Criar Componentes

### `src/components/TarefaForm.jsx`

```javascript
import { useState } from 'react';

export function TarefaForm({ onSubmit }) {
  const [titulo, setTitulo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    
    setLoading(true);
    try {
      await onSubmit(titulo);
      setTitulo('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Digite sua tarefa..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !titulo.trim()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Criando...' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
}
```

### `src/components/TarefaItem.jsx`

```javascript
export function TarefaItem({ tarefa, onUpdate, onDelete }) {
  const handleToggle = () => {
    onUpdate(tarefa.id, { concluida: !tarefa.concluida });
  };

  return (
    <li className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={tarefa.concluida}
          onChange={handleToggle}
          className="w-5 h-5 cursor-pointer"
        />
        <span className={tarefa.concluida ? 'line-through text-gray-400' : ''}>
          {tarefa.titulo}
        </span>
      </div>
      <button
        onClick={() => onDelete(tarefa.id)}
        className="px-3 py-1 text-red-500 hover:bg-red-50 rounded"
      >
        Deletar
      </button>
    </li>
  );
}
```

### `src/components/TarefaList.jsx`

```javascript
import { TarefaItem } from './TarefaItem';

export function TarefaList({ tarefas, onUpdate, onDelete, loading }) {
  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  if (tarefas.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        Nenhuma tarefa yet. Crie a primeira!
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {tarefas.map((tarefa) => (
        <TarefaItem
          key={tarefa.id}
          tarefa={tarefa}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
```

## Passo 6: Criar App Principal

Arquivo: `src/App.jsx`

```javascript
import { useEffect, useState } from 'react';
import { api } from './services/api';
import { TarefaForm } from './components/TarefaForm';
import { TarefaList } from './components/TarefaList';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar tarefas ao montar
  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    try {
      setLoading(true);
      setError(null);
      const dados = await api.getTarefas();
      setTarefas(dados);
    } catch (err) {
      setError('Erro ao carregar tarefas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCriar = async (titulo) => {
    try {
      const novaTarefa = await api.criarTarefa(titulo);
      setTarefas([novaTarefa, ...tarefas]);
    } catch (err) {
      setError('Erro ao criar tarefa');
    }
  };

  const handleAtualizar = async (id, dados) => {
    try {
      const tarefaAtualizada = await api.atualizarTarefa(id, dados);
      setTarefas(
        tarefas.map((t) => (t.id === id ? tarefaAtualizada : t))
      );
    } catch (err) {
      setError('Erro ao atualizar tarefa');
    }
  };

  const handleDeletar = async (id) => {
    try {
      await api.deletarTarefa(id);
      setTarefas(tarefas.filter((t) => t.id !== id));
    } catch (err) {
      setError('Erro ao deletar tarefa');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            📝 Minhas Tarefas
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <TarefaForm onSubmit={handleCriar} />
          <TarefaList
            tarefas={tarefas}
            onUpdate={handleAtualizar}
            onDelete={handleDeletar}
            loading={loading}
          />
        </div>

        <div className="mt-4 text-center text-gray-600 text-sm">
          <p>API rodando em: http://localhost:3000</p>
        </div>
      </div>
    </div>
  );
}

export default App;
```

## Passo 7: Configurar CORS (Backend)

O arquivo `backend/src/app.js` já possui CORS configurado:

```javascript
import cors from "cors";
app.use(cors());
```

Isso permite requisições do frontend.

## Passo 8: Executar Frontend

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará em: `http://localhost:5173` (ou a porta indicada)

## Arquitetura Completa

```
┌─────────────────────────────────────────────────────┐
│            Frontend (React + Tailwind)               │
│  http://localhost:5173                              │
│  ┌──────────────────────────────────────────┐      │
│  │ App.jsx (Estado, hooks, lógica)         │      │
│  │ ├─ TarefaForm (criar)                   │      │
│  │ ├─ TarefaList (listar)                  │      │
│  │ └─ TarefaItem (item individual)         │      │
│  └──────────────────────────────────────────┘      │
│         ↓ (fetch API)                              │
├─────────────────────────────────────────────────────┤
│           API REST (Node + Express)                 │
│  http://localhost:3000                              │
│  ├─ GET    /api/tarefas                            │
│  ├─ POST   /api/tarefas                            │
│  ├─ PUT    /api/tarefas/:id                        │
│  └─ DELETE /api/tarefas/:id                        │
│         ↓ (queries Prisma)                         │
├─────────────────────────────────────────────────────┤
│              MySQL Database                         │
│  av1_tarefas.tarefas                                │
│  ├─ id (PK)                                        │
│  ├─ titulo                                         │
│  ├─ concluida                                      │
│  ├─ createdAt                                      │
│  └─ updatedAt                                      │
└─────────────────────────────────────────────────────┘
```

## ✅ Requisitos da Parte 2

- [x] Frontend em React (SPA)
- [x] Componentes reutilizáveis
- [x] Consumir API via fetch
- [x] Listar dados (GET)
- [x] Criar ações (POST)
- [x] Atualizar dados (PUT)
- [x] Deletar dados (DELETE)
- [x] Estados de loading
- [x] Tratamento de erros
- [x] Tailwind CSS
- [x] Navegação (opcional para básico)

## 🎓 Conceitos Demonstrados

- ✅ React Hooks (useState, useEffect)
- ✅ Componentes funcionais
- ✅ Props e composição
- ✅ Fetch API
- ✅ Async/Await
- ✅ Error handling
- ✅ Conditional rendering
- ✅ List rendering
- ✅ Event handling
- ✅ CSS com Tailwind
- ✅ Separação de responsabilidades

## 📞 Troubleshooting

### "Failed to fetch from API"

O backend não está rodando.

**Solução:**
```bash
cd backend
npm run dev
```

### "CORS error"

Backend não tem CORS configurado (já está no código).

**Solução:** Verifique se importou `cors` em `app.js`.

### "Port already in use"

Outra aplicação está usando a porta 3000 ou 5173.

**Solução:** Mude a porta em `.env` ou feche a aplicação anterior.

## 🚀 Deploy (opcional)

Para produção:
```bash
npm run build
npm run preview
```

## 📚 Referências

- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

**Estimativa**: 4-6 horas de desenvolvimento para a Parte 2
