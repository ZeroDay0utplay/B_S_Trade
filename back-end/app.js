const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const loginRoute = require("./routes/login.route");
const pool = require("./services/dbConnect.service");

const port = process.env.PORT || 3000;

const app = express();

// middlewares
// psql Pool
app.use((req, res, next) => {
    req.pool = pool;
    next();
});
app.use(bodyParser.json());
app.use(cors());


app.use("/login", loginRoute);


/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    
    return;
});

app.listen(port, () => {
    console.log(`[+] Listening on port ${port}`);
})