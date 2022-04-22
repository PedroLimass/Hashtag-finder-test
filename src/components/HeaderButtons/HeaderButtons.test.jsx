import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import HeaderButtons from "./index";

import { BrowserRouter } from "react-router-dom";

describe("< HeaderButtons />", () => {
  it("Should header router sobre", async () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <HeaderButtons />
      </Router>
    );

    const user = userEvent.setup();

    expect(history.location.pathname).toBe("/");
    await user.click(screen.getByText(/sobre/i));
    expect(history.location.pathname).toBe("/sobre");
  });

  it("Should header router login", async () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <HeaderButtons />
      </Router>
    );

    const user = userEvent.setup();

    expect(history.location.pathname).toBe("/");
    await user.click(screen.getByText(/login/i));
    expect(history.location.pathname).toBe("/login");

    waitFor(() => expect(screen.getByText(/login/i)).not.toBeInTheDocument());
  });

  it("Should header /search-listing", async () => {
    const history = createMemoryHistory({
      initialEntries: ["/search-listing"],
    });

    render(
      <Router location={history.location} navigator={history}>
        <HeaderButtons />
      </Router>
    );
    expect(history.location.pathname).toBe("/search-listing");
  });


  it("Should header /login ", async () => {
    const history = createMemoryHistory({
      initialEntries: ["/login"],
    });

    render(
      <Router location={history.location} navigator={history}>
        <HeaderButtons />
      </Router>
    );
    expect(history.location.pathname).toBe("/login");
  });
});
