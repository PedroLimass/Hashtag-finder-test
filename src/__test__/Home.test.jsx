import * as React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import HomePage from "../pages/HomePage/HomePage";

import { BrowserRouter } from "react-router-dom";

describe("< About />", () => {
  it("Should header", async () => {
    const utils = await render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(utils.getByText("hashtag")).toBeTruthy();
    expect(utils.getByText("finder")).toBeTruthy();
    expect(utils.getByRole("link", { name: /hashtag finder/i })).toBeTruthy();
    expect(
      utils.getByText(/encontre hashtags de maneira fácil\./i)
    ).toBeTruthy();
  });

  it("Should render api data", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    waitFor(() =>
      expect(screen.getByTestId("data-Carousel")).toBeInTheDocument()
    );

    waitFor(() =>
      expect(screen.getByTestId("data-Post")).toBeInTheDocument()
    );
  });
});
