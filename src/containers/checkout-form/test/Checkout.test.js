import React from "react";
import { fireEvent, render, screen, wait } from "@testing-library/react";
import Checkout from "../Checkout";
import fields, { NUMBER_OF_DIGITS } from "../fields";

const RANDOM_CARD = [
  ...Array(NUMBER_OF_DIGITS * fields[0].validation.minLength),
]
  .map(() => Math.floor(Math.random() * 10))
  .join("");

describe("<Checkout />", () => {
  it("Should render its internal components", () => {
    render(<Checkout />);

    const label = screen.getByText(fields[0].label);
    const inputs = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    expect(label).toBeInTheDocument();
    expect(inputs).toHaveLength(NUMBER_OF_DIGITS);
    expect(button).toBeInTheDocument();
  });

  it("Should render button disabled by default", async () => {
    render(<Checkout />);

    await wait(() =>
      expect(screen.getByRole("button")).toHaveProperty("disabled", true)
    );
  });

  it("Should render buttons disabled if input is not a number", async () => {
    const VALUE = "asdfasdfasdfasdf";
    render(<Checkout />);
    const inputs = screen.getAllByRole("textbox");

    inputs[0].focus();
    fireEvent.change(inputs[0], {
      target: { value: VALUE },
    });

    await wait(() =>
      expect(screen.getByRole("button")).toHaveProperty("disabled", true)
    );
  });

  it("Should fill next fields and change the focus when a long is typed", async () => {
    render(<Checkout />);
    const inputs = screen.getAllByRole("textbox");

    inputs[0].focus();
    fireEvent.change(inputs[0], {
      target: { value: RANDOM_CARD },
    });

    expect(document.activeElement).toEqual(inputs[inputs.length - 1]);

    inputs.forEach((input, index) => {
      expect(input.value).toBe(
        RANDOM_CARD.slice(
          index * fields[0].validation.minLength,
          (index + 1) * fields[0].validation.minLength
        )
      );
    });

    await wait(() =>
      expect(screen.getByRole("button")).toHaveProperty("disabled", false)
    );
  });

  it("Submiting will reset fields, log the data and change the focus", async () => {
    console.log = jest.fn();
    render(<Checkout />);
    const inputs = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    inputs[0].focus();
    fireEvent.change(inputs[0], {
      target: { value: RANDOM_CARD },
    });

    fireEvent.click(button);
    await wait(() => expect(inputs[0].value).toBe(""));

    for (let index = 1; index < inputs.length; index += 1) {
      expect(inputs[index].value).toBe("");
    }
    expect(console.log).toHaveBeenCalledWith("CardNumber:", RANDOM_CARD);
  });
});
