import express from "express";
import signUpService from "../services/signUpService.js";
import arduinoService from "../services/arduinoService.js";
import userArduinoService from "../services/userArduinoService.js";

const routes = express.Router();

routes.get("/:mail", async (req, res) => {
  const {mail} = req.params
  const verifyUser = await signUpService.verificarEmail(mail);
  console.log(mail)
  console.log(req.body)
  console.log(req)
  if (verifyUser.length < 1) {
    return res.status(401).send({ message: "Login Inválido" });
  }

  const {id} = verifyUser[0]

  try {
    const userArduinoSave = await userArduinoService.listUserArduino(id)

    if (userArduinoSave.length < 1) {
      return res.status(401).send({ message: "Sem Arduinos registrados" });;
    }

    res.status(200).send({ message: userArduinoSave });

  } catch (error) {
    console.error("Erro na busca automação: ", error);
    return res.status(400).send({ message: "Erro na busca automação" });
  }
  
});

routes.get('/id/:id', async (req, res) => {
  const { id } = req.params

  try {
    const userArduinoSave = await userArduinoService.findAutomacaoById(id)

    if (userArduinoSave.length < 1) {
      return res.status(401).send({ message: "Automação não encontrada" });;
    }

    res.status(200).send({ message: userArduinoSave });

  } catch (error) {
    console.error("Erro na busca automação: ", error);
    return res.status(400).send({ message: "Erro na busca automação" });
  }
})

routes.put('/', async (req, res) => {
  const { id, nome, umidade_ideal, temperatura_ideal } = req.body

  const userArduino = await userArduinoService.findAutomacaoById(id)

  if(userArduino.length < 1){
    return res.status(401).send({ message: "Automação não cadastrada" });;
  }

  try {
    await userArduinoService.updateUserArduino(id, nome, umidade_ideal, temperatura_ideal)

    res.status(200).send({ message: "Automação atualizada" });

  } catch (error) {
    console.error("Erro na atualização automação: ", error);
    return res.status(400).send({ message: "Erro na atualização automação" });
  }
})

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
    return res.status(200).send({ message: "Complete o cadastro" });
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

    const verifyUserArduino = await userArduinoService.verifyUserArduino(id_arduino)

    if (verifyUserArduino.length > 0) {
      return res.status(401).send({ message: "Arduino já cadastrado na plataforma" });
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
