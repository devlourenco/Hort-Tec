import express from "express";

import signUpController from "./controllers/signUpController.js";
import loginController from "./controllers/loginController.js"

const routes = express();

routes.use("/usuario", signUpController);
routes.use("/login", loginController)

export default routes