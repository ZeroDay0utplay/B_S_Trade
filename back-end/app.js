const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware");
const databaseMiddleware = require("./middlewares/database.middleware");

const userRoutes = require("./routes/user.routes");
const rootRoute = require("./routes/root.route");
const profileRoutes = require("./routes/profile.routes");
const stocksRoute = require("./routes/stocks.routes");
const notifsRoute = require("./routes/notifications.route");



const port = process.env.PORT || 3000;

const app = express();

global.__basedir = __dirname;

// middlewares
// inject psql Pool into request for a goal of single connection to DB
app.use(cookieParser());
app.use(databaseMiddleware);
app.use(bodyParser.json({limit: '30mb'}));
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200', 'http://localhost:5432', 'http://192.168.1.32:4200', 'http://192.168.1.32:5432', ]
}));
app.use(errorHandlerMiddleware);


// Routes
rootRoute(app);
userRoutes(app);
profileRoutes(app);
stocksRoute(app);
notifsRoute(app);

// server
app.listen(port, () => {
    console.log(`[+] Listening on port ${port}`);
})