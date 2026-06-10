import { useState } from 'react';

export default function TaskCard({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSaveEdit = async () => {
    if (!editedTitle.trim()) {
      alert('O título não pode estar vazio');
      return;
    }

    try {
      setIsUpdating(true);
      await onUpdate(task.id, {
        title: editedTitle,
        description: editedDescription || null,
        completed: task.completed,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleComplete = async () => {
    try {
      await onUpdate(task.id, {
        ...task,
        completed: !task.completed,
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  if (isEditing) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-4 space-y-3">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Título da tarefa"
          disabled={isUpdating}
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Descrição (opcional)"
          rows="3"
          disabled={isUpdating}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSaveEdit}
            disabled={isUpdating}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
          >
            {isUpdating ? 'Salvando...' : 'Salvar'}
          </button>
          <button
            onClick={() => {
              setEditedTitle(task.title);
              setEditedDescription(task.description || '');
              setIsEditing(false);
            }}
            disabled={isUpdating}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border-l-4 rounded-lg p-4 ${task.completed ? 'border-l-green-600 bg-gray-50' : 'border-l-blue-600'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            className="mt-1 w-5 h-5 cursor-pointer"
            title="Marcar como concluído"
          />
          <div className="flex-1">
            <h3 className={`font-bold text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              Criada em: {formatDate(task.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            title="Editar tarefa"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
            title="Deletar tarefa"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
