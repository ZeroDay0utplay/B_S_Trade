const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const loginRoute = require("./routes/UserRoutes/login.route");
const registerRoute = require("./routes/UserRoutes/register.route");
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware");
const databaseMiddleware = require("./middlewares/database.middleware");
const verifyRoute = require("./routes/UserRoutes/verify.mail.route");
const resendRoute = require("./routes/UserRoutes/resendMail.route");
const resetPWDRoute = require("./routes/resetPWD.route");

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
app.use("/resend", resendRoute);
app.use("/sendMFP", resendRoute);
app.use("/reset", resetPWDRoute)

app.use(errorHandlerMiddleware);


app.listen(port, () => {
    console.log(`[+] Listening on port ${port}`);
})