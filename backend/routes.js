import express from "express";

import signUpController from "./controllers/signUpController.js";
import loginController from "./controllers/loginController.js"
import userArduinoController from "./controllers/userArduinoController.js"
import leiturasController from "./controllers/leiturasController.js"

const routes = express();

routes.use("/usuario", signUpController);
routes.use("/login", loginController)
routes.use("/usuario-arduino", userArduinoController)
routes.use('/leituras', leiturasController)

export default routes