import { CODE_FIELD } from "../../components/form/constants";

export const NUMBER_OF_DIGITS = 6;

const fields = [
  {
    label: "Numeric Code",
    name: "digit",
    type: CODE_FIELD,
    config: {
      size: NUMBER_OF_DIGITS,
    },
    validation: {
      required: true,
      maxLength: 1,
      pattern: /\d/,
    },
  },
];

export default fields;
