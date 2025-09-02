import { render, screen } from "@testing-library/react";
import Description from "./Description";

describe("Description component", () => {
  test("renders title and subtitle", () => {
    render(<Description />);

    expect(screen.getByText("Little Lemon")).toBeInTheDocument();
    expect(screen.getByText("Chicago")).toBeInTheDocument();
  });

  test("renders description text and image", () => {
    render(<Description />);

    expect(screen.getByText(/Lorem ipsum/i)).toBeInTheDocument();
    const img = screen.getByAltText(/hero image/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/chef.jpg");
  });
});
