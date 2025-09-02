import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  test("renders logo image with correct src and alt", () => {
    const logo = screen.getByAltText(/little lemon/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/images/logo.png");
  });

  test("logo is wrapped in a link to home", () => {
    const link = screen.getByRole("link", { name: /little lemon/i });
    expect(link).toHaveAttribute("href", "/");
  });

  test("renders Nav component content", () => {
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });
});
