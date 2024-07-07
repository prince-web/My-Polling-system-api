import OptionModel from "../models/optionSchema.js";

import QuestionModel from "../models/question.js";

//1.  Delete an option
export const deleteOption = async (req, res) => {
  try {
    const optionId = req.params.id;
    const option = await OptionModel.findById(optionId);

    if (!option) {
      return res.status(400).json({
        message: "option not found!",
      });
    }

    // if option has atleast one vote we are not able to delete that option
    if (option.votes > 0) {
      return res.status(400).json({
        message: "This option has one vote. So we are not able to delete it.",
      });
    }

    const question = await QuestionModel.findById(option.question);

    //   remove reference of the given option from the question's option
    await question.updateOne({ $pull: { options: optionId } });

    // delete the option
    await OptionModel.findByIdAndDelete(optionId);

    return res.status(200).json({
      success: true,
      message: "Option deleted successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// 2. Function to increase the count of votes

export const addVote = async (req, res) => {
  try {
    const optionId = req.params.id;

    const option = await OptionModel.findById(optionId);

    if (!option) {
      return res.status(400).json({ message: "option not found!" });
    }

    // add one vote to the respective option
    option.votes += 1;

    option.save();

    // add one to the value of total votes of question.
    const question = await QuestionModel.findById(option.question);
    question.totalVotes += 1;

    question.save();

    return res.status(200).json({ success: true, option });
  } catch (error) {
    console.log("Error is produced from the option controller", error);

    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};
