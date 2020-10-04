import React from "react";
import PropTypes from "prop-types";
import CardNumberField from "./fields/CardNumberField";
import { CARD_NUMBER_FIELD } from "./constants";

function Field({ type, ...config }) {
  switch (type) {
    case CARD_NUMBER_FIELD:
      return <CardNumberField {...config} />;

    default:
      return null;
  }
}

Field.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Field;
