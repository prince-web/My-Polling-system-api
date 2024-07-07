import QuestionModel from "../models/question.js";

import OptionModel from "../models/optionSchema.js";

import dotenv from "dotenv";
dotenv.config();

// function to create a question
export const createQuestion = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "title is required for creating question",
      });
    }

    const question = await QuestionModel.create({ title });

    res.status(200).json({ success: true, question });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

// To create an option
export const createOption = async (req, res) => {
  try {
    const questionId = req.params.id;

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "text required for creating option!",
      });
    }

    const question = await QuestionModel.findById(questionId);

    if (!question) {
      return res.status(400).json({ message: "question not found!" });
    }

    const option = await OptionModel.create({
      text,
      question,
    });

    const port = process.env.PORT;
    const link_to_vote = `http://localhost:${port}/options/${option.id}/add_vote`;

    option.link_to_vote = link_to_vote;

    option.save();

    // put reference of option in question schema
    await question.updateOne({ $push: { options: option } });

    return res.status(200).json({
      success: true,
      option,
    });
  } catch (error) {
    console.log(
      "error is comming from hte question controller from the function createOption()",
      error
    );
    return res.status(400).json({
      message: "Internal server error!",
    });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await QuestionModel.findById(questionId);

    if (!question) {
      return res.status(400).json({
        message: "question not found",
      });
    }

    // if even one of the options of question has votes. It won't be deleted
    if (question.totalVotes > 0) {
      return res.status(400).json({
        message:
          "We are not able to delete it because its one option have the vote!",
      });
    }

    // delete all the options of the question
    await OptionModel.deleteMany({ question: questionId });

    // delete question
    await QuestionModel.findByIdAndDelete(questionId);

    return res.status(200).json({
      success: true,
      message: "question and associated options deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// To view a question and its options
export const viewQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    // populate question with all of its options
    const question = await QuestionModel.findById(questionId).populate({
      path: "options",
      model: "Option",
    });

    if (!question) {
      return res.status(400).json({
        message: "question not found",
      });
    }

    return res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    console.log(
      "Error is comming from the question controller from the function viewQuestion: ",
      err
    );
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
