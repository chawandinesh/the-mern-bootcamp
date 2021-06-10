require("dotenv").config();
const express = require("express");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express();
const mongoose = require("mongoose");
//my routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
//Database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log("ERROR:", err);
  });

// Middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//My Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
