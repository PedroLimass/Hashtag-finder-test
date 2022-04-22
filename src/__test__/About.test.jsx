import * as React from "react";
import { cleanup, render, waitFor, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import About from "../pages/About/About";

import { BrowserRouter } from "react-router-dom";

describe("< About />", () => {
  it("Should header", async () => {
    const utils = await render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    expect(utils.getByText("hashtag")).toBeTruthy();
    expect(utils.getByText("finder")).toBeTruthy();
    expect(utils.getByRole("link", { name: /hashtag finder/i })).toBeTruthy();
  });
  it("Should render api elements", async () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    waitFor(() =>
      expect(
        screen.getByText(
          /esse projeto consiste em mostrar os últimos tweets que mencionam a hashtag buscada\. a ideia é desenvolver uma página web aplicando as boas práticas e conhecimentos adquiridos até este momento do curso\. o projeto foi desenvolvido utilizando react com javascript e css\./i
        )
      ).toBeInTheDocument()
    );

    waitFor(() =>
      expect(screen.getByTestId("person-info-container")).toBeInTheDocument()
    );
  });

  it("Should render footer", async () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    waitFor(() =>
      expect(
        screen.getByText(/@newtab academy 2021\. todos os direitos reservados/i)
      ).toBeInTheDocument()
    );
  });
});
