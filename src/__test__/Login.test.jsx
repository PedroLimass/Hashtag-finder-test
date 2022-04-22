import * as React from "react";
import { render } from "@testing-library/react";
import Login from "../pages/Login/Login";

import { BrowserRouter } from "react-router-dom";

describe("< Login />", () => {
  it("Should render", async () => {
    const utils = await render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(utils).toBeTruthy();
  });

  it("Should header", async () => {
    const utils = await render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(utils.getByText("hashtag")).toBeTruthy();
    expect(utils.getByText("finder")).toBeTruthy();
    expect(utils.getByRole("link", { name: /hashtag finder/i })).toBeTruthy();
  });

  it("Should login container", async () => {
    const utils = await render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(utils.getByText("Login")).toBeTruthy();
    expect(utils.getByPlaceholderText(/usuário/i)).toBeTruthy();
    expect(utils.getByPlaceholderText(/senha/i)).toBeTruthy();
    expect(utils.getByRole("button", { name: /acessar/i })).toBeTruthy();
  });
});
