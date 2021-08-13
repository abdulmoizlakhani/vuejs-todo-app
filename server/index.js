const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// API Routes
const todosRoute = require("./routes/todos");

// Env Config
dotenv.config();

// Server config
const app = express();
const PORT = 5000 || process.env.PORT;
const DB_URI = process.env.DB_URI;

// Middlewares
app.use(cors());
app.use(express.json());

// Todo Routes
app.use("/todos", todosRoute);

// Mongodb Connection and Server Listener
mongoose.connect(
  DB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    app.listen(PORT, () => {
      console.log("Server running on port = ", PORT);
    });
  }
);
