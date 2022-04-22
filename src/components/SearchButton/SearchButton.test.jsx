import * as React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import SearchButton from "./index";

describe("< HeaderButtons />", () => {
  it("Should render", async () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <SearchButton />
      </Router>
    );

    waitFor(() =>
      expect(screen.getByTestId("data-Carousel")).toBeInTheDocument()
    );

    waitFor(() => expect(screen.getByTestId("data-Post")).toBeInTheDocument());
  });

  it("Should render input search", async () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <SearchButton />
      </Router>
    );
    waitFor(() =>
      expect(screen.getByPlaceholderText(/buscar\.\.\./i)).toBeInTheDocument()
    );
  });

  it("Should change the value input", async () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <SearchButton />
      </Router>
    );

    waitFor(() =>
      expect(screen.getByPlaceholderText(/buscar\.\.\./i)).toBeInTheDocument()
    );

    const input = screen.getByPlaceholderText(/buscar\.\.\./i);

    userEvent.type(input, "batata");

    fireEvent.keyPress(input, { key: 'Enter', charCode: 13 });

    waitFor(() =>
      expect(
        screen.getByText(
          /exibindo os 10 resultados mais recentes para #batata/i
        )
      ).toBeInTheDocument()
    );
  });
});
