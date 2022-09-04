const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

//Routers
const indexRouter = require("./routes/index");
const { bookingRouter } = require("./routes/booking.routes");
const { roomRouter } = require("./routes/room.routes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/booking", bookingRouter);

module.exports = app;
