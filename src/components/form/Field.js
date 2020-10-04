import React from "react";
import PropTypes from "prop-types";
import CodeField from "./fields/CodeField";
import { CODE_FIELD } from "./constants";

function Field({ type, ...config }) {
  switch (type) {
    case CODE_FIELD:
      return <CodeField {...config} />;

    default:
      return null;
  }
}

Field.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Field;
