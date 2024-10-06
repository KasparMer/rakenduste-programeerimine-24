const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = 8080;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const catsRoutes = require("./routes/cats.routes");
const todosRoutes = require("./routes/todos.routes");
const exampleRoutes = require("./routes/example.routes");
const authRoutes = require("./routes/auth.routes"); // JWT routes

app.use("/cats", catsRoutes);
app.use("/todos", todosRoutes);
app.use("/examples", exampleRoutes);
app.use("/auth", authRoutes); // JWT routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
