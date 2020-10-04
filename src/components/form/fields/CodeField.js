import React, { useCallback, useMemo } from "react";
import cx from "classnames";
import { setCursor } from "../../../utils/document";
import Label from "../Label";
import classes from "./CodeField.module.scss";
import { generateInputs, normalizeAndSlice } from "./helpers";

const DEFAULT_MAX_LENGTH = 1;

function CodeField({ label, name, config, validation, error, control }) {
  const { maxLength = DEFAULT_MAX_LENGTH } = validation || {};
  const { register, getValues, setValue } = control;

  const inputs = useMemo(() => generateInputs(name, config?.size), [
    config,
    name,
  ]);

  const focusField = useCallback(
    (id) => {
      const name = inputs[id]?.name;
      const value = getValues(name);
      const ref = control.fieldsRef.current[name]?.ref;
      if (ref) {
        ref.focus();
        if (value) {
          setTimeout(() => setCursor(value.length));
        }
      }
    },
    [inputs, control, getValues]
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
    const value = getValues(name);
    if (event.key === "Backspace" && inputs?.[id - 1]) {
      setTimeout(() => {
        const updatedValue = getValues(name);
        if (updatedValue === value || !updatedValue) {
          focusField(id - 1);
        }
      });
    } else if (event.key === "Delete") {
      deleteValue(id);
    } else if (event.key === "ArrowLeft") {
      focusField(id - 1);
    } else if (event.key === "ArrowRight") {
      focusField(id + 1);
    }

    if (value) {
      setTimeout(() => setCursor(value.length));
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
