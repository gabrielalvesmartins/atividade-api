import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getTarefas(req, res) {
  try {
    const tarefas = await prisma.tarefa.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.status(200).json(tarefas);
  } catch (erro) {
    console.error("Erro ao buscar tarefas:", erro);
    res.status(500).json({ erro: "Erro ao buscar tarefas" });
  }
}

export async function criarTarefa(req, res) {
  const { titulo } = req.body;

  if (!titulo || titulo.trim() === "") {
    return res.status(400).json({ erro: "Título é obrigatório." });
  }

  try {
    const novaTarefa = await prisma.tarefa.create({
      data: {
        titulo: titulo.trim()
      }
    });
    res.status(201).json(novaTarefa);
  } catch (erro) {
    console.error("Erro ao criar tarefa:", erro);
    res.status(500).json({ erro: "Erro ao criar tarefa" });
  }
}

export async function atualizarTarefa(req, res) {
  const { id } = req.params;
  const { titulo, concluida } = req.body;

  if (titulo !== undefined && titulo.trim() === "") {
    return res.status(400).json({ erro: "Título não pode ser vazio." });
  }

  try {
    const tarefa = await prisma.tarefa.findUnique({
      where: { id: parseInt(id) }
    });

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada." });
    }

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id: parseInt(id) },
      data: {
        ...(titulo !== undefined && { titulo: titulo.trim() }),
        ...(concluida !== undefined && { concluida })
      }
    });

    res.status(200).json(tarefaAtualizada);
  } catch (erro) {
    console.error("Erro ao atualizar tarefa:", erro);
    res.status(500).json({ erro: "Erro ao atualizar tarefa" });
  }
}

export async function deletarTarefa(req, res) {
  const { id } = req.params;

  try {
    const tarefa = await prisma.tarefa.findUnique({
      where: { id: parseInt(id) }
    });

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada." });
    }

    await prisma.tarefa.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (erro) {
    console.error("Erro ao deletar tarefa:", erro);
    res.status(500).json({ erro: "Erro ao deletar tarefa" });
  }
}
