import express from "express";
import cors from "cors";
import userController from "./controllers/userController";
import toDoController from "./controllers/toDoController";
import connectDB from "./database";

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.get("/", (req, res) => {
  res.send("API TO-DO");
});

app.use("/api/auth", userController);
app.use("/api/todo", toDoController);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
