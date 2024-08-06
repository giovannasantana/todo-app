import express from "express";
import userController from "./controllers/userController";
import toDoController from "./controllers/toDoController";
import connectDB from "./database";

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/", (req, res) => {
  res.send("API TO-DO");
});


app.use("/auth", userController);
app.use("/todo", toDoController);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
