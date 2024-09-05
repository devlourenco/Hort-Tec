import express from 'express';
import loginService from '../services/loginService.js';

const routes = express.Router();

routes.post('/', async (req, res) => {
  const { email = "", senha = ""} = req.body;

  if (!email.includes('@')) {
    return res.status(400).send({ message: "Informe um email válido" });
  }

  if (!email || !senha) {
    return res.status(400).send({ message: "Informe e-mail e senha" });
  }

  const login = await loginService.validaLogin(email, senha);
  console.log(login);

  if (login.length < 1) {
    return res.status(401).send({ message: "Login Inválido" });
  }

  return res.status(200).send({message: 'Login'});
});

export default routes;
