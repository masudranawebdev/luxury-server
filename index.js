const express = require("express");
const app = express();
const cors = require("cors");
const httpStatus = require("http-status");
const connectDB = require("./server");
const routes = require("./src/routes/routes");
const globalErrorHandler = require("./src/middleware/global.error.handler");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Luxury server is runing YAY! 🫡",
  });
});

// Import All Api
app.use("/api/v1", routes);

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

connectDB();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Luxuray server running on port ${port} 🔥`);
});

// index.js -> routes -> route -> controllers -> services -> models.
