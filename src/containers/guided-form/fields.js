import { CARD_NUMBER_FIELD } from "../../components/form/constants";

export const NUMBER_OF_DIGITS = 4;

const fields = [
  {
    label: "Card number",
    name: "cardnumber",
    type: CARD_NUMBER_FIELD,
    config: {
      size: NUMBER_OF_DIGITS,
    },
    validation: {
      required: true,
      minLength: 4,
      maxLength: 4,
      pattern: /\d/,
    },
  },
];

export default fields;
