import express from "express";
import loginService from "../services/loginService.js";
import { createTokenJWT } from "../middleware/jwt.js";

const routes = express.Router();

routes.post("/", async (req, res) => {
  const { mail = "", password = "" } = req.body;

  if (!mail.includes("@")) {
    return res.status(400).send({ message: "Informe um email válido" });
  }

  if (!mail || !password) {
    return res.status(400).send({ message: "Informe e-mail e senha" });
  }

  const login = await loginService.validaLogin(mail, password);

  if (login.length < 1) {
    return res.status(401).send({ message: "Login Inválido" });
  }

  const {id, nome, email, senha, tipo_usuario} = login[0]
  const token = createTokenJWT(id, nome, email, senha, tipo_usuario)

  return res.status(200).send({ message: token });
});

export default routes;
