import express from "express";
import { authMiddleware } from "../middleware";
import Todo from "../models/todo";

const router = express.Router();

router.use(authMiddleware);

router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.body.userId }).exec();
    res.send({
      todos: todos.map((item) => ({
        id: item._id,
        description: item.description,
        isComplete: item.isComplete,
      })),
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).send("Error fetching todos");
  }
});

router.post("/create", async (req, res) => {
  try {
    const todo = await Todo.create({
      description: req.body.description,
      complete: req.body.isComplete,
      user: req.body.userId,
    });

    res.send({ todo });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).send("Error creating todo");
  }
});

router.put("/update/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, user: req.body.userId },
      {
        description: req.body.description,
        complete: req.body.isComplete,
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).send("Todo not found or unauthorized");
    }

    res.send({ todo: updatedTodo });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).send("Error updating todo");
  }
});

router.delete("/delete/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: todoId,
      user: req.body.userId,
    });

    if (!deletedTodo) {
      return res.status(404).send("Todo not found or unauthorized");
    }

    res.send({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).send("Error deleting todo");
  }
});

export default router;
