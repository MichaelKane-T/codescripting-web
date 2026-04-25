const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    server: "codescripting",
    message: "Express backend is running",
    time: new Date().toISOString()
  });
});

app.listen(3000, "127.0.0.1", () => {
  console.log("Express running on http://127.0.0.1:3000");
});
