const express = require("express");
const pool = require("./db.js");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(cors());

//routes
app.post("/login", (req, res) => {
    const  email = req.body.email;
    const password = req.body.password;
    
});