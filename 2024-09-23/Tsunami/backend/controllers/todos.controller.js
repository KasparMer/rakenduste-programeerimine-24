const todos = [];

exports.create = (req, res) => {
  const { title, priority } = req.body;

  if (!title || title === "") {
    return res
      .status(418)
      .send({ type: "Error", message: "Must include a title" });
  }

  const newTodo = {
    id: todos.length + 1, // Assuming you want a numeric ID
    title,
    priority: priority || 1, // Default priority if none is provided
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
  const { id, title, priority } = req.body;

  const todo = todos.find(todo => todo.id === id);
  if (!todo) {
    return res.status(404).send({ type: "Error", message: "Todo not found" });
  }

  if (title && title !== "") {
    todo.title = title;
  }
  if (priority) {
    todo.priority = priority;
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
