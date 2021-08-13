const express = require("express");
const Todo = require("../models/Todo");
const { throwAPIResponse, generateUpdatedTodo } = require("../utils/helpers");

const router = express.Router();

/* Add New Todo */
router.post("/add", async (req, res) => {
  const { text, editMode, done } = req.body;
  const post = new Todo({
    text,
    editMode,
    done,
  });

  try {
    const savedTodo = await post.save();
    throwAPIResponse(res, savedTodo, 201, "Successfully added new todo");
  } catch (error) {
    throwAPIResponse(res, null, 400, error.message);
  }
});

/* Get All Todos */
router.get("/", async (req, res) => {
  try {
    const allTodos = await Todo.find();
    throwAPIResponse(res, allTodos, 200, "Fetch todo list successful");
  } catch (error) {
    throwAPIResponse(res, null, 400, error.message);
  }
});

/* Get Todo By Id */
router.get("/:todoId", async (req, res) => {
  const { todoId } = req.params;
  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      throwAPIResponse(res, null, 404, "Todo not found");
      return;
    }
    throwAPIResponse(res, todo, 200, "Fetch todo successful");
  } catch (error) {
    throwAPIResponse(res, null, 400, error.message);
  }
});

/* Delete Todo By Id */
router.delete("/:todoId", async (req, res) => {
  const { todoId } = req.params;
  try {
    const data = await Todo.deleteOne({ _id: todoId });
    if (data.deletedCount) {
      throwAPIResponse(res, null, 200, "Todo successfully removed");
      return;
    }
    throwAPIResponse(res, null, 404, "Todo not found");
  } catch (error) {
    throwAPIResponse(res, null, 400, error.message);
  }
});

/* Update Todo By Id */
router.patch("/:todoId", async (req, res) => {
  const { todoId } = req.params;
  try {
    const prevData = await Todo.findById(todoId);
    if (!prevData) {
      throwAPIResponse(res, null, 404, "Todo not found");
      return;
    }
    const updatedTodo = generateUpdatedTodo(prevData, req.body);
    const data = await Todo.updateOne({ _id: todoId }, { ...updatedTodo });
    if (data.nModified) {
      throwAPIResponse(res, updatedTodo, 200, "Todo successfully updated");
      return;
    } else {
      throw new Error("Something went wrong, please try again!");
    }
  } catch (error) {
    throwAPIResponse(res, null, 400, error.message);
  }
});

module.exports = router;
