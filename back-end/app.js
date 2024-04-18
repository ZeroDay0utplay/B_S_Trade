const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const loginRoute = require("./routes/login.route");
const registerRoute = require("./routes/register.route");
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware");
const databaseMiddleware = require("./middlewares/database.middleware");
const verifyRoute = require("./routes/verify.mail.route");

const port = process.env.PORT || 3000;

const app = express();


// middlewares
// inject psql Pool into request for a goal of single connection to DB
app.use(databaseMiddleware);
app.use(bodyParser.json());
app.use(cors());


app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/users/verify-email", verifyRoute);

app.use(errorHandlerMiddleware);


app.listen(port, () => {
    console.log(`[+] Listening on port ${port}`);
})