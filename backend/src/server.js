import app from "./app.js";
import { prisma, testConnection } from "./config/prisma.js";

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

main();
