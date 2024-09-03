import express from "express";
import routes from "./routes.js";
import os from "os";

const app = express();
app.use(express.json());
app.use("/", routes);

const port = 3333;

// Função para obter o IP da interface de rede
function getNetworkIP() {
  const networkInterfaces = os.networkInterfaces();
  for (const iface in networkInterfaces) {
    for (const alias of networkInterfaces[iface]) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'localhost'; // Retorna localhost se não encontrar um IP válido
}

const ip = getNetworkIP();

app.listen(port, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`);
});
