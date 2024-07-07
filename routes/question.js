import express from "express";
import {
  createQuestion,
  createOption,
  deleteQuestion,
  viewQuestion,
} from "../controllers/questions_controller.js";
const questionRouter = express.Router();

questionRouter.post("/create", createQuestion);
questionRouter.post("/:id/options/create", createOption);
// delete the entire question
questionRouter.delete("/:id/delete", deleteQuestion);
// To view the question
questionRouter.get("/:id", viewQuestion);

export default questionRouter;
