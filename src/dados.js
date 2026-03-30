export const tarefas = [
  { id: 1, titulo: "Estudar Node", concluida: false },
  { id: 2, titulo: "Fazer telas no Figma", concluida: true }
];

export function criarTarefa(titulo) {
  const id = tarefas.length ? Math.max(...tarefas.map(t => t.id)) + 1 : 1;
  const nova = { id, titulo, concluida: false };
  tarefas.push(nova);
  return nova;
}

export function atualizarTarefa(id, titulo, concluida) {
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return null;
  if (titulo !== undefined) tarefa.titulo = titulo;
  if (concluida !== undefined) tarefa.concluida = concluida;
  return tarefa;
}

export function deletarTarefa(id) {
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) return false;
  tarefas.splice(index, 1);
  return true;
}
