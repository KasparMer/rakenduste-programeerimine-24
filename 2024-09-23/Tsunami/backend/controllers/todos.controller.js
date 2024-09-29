const todos = [];

exports.create = (req, res) => {
  const { content } = req.body;

  if (!content || content === "") {
    return res
      .status(418)
      .send({ type: "Error", message: "Must include content" });
  }

  const newTodo = {
    id: crypto.randomUUID(),
    content,
    completed: false,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  };

  todos.push(newTodo);
  res.send(newTodo);
};

exports.read = (req, res) => {
  res.send(todos.filter(todo => !todo.deleted));
};

exports.update = (req, res) => {
  const { id, content, completed } = req.body;

  const todo = todos.find(todo => todo.id === id);
  if (!todo) {
    return res.status(404).send({ type: "Error", message: "Todo not found" });
  }

  if (content && content !== "") {
    todo.content = content;
  }
  if (typeof completed === "boolean") {
    todo.completed = completed;
  }
  todo.updatedAt = Date.now();

  res.send(todo);
};

exports.delete = (req, res) => {
  const { id } = req.body;

  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex === -1) {
    return res.status(404).send({ type: "Error", message: "Todo not found" });
  }

  todos[todoIndex].deleted = true;
  res.send({ message: "Todo marked as deleted" });
};
