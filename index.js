import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectWithDb from "./config/db.js";
import mainRouter from "./routes/mainRouter.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.use("/", mainRouter);

app.listen(port, () => {
  // connect with the DB as soon as the server is started.
  connectWithDb();
  console.log(`Server is listening at the port ${port}`);
});
