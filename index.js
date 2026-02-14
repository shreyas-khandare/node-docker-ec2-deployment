const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "devops-node-app";

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    app: APP_NAME,
  });
});

app.get("/life", (req, res) => {
  res.json({
    status: "ok",
    app: "CI CD WORKING",
  });
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} running on port ${PORT}`);
});
