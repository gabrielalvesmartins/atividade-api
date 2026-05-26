import { prisma } from "../config/prisma.js";

export async function listar() {
  return prisma.task.findMany({
    orderBy: {
      id: "asc"
    }
  });
}

export async function buscarPorId(id) {
  return prisma.task.findUnique({
    where: {
      id: id
    }
  });
}

export async function criar({ title, description = null, completed = false }) {
  const novaTask = await prisma.task.create({
    data: {
      title: title.trim(),
      description: description != null ? description.trim() : null,
      completed
    }
  });

  return novaTask;
}

export async function atualizar(id, data) {
  try {
    const taskAtualizada = await prisma.task.update({
      where: {
        id: id
      },
      data
    });

    return taskAtualizada;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}

export async function excluir(id) {
  try {
    const taskRemovida = await prisma.task.delete({
      where: {
        id: id
      }
    });

    return taskRemovida;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}
