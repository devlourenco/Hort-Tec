import express from "express";
import routes from "./routes.js";

const app = express();
app.use(express.json());
app.use("/", routes);

app.get("/teste", () => {
  try {
    console.log("Teste de rota get");
  } catch (error) {
    console.log(error);
  }
});

app.post("/teste", () => {
  try {
    console.log("Teste de rota post");
  } catch (error) {
    console.log(error);
  }
});

app.put("/teste", () => {
  try {
    console.log("Teste de rota put");
  } catch (error) {
    console.log(error);
  }
});

app.delete('/teste', () => {
  try {
    console.log("Teste de rota delete");
  } catch (error) {
    console.log(error);
  }
})

const port = 3333;
app.listen(port, () => {
  console.log("Servidor rodando");
});
