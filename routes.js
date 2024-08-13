import express from "express";

import signUpController from "./controllers/signUpController.js";

const routes = express();

routes.use("/cadastro", signUpController);

export default routes