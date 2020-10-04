import React from "react";
import { fireEvent, render, screen, wait } from "@testing-library/react";
import CheckoutForm from "../CheckoutForm";
import fields, { NUMBER_OF_DIGITS } from "../fields";
import userEvent from "@testing-library/user-event";

const RANDOM_INPUT = [...Array(NUMBER_OF_DIGITS)]
  .map(() => Math.floor(Math.random() * 10))
  .join("");

describe("<CheckoutForm />", () => {
  test.skip("Should render its internal components", () => {
    render(<CheckoutForm />);

    const label = screen.getByText(fields[0].label);
    const inputs = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    expect(label).toBeInTheDocument();
    expect(inputs).toHaveLength(NUMBER_OF_DIGITS);
    expect(button).toBeInTheDocument();
  });

  test.skip("Should render button disabled by default", async () => {
    render(<CheckoutForm />);

    await wait(() =>
      expect(screen.getByRole("button")).toHaveProperty("disabled", true)
    );
  });

  test.skip("Should render buttons disabled if input is not a number", async () => {
    const VALUE = "qwertyuiop";
    render(<CheckoutForm />);
    const inputs = screen.getAllByRole("textbox");

    await userEvent.type(inputs[0], VALUE);

    await wait(() =>
      expect(screen.getByRole("button")).toHaveProperty("disabled", true)
    );
  });

  test.skip("Should fill next fields and change the focus when a long is typed", async () => {
    render(<CheckoutForm />);
    const inputs = screen.getAllByRole("textbox");

    await userEvent.type(inputs[0], RANDOM_INPUT);

    expect(document.activeElement).toEqual(inputs[inputs.length - 1]);

    inputs.forEach((input, index) => {
      expect(input.value).toBe(RANDOM_INPUT[index]);
    });

    await wait(() =>
      expect(screen.getByRole("button")).toHaveProperty("disabled", false)
    );
  });

  test.skip("Submiting will reset fields, log the data and change the focus", async () => {
    console.log = jest.fn();
    render(<CheckoutForm />);
    const inputs = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    await userEvent.type(inputs[0], RANDOM_INPUT);
    fireEvent.click(button);
    await wait(() => expect(inputs[0].value).toBe(""));

    for (let index = 1; index < inputs.length; index += 1) {
      expect(inputs[index].value).toBe("");
    }
    expect(console.log).toHaveBeenCalledWith("Digit:", RANDOM_INPUT);
  });
});
