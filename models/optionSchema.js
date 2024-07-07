import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  link_to_vote: {
    type: String,
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
    required: true,
  },
});

const OptionModel = mongoose.model("Option", optionSchema);

export default OptionModel;
