import fields, {
  NUMBER_OF_DIGITS,
} from "../../../src/containers/checkout-form/fields";

const RANDOM_CARD = [
  ...Array(NUMBER_OF_DIGITS * fields[0].validation.minLength),
]
  .map(() => Math.floor(Math.random() * 10))
  .join("");

describe("CheckOut", () => {
  it("Should go to Check Out Page and see details", () => {
    cy.visit("/");

    cy.get("label").contains(fields[0].label);
    cy.get("input").should("have.length", NUMBER_OF_DIGITS);
    cy.get("button").contains("Pay").should("be.disabled");
  });

  it("Should render buttons disabled if input is not a number", async () => {
    const VALUE = "asdfasdfasdfasdf";
    cy.visit("/");
    cy.get("input").first().type(VALUE);
    cy.get("button").contains("Pay").should("be.disabled");
  });

  it("Should fill next fields, enable the submit button and reset form onSubmit", async () => {
    cy.visit("/");
    cy.get("input").first().type(RANDOM_CARD);

    for (let index = 0; index < NUMBER_OF_DIGITS; index++) {
      cy.get("input")
        .eq(index)
        .should(
          "have.value",
          RANDOM_CARD.slice(
            index * fields[0].validation.minLength,
            (index + 1) * fields[0].validation.minLength
          )
        );
    }

    cy.get("button").contains("Pay").should("be.enabled").click();

    for (let index = 0; index < NUMBER_OF_DIGITS; index++) {
      cy.get("input").eq(index).should("have.value", "");
    }

    cy.get("button").contains("Pay").should("be.disabled").click();
  });
});
