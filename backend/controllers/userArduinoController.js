import express from "express";
import signUpService from "../services/signUpService.js";
import arduinoService from "../services/arduinoService.js";
import userArduinoService from "../services/userArduinoService.js";

const routes = express.Router();

routes.get("/", async (req, res) => {
  res.status(200).send({ message: "Teste" });
});

routes.post("/", async (req, res) => {
  const { 
    id_arduino, 
    email, 
    planta_nome, 
    umidade_ideal, 
    temperatura_ideal 
  } = req.body;

  if (
    !id_arduino ||
    !email ||
    !planta_nome ||
    !umidade_ideal ||
    !temperatura_ideal
  ) {
    return res.status(400).send({ message: "Complete o cadastro" });
  }

  try {
    // Verifica se o usuário existe
    const verifyUser = await signUpService.verificarEmail(email);
    if (verifyUser.length < 1) {
      return res.status(401).send({ message: "Login Inválido" });
    }

    const id_usuario = verifyUser[0].id;

    // Verifica se o Arduino existe
    const verifyArduino = await arduinoService.verificarArduino(id_arduino);
    if (verifyArduino.length < 1) {
      return res.status(401).send({ message: "Arduino Inválido" });
    }

    await userArduinoService.createUserArduino(
      id_usuario,
      id_arduino,
      planta_nome,
      umidade_ideal,
      temperatura_ideal
    );
    return res
      .status(200)
      .send({ message: "Automação cadastrada com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar automação: ", error);
    return res.status(400).send({ message: "Erro ao cadastrar automação" });
  }
});

export default routes;
