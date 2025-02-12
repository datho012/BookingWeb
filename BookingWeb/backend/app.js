const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./database.config");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const paymentRoute = require("./routes/payment");
const hotelsRoute = require("./routes/hotel.js");
const favoriteRoute = require("./routes/favorite.js");
const roomRoute = require("./routes/rooms.js");
const bookingRoute = require("./routes/booking");
const searchRoute = require("./routes/search");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bodyParser = require("body-parser");
const vnPay = require("vnpay");
const vnpayRouter = require("./routes/vnpay");

const reviewRoutes = require("./routes/reviews");
// const multer = require("multer");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
require("dotenv").config(); // Tải biến môi trường từ tệp .env

connectDB(); // Kết nối với cơ sở dữ liệu bằng cách sử dụng cấu hình cơ sở dữ liệu của bạn
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// view engine setup


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json({ limit: "10mb" }));
app.use("/api/hotels", hotelsRoute);
app.use("/api/favorites", favoriteRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/vnpay", vnpayRouter);
app.use("/api/reviews", reviewRoutes);
app.use("/api/search", searchRoute);

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Máy chủ đang chạy trên cổng ${port}`);
});
module.exports = app;
