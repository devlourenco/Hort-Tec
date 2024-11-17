import express from "express";
import leiturasService from "../services/leiturasService.js";
import signUpService from "../services/signUpService.js";
import userArduinoService from "../services/userArduinoService.js";

const routes = express.Router();

routes.get('/:usuario_id', async(req, res) => {
  const {usuario_id} = req.params
  const usuario = await signUpService.verificarUsuario(usuario_id)

  if(usuario.length < 1){
    return res.status(401).send({ message: "Usuario não existe"});
  }

  try{
    const leituraArduinoSave = await leiturasService.findLeituraByUsuario(usuario_id)

    if(leituraArduinoSave.length < 1){
      return res.status(401).send({ message: "Sem Leituras Registradas"})
    }

    res.status(200).send({ message: leituraArduinoSave})
  }catch(err){
    console.error("Erro ao buscar leituras: ", error);
    return res.status(400).send({ message: "Erro ao buscar leituras" });
  }
})

routes.get('/:usuario_id/:usuario_arduino_id', 
  async(req, res) => {
    const { usuario_id, usuario_arduino_id} = req.params

    const usuario = await signUpService.verificarUsuario(usuario_id)

    if(usuario.length < 1){
      return res.status(401).send({ message: "Usuario não existe"});
    }

    const usuarioArduino = await userArduinoService.findAutomacaoById(usuario_arduino_id)

    if(usuarioArduino.length < 1){
      return res.status(401).send({ message: "Automação não existe"});
    }

    try{
      const leituraArduinoSave = await leiturasService.findLeituraByAutomacao(usuario_id, usuario_arduino_id)
  
      if(leituraArduinoSave.length < 1){
        return res.status(401).send({ message: "Sem Leituras Registradas"})
      }
  
      res.status(200).send({ message: leituraArduinoSave})
    }catch(err){
      console.error("Erro ao buscar leituras: ", error);
      return res.status(400).send({ message: "Erro ao buscar leituras" });
    }

})

routes.post('/', async(req, res) => {
  const { 
    usuario_arduino_id,
    umidade, tipo, status 
  } = req.body

  if(!usuario_arduino_id || !umidade || !tipo || !status) {
    return res.status(200).send({ message: "Informações incompletas" });
  }

  try{
    await leiturasService.createLeitura(usuario_arduino_id, umidade, tipo, status)

    return res
    .status(200)
    .send({ message: "Leitura cadastrada com sucesso" });
  }catch(err){
    console.error("Erro ao cadastrar leitura: ", err);
    return res.status(400).send({ message: "Erro ao cadastrar leitura" });
  }
})

export default routes;