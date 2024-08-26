import express from "express";
import routes from "./routes.js";

const app = express();
app.use(express.json());
app.use("/", routes);

const port = 3333;
app.listen(port, () => {
  console.log("Servidor rodando");
});
