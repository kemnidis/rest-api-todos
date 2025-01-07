import express from "express";
import * as dotenv from "dotenv";

import userRouter from "./routes/userRoutes";
import todoRouter from "./routes/todoRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", todoRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
