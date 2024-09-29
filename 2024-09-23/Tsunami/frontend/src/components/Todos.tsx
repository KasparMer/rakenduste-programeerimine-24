import { Box, List, ListItem, Typography, Button, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import SubmitTodo from "./SubmitTodo";

type Todo = {
  id: number;
  title: string;
  priority: number;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [open, setOpen] = useState(false);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8080/todos");
    const data = await response.json();
    setTodos(data);
  };

  const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:8080/todos`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    fetchTodos(); // Refresh the list after deletion
  };

  const updateTodo = async (id: number, newTitle: string) => {
    await fetch(`http://localhost:8080/todos`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title: newTitle }),
    });
    fetchTodos(); // Refresh the list after updating
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Box>
      <Typography variant="h3">TODOs</Typography>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <Typography>{todo.title}</Typography>
            <Button onClick={() => updateTodo(todo.id, prompt("New title:") || todo.title)}>Update</Button>
            <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      <SubmitTodo fetchTodos={fetchTodos} />
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        message="TODO added successfully!"
        autoHideDuration={3000}
      />
    </Box>
  );
};

export default Todos;
