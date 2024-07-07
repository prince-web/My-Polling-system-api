import express from "express";
import optionRouter from "./options.js";
import questionRouter from "./question.js";
import home from "../controllers/home_controller.js";

const mainRouter = express.Router();

mainRouter.get("/", home);
// router for the endpoints required for the question
mainRouter.use("/questions", questionRouter);

// router for the endpoints required for the question
mainRouter.use("/options", optionRouter);

export default mainRouter;
