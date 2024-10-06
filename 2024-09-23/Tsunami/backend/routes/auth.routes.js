const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const secretKey = "your_secret_key";

router.get("/generate-token", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const token = jwt.sign({ name }, secretKey, { expiresIn: "1h" });
  res.json({ token });
});

router.post("/verify-token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    res.json({ message: "Token is valid", decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
