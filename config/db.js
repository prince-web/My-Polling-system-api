import mongoose from "mongoose";

const connectWithDb = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(console.log("DB connected successfully!"))
    .catch((err) => {
      console.log(`DB connection is failed with the error: ${err}`);
      process.exit(1);
    });
};

export default connectWithDb;
