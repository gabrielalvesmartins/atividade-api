import { useState } from 'react';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function HomePage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskCreated = () => {
    // Força recarga da lista de tarefas
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <TaskForm onTaskCreated={handleTaskCreated} />
        <div key={refreshKey}>
          <TaskList />
        </div>
      </main>
    </div>
  );
}
