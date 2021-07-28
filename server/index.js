const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 5000 || process.env.PORT;
const DB_URI = process.env.DB_URI;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("<h1>Hello!</h1>")
})

mongoose.connect(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    app.listen(PORT, () => {
        console.log("Server running on port = ", PORT);
    });
})
