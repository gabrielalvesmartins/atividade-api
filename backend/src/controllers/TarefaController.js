import * as TarefaModel from "../models/tarefaModel.js";

export async function listar(req, res) {
  try {
    const tasks = await TarefaModel.listar();
    res.json(tasks);
  } catch (error) {
    console.error("Erro ao listar tasks:", error);
    res.status(500).json({ erro: "Erro ao listar tasks", detalhes: error.message });
  }
}

export async function buscarPorId(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const task = await TarefaModel.buscarPorId(id);

    if (!task) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

    res.json(task);
  } catch (error) {
    console.error("Erro ao buscar task por ID:", error);
    res.status(500).json({ erro: "Erro ao buscar task", detalhes: error.message });
  }
}

export async function criar(req, res) {
  try {
    const { title, description, completed } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ erro: "Título é obrigatório" });
    }

    if (completed !== undefined && typeof completed !== "boolean") {
      return res.status(400).json({ erro: "Campo completed deve ser booleano" });
    }

    const taskCriada = await TarefaModel.criar({
      title,
      description,
      completed: completed ?? false
    });

    res.status(201).json({
      mensagem: "Task criada com sucesso!",
      task: taskCriada
    });
  } catch (error) {
    console.error("Erro ao criar task:", error);
    res.status(500).json({ erro: "Erro ao criar task", detalhes: error.message });
  }
}

export async function atualizar(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const { title, description, completed } = req.body;
    const dadosAtualizacao = {};

    if (title !== undefined) {
      if (!title?.trim()) {
        return res.status(400).json({ erro: "Título, se informado, não pode estar vazio" });
      }
      dadosAtualizacao.title = title.trim();
    }

    if (description !== undefined) {
      dadosAtualizacao.description = description === null ? null : description.toString().trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({ erro: "Campo completed deve ser booleano" });
      }
      dadosAtualizacao.completed = completed;
    }

    if (Object.keys(dadosAtualizacao).length === 0) {
      return res.status(400).json({ erro: "Nenhum campo válido para atualizar" });
    }

    const taskAtualizada = await TarefaModel.atualizar(id, dadosAtualizacao);

    if (!taskAtualizada) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

    res.json({
      mensagem: "Task atualizada com sucesso!",
      task: taskAtualizada
    });
  } catch (error) {
    console.error("Erro ao atualizar task:", error);
    res.status(500).json({ erro: "Erro ao atualizar task", detalhes: error.message });
  }
}

export async function excluir(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const taskRemovida = await TarefaModel.excluir(id);

    if (!taskRemovida) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

    res.json({
      mensagem: "Task excluída com sucesso!",
      task: taskRemovida
    });
  } catch (error) {
    console.error("Erro ao excluir task:", error);
    res.status(500).json({ erro: "Erro ao excluir task", detalhes: error.message });
  }
}
