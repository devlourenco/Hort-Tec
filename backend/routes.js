import express from "express";

import signUpController from "./controllers/signUpController.js";
import loginController from "./controllers/loginController.js"
import userArduinoController from "./controllers/userArduinoController.js"

const routes = express();

routes.use("/usuario", signUpController);
routes.use("/login", loginController)
routes.use("/usuario-arduino", userArduinoController)

export default routes