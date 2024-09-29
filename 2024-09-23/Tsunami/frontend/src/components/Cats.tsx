import { Box, List, ListItem, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import SubmitCat from "./SubmitCat";

type Cat = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Cats = () => {
  const [cats, setCats] = useState<Cat[]>([]);

  const fetchCats = async () => {
    const response = await fetch("http://localhost:8080/cats");
    const data = await response.json();
    setCats(data);
  };

  const deleteCat = async (id: string) => {
    await fetch(`http://localhost:8080/cats`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    fetchCats(); // Refresh the list after deletion
  };

  const updateCat = async (id: string, newName: string) => {
    await fetch(`http://localhost:8080/cats`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name: newName }),
    });
    fetchCats(); // Refresh the list after updating
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <Box>
      <Typography variant="h3">Cats</Typography>
      <List>
        {cats.map((cat) => (
          <ListItem key={cat.id}>
            <Typography>{cat.name}</Typography>
            <Button onClick={() => updateCat(cat.id, prompt("New name:") || cat.name)}>Update</Button>
            <Button onClick={() => deleteCat(cat.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      <SubmitCat fetchCats={fetchCats} />
    </Box>
  );
};

export default Cats;
