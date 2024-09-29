import { Box, Button, Stack, TextField, Snackbar } from "@mui/material";
import React, { useState } from "react";

type SubmitTodoProps = {
  fetchTodos: () => void;
};

const SubmitTodo = ({ fetchTodos }: SubmitTodoProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<number | null>(1);
  const [open, setOpen] = useState(false);

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  const submitTodo = async () => {
    try {
      const response = await fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, priority }),
      });

      if (response.ok) {
        setOpen(true);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitTodo();
    setTimeout(fetchTodos, 100);
    setTitle(""); // Clear input after submit
    setPriority(1); // Reset priority after submit
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextField
            label="Todo title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            type="number"
            label="Priority"
            value={priority || ""}
            onChange={(event) => setPriority(Number(event.target.value))}
          />
          <Button type="submit">Add</Button>
        </Stack>
      </form>
      <Snackbar
        open={open}
        onClose={handleSnackbarClose}
        message="TODO added successfully!"
        autoHideDuration={3000}
      />
    </Box>
  );
};

export default SubmitTodo;
