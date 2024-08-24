import express from "express";
import service from "../services/signUpService.js";
import { error } from "console";

const routes = express.Router();

routes.get("/", async (req, res) => {
  const userSaves = await service.listUser();

  if (userSaves.length < 1) {
    return res.status(401).end();
  }

  res.status(200).send({ message: userSaves });
});

routes.post("/", async (req, res) => {
  const { email, senha, nome, tipoUsuario } = req.body;

  if(!nome){
    return res.status(400)
    .send(
      { message: "Informe nome completo"}
    )
  }

  if(!tipoUsuario === "admin" || !tipoUsuario === "user"){
    return res.status(400)
    .send(
      { message: "Informe um usuario válido"}
    )
  }

  if (senha.length < 6) {
    return res.status(400).send({ message: "Senha curta demais" });
  }

  if(!email.includes('@')){
    return res.status(400)
    .send(
      { message: "Informe um email válido"}
    )
  }

  let verifyUser = await service.verificarEmail(email)

  console.log(verifyUser)

  if(verifyUser.length > 0){
    return res.status(400)
    .send(
      { message: "E-mail já cadastrado"}
    )
  }

  try {
    console.log("Cadastro realizado");
  } catch (error) {
    console.log(error);
  }

  await service.createUser(email, senha, nome, tipoUsuario);

  return res.status(200).send({ message: "cadastro realizado!" });
});

routes.put("/", async (req, res) => {
  const { nome, email, senha, tipo_usuario, id } = req.body;

  if (!nome || !email || !senha || !tipo_usuario || !id) {
    return res
      .status(400)
      .send({ message: "Todos os campos são obrigatórios" });
  }

  try {
    await service.updateUser(id, email, senha, nome, tipo_usuario);
    return res.status(200).send({ message: "Usuário editado com sucesso" });
  } catch (error) {
    console.error("Erro ao editar usuário:", error);
    return res.status(400).send({ message: "Erro ao editar usuário" });
  }
});

routes.delete("/:idUser", async (req, res) => {
  const { idUser } = req.params;
  if (idUser == null) {
    return res.status(400).send({ message: "id not informated" });
  }
  await service.deleteUser(idUser);

  return res.status(200).send({ message: "Usuário deletado com sucesso" });
});

export default routes;
