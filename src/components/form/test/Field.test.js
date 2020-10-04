import React from "react";
import { screen, render } from "@testing-library/react";
import Field from "../Field";
import RenderWithFormMethods from "../../../internals/testing/components/RenderWithFormMethods";
import { CARD_NUMBER_FIELD } from "../constants";

describe("<Field />", () => {
  test("Shouldn't render a wrong field type", () => {
    const WRONG_TYPE = "WRONG_TYPE";

    const { container } = render(<Field type={WRONG_TYPE} />);

    expect(container.firstChild).toBeNull();
  });

  test("Should render CARD_NUMBER_FIELD type", () => {
    const LABEL = "LABEL";
    const INPUT = "INPUT";

    render(
      <RenderWithFormMethods>
        <Field type={CARD_NUMBER_FIELD} label={LABEL} name={INPUT} />
      </RenderWithFormMethods>
    );

    const label = screen.getByText(LABEL);
    const input = screen.getByRole("textbox");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
});
