import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import TaskCard from './TaskCard';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Erro ao carregar tarefas');
      console.error('Erro ao carregar tarefas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
      try {
        await apiService.deleteTask(id);
        await loadTasks();
      } catch (err) {
        setError('Erro ao deletar tarefa');
        console.error('Erro ao deletar:', err);
      }
    }
  };

  const handleUpdateTask = async (id, updatedData) => {
    try {
      await apiService.updateTask(id, updatedData);
      await loadTasks();
    } catch (err) {
      setError('Erro ao atualizar tarefa');
      console.error('Erro ao atualizar:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-gray-600">Carregando tarefas...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Nenhuma tarefa encontrada. Crie uma nova tarefa para começar!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}
