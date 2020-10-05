import React from "react";
import { screen, render } from "@testing-library/react";
import Label from "../Label";

describe("<Label />", () => {
  it("Should render label propertly", () => {
    const LABEL = "LABEL";
    const INPUT = "INPUT";
    const { container } = render(<Label htmlFor={INPUT}>{LABEL}</Label>);

    const component = screen.getByText(LABEL);
    const label = container.querySelector("label");

    expect(component).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(component).toHaveProperty("htmlFor", INPUT);
  });
});
