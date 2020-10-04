import React from "react";
import PropTypes from "prop-types";
import classes from "./Label.module.scss";

function Label({ children, ...props }) {
  return (
    <label className={classes.label} {...props}>
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.string.isRequired,
};

export default React.memo(Label);
