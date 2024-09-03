import express from "express";

import signUpController from "./controllers/signUpController.js";

const routes = express();

routes.use("/usuario", signUpController);

export default routes