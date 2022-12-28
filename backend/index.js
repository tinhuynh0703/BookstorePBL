const createError = require("http-errors");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const catchErrorMiddleware = require("./middlewares/catchError");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

const bookRouter = require("./routes/bookRoute");
const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRoute");
const commentRouter = require("./routes/commentRoute");
const cartRouter = require("./routes/cartRoute");
const billRouter = require("./routes/billRoute.js");
const adminRouter = require("./routes/adminRoute");
const receiverRouter = require("./routes/receiverRoute");
const paypalRouter = require("./routes/paypalRoute");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// ROUTES
app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/comments", commentRouter);
app.use("/api/carts", cartRouter);
app.use("/api/bills", billRouter);
app.use("/api/admins", adminRouter);
app.use("/api/receivers", receiverRouter);
app.use("/api/paypal", paypalRouter);

// catch 404 and forward to error handler
app.use(catchErrorMiddleware);

// error handler
app.use(errorHandlerMiddleware);

module.exports = app;
