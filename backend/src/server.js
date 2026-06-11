import app from "./app.js";
import { prisma, testConnection } from "./config/prisma.js";

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await testConnection();
  } catch (error) {
    console.warn("Aviso: falha ao conectar ao banco de dados. Iniciando o servidor sem conexão de DB para fins de desenvolvimento.", error && error.message ? error.message : error);
  }

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

process.on("SIGINT", async () => {
  try {
    if (prisma && prisma.$disconnect) await prisma.$disconnect();
  } catch (e) {
    // ignore
  }
  process.exit(0);
});

main();
