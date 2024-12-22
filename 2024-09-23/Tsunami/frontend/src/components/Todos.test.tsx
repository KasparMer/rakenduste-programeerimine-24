import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Todos from "./Todos";

global.fetch = jest.fn(); // Mockime fetch funktsiooni

describe("Todos Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Tühjendame kõik mockid enne iga testi
  });

  test("displays TODOs fetched from the server", async () => {
    // Mockime fetchi tagastama võltsandmeid
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [
        { id: 1, title: "Test TODO", priority: 1, createdAt: Date.now(), updatedAt: null, deleted: false },
      ],
    });

    render(<Todos />);

    // Kontrollime, et andmed kuvatakse pärast laadimist
    expect(await screen.findByText("Test TODO")).toBeInTheDocument();
  });

  test("deletes a TODO and refreshes the list", async () => {
    // Mockime algsed TODOd
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: async () => [
          { id: 1, title: "Test TODO", priority: 1, createdAt: Date.now(), updatedAt: null, deleted: false },
        ],
      })
      .mockResolvedValueOnce({ json: async () => [] }); // Mockime tühja loendi pärast kustutamist

    render(<Todos />);

    // Kontrollime, et TODO on alguses olemas
    expect(await screen.findByText("Test TODO")).toBeInTheDocument();

    // Kustutamise nupp
    fireEvent.click(screen.getByText("Delete"));

    // Kontrollime, et TODO eemaldati
    await waitFor(() => expect(screen.queryByText("Test TODO")).not.toBeInTheDocument());
  });
});
