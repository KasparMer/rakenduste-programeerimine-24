const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const todosController = require("../controllers/todos.controller");

const validateTodo = [
  check("title").notEmpty().withMessage("Title is required"),
  check("priority")
    .isInt({ min: 1, max: 5 })
    .withMessage("Priority must be between 1 and 5"),
];

router.get("/", todosController.read);

router.post("/", validateTodo, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  todosController.create(req, res, next);
});

router.put("/", todosController.update);

router.delete("/", todosController.delete);

module.exports = router;
