const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware");
const databaseMiddleware = require("./middlewares/database.middleware");

const userRoutes = require("./routes/user.routes");
const rootRoute = require("./routes/root.route");
const profileRoutes = require("./routes/profile.routes");



const port = process.env.PORT || 3000;

const app = express();


// middlewares
// inject psql Pool into request for a goal of single connection to DB
app.use(databaseMiddleware);
app.use(bodyParser.json());
app.use(cors());
app.use(errorHandlerMiddleware);


// Routes
rootRoute(app);
userRoutes(app);
profileRoutes(app);


// server
app.listen(port, () => {
    console.log(`[+] Listening on port ${port}`);
})