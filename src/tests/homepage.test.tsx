import Homepage from "@/app/homepage";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";


describe("Homepage", () => {
  it("should have a specifict text", () => {
    render(<Homepage />);
    expect(screen.getByText("Create Video")).toBeInTheDocument();
  });
});