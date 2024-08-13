import express from "express";
import service from "../services/signUpService.js";
import { error } from "console";

const routes = express.Router();

export default function signUpController() {
  routes.get("/cadastro", async (req, res) => {
    const userSaves = await service.listUser();

    if (userSaves.length < 1) {
      return res.status(401).end();
    }
    if (error) {
      console.log({ message: error });
    }
    res.status(200).send({ message: userSaves });
  });

  routes.post("/", async (req, res) => {
    const { email, senha, nome, tipoUsuario } = req.body;

    if (senha.length < 6) {
      return res.status(400).send({ message: "Senha curta demais" });
    }
    if (error) {
      console.log({ message: error });
    }

    await service.createUser(email, senha, nome, tipoUsuario);

    return res.status(200).send({ message: "cadastro realizado!" });
  });

  routes.put("/", async (req, res) => {
    const { email, senha, nome, tipoUsuario } = req.body;

    if (error) {
      console.log({ message: error });
    }

    await service.updateUser(email, senha, nome, tipoUsuario);

    return res.status(200).send({ message: "Erro ao editar usuário" });
  });

  routes.delete("/:idUser", async (req, res) => {
    const { idUser } = req.params;
    if (idUser == null) {
      return res.status(400).send({ message: "id not informated" });
    }
    await service.deleteUser(idUser);

    return res.status(200).send({ message: "Usuário deletado com sucesso" });
  });
}
