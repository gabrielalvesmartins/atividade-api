import "dotenv/config";

let prisma = null;

export async function initPrisma() {
  if (prisma) return prisma;
  try {
    const pkg = await import('@prisma/client');
    const { PrismaClient } = pkg;
    prisma = new PrismaClient();
    return prisma;
  } catch (error) {
    console.warn('Prisma client não disponível:', error && error.message ? error.message : error);
    prisma = null;
    return null;
  }
}

export async function testConnection() {
  try {
    const client = await initPrisma();
    if (!client) throw new Error('Prisma client não inicializado');
    await client.$connect();
    console.log("Conexão bem-sucedida com o banco de dados!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
}

export { prisma };
