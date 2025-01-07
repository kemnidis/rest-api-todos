import express from "express";
import * as dotenv from "dotenv";

import userRouter from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));