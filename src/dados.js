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
