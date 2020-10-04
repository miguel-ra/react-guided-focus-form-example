import React, { useCallback, useMemo } from "react";
import cx from "classnames";
import { resetCursor } from "../../../utils/document";
import Label from "../Label";
import classes from "./CodeField.module.scss";
import { generateInputs, normalizeAndSlice } from "./helpers";

const DEFAULT_MAX_LENGTH = 1;

function CodeField({ label, name, config, validation, error, control }) {
  const { maxLength = DEFAULT_MAX_LENGTH } = validation;
  const { register, getValues, setValue } = control;

  const inputs = useMemo(() => generateInputs(name, config.size), [
    config,
    name,
  ]);

  const focusField = useCallback(
    (id) => {
      const name = inputs[id]?.name;
      const ref = control.fieldsRef.current[name]?.ref;
      if (ref) {
        ref.focus();
      }
    },
    [inputs, control]
  );

  const formatValue = useCallback(
    (id, value) => {
      const name = inputs[id]?.name;
      const [normalizedValue, rest] = normalizeAndSlice(value, maxLength) || [
        value,
      ];
      if (name && normalizedValue) {
        setValue(name, normalizedValue, {
          shouldValidate: true,
        });
        focusField(id);
        if (rest) {
          formatValue(id + 1, rest);
        }
      }
    },
    [inputs, maxLength, setValue, focusField]
  );

  const deleteValue = useCallback(
    (id) => {
      const name = inputs[id]?.name;
      setValue(name, "", {
        shouldValidate: true,
      });
      focusField(id + 1);
    },
    [focusField, inputs, setValue]
  );

  const handleKeyDown = (id, name) => (event) => {
    if (event.key === "Backspace" && inputs?.[id - 1]) {
      setTimeout(() => !getValues(name) && focusField(id - 1));
    } else if (event.key === "Delete") {
      deleteValue(id);
      setTimeout(() => resetCursor());
    }
  };

  const handleChange = (id) => (event) => {
    const { value } = event.target;
    if (!error?.[id] || error?.[id]?.type === "pattern") {
      focusField(id + 1);
    }
    formatValue(id, value);
  };

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <div>
        {inputs.map(({ id, name }) => (
          <input
            key={name}
            ref={register(validation)}
            name={name}
            type="tel"
            autoComplete="off"
            className={cx(classes.input, {
              [classes.valid]: getValues(name) && !error?.[id],
              [classes.error]: error?.[id],
            })}
            onKeyDown={handleKeyDown(id, name)}
            onChange={handleChange(id, name)}
          />
        ))}
      </div>
    </>
  );
}

export default CodeField;
