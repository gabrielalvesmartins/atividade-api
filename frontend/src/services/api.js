const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiService = {
  // Listar todas as tarefas
  async getTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar tarefas: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao listar tarefas:', error);
      throw error;
    }
  },

  // Buscar tarefa por ID
  async getTaskById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar tarefa: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar tarefa:', error);
      throw error;
    }
  },

  // Criar nova tarefa
  async createTask(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Erro ao criar tarefa: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  },

  // Atualizar tarefa
  async updateTask(id, data) {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Erro ao atualizar tarefa: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      throw error;
    }
  },

  // Deletar tarefa
  async deleteTask(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Erro ao deletar tarefa: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      throw error;
    }
  },
};
