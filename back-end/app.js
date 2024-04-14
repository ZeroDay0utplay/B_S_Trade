const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const loginRoute = require("./routes/login.route");
const pool = require("./services/dbConnect.service");
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware");
const databaseMiddleware = require("./middlewares/database.middleware");

const port = process.env.PORT || 3000;

const app = express();

// middlewares
// inject psql Pool into request for a goal of single connection to DB
app.use(databaseMiddleware(pool));
app.use(bodyParser.json());
app.use(cors());


app.use("/login", loginRoute);

app.use(errorHandlerMiddleware);


app.listen(port, () => {
    console.log(`[+] Listening on port ${port}`);
})