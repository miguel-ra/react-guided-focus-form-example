import React, { useCallback, useMemo } from "react";
import cx from "classnames";
import { setCursor } from "../../../utils/document";
import Label from "../Label";
import classes from "./CardNumberField.module.scss";
import { generateInputs, normalizeAndSlice } from "./helpers";

const DEFAULT_MAX_LENGTH = 1;

function CardNumberField({ label, name, config, validation, error, control }) {
  const { maxLength = DEFAULT_MAX_LENGTH } = validation || {};
  const { register, getValues, setValue } = control;

  const inputs = useMemo(() => generateInputs(name, config?.size), [
    config,
    name,
  ]);

  const getRef = useCallback(
    (name) => {
      return control.fieldsRef.current[name]?.ref;
    },
    [control]
  );

  const focusField = useCallback(
    (name) => {
      const ref = getRef(name);
      if (ref) {
        ref.focus();
      }
    },
    [getRef]
  );

  const changeValue = useCallback(
    (name, value) => {
      const ref = getRef(name);
      if (ref) {
        const selectionStart = ref.selectionStart;

        setValue(name, value, {
          shouldValidate: true,
        });

        setCursor(document.activeElement, selectionStart);
      }
    },
    [getRef, setValue]
  );

  const formatInput = useCallback(
    (id, value, cursorPosition = document.activeElement.selectionStart) => {
      const name = inputs[id]?.name;
      const [normalizedValue, rest] = normalizeAndSlice(value, maxLength);

      if (name && normalizedValue) {
        changeValue(name, normalizedValue);
        // Only change add rest to next field if cursor is at the end
        if (cursorPosition >= value.length) {
          focusField(name);
          if (rest) {
            // We need to forwards the cursor position to allow the ovewrite in all the fieds
            formatInput(id + 1, rest, cursorPosition);
          }
        }
      }
    },
    [inputs, maxLength, changeValue, focusField]
  );

  const removeChar = useCallback(
    (id, removeFirstChar = false) => {
      const name = inputs[id]?.name;
      const value = getValues(name);
      const newValue = value.substr(
        ...(removeFirstChar ? [1] : [0, value.length - 1])
      );

      changeValue(name, newValue);
      focusField(name);

      if (removeFirstChar) {
        setCursor(getRef(name), 0);
      }
    },
    [changeValue, focusField, getRef, getValues, inputs]
  );

  const handleKeyDown = useCallback(
    ({ id, name }) => (event) => {
      const value = getValues(name);
      if (event.key === "Backspace" && inputs?.[id - 1]) {
        setTimeout(() => {
          const updatedValue = getValues(name);
          if (updatedValue === value) {
            removeChar(id - 1);
          }
        });
      } else if (event.key === "Delete" && inputs?.[id + 1]) {
        setTimeout(() => {
          const updatedValue = getValues(name);
          if (updatedValue === value) {
            removeChar(id + 1, true);
          }
        });
      } else if (event.key === "ArrowLeft" && inputs?.[id - 1]) {
        if (document.activeElement.selectionStart === 0) {
          event.preventDefault();
          focusField(inputs[id - 1]?.name);
          setCursor(getRef(inputs[id - 1]?.name), maxLength);
        }
      } else if (event.key === "ArrowRight" && inputs?.[id + 1]) {
        if (document.activeElement.selectionEnd === value.length) {
          event.preventDefault();
          focusField(inputs[id + 1]?.name);
          setCursor(getRef(inputs[id + 1]?.name), 0);
        }
      }
    },
    [focusField, getRef, getValues, inputs, maxLength, removeChar]
  );

  const handleChange = useCallback(
    ({ id }) => (event) => {
      const { value } = event.target;
      formatInput(id, value);
    },
    [formatInput]
  );

  const handlePaste = useCallback(
    ({ name }) => () => {
      setValue(name, "");
    },
    [setValue]
  );

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
            onKeyDown={handleKeyDown({ id, name })}
            onChange={handleChange({ id, name })}
            onPaste={handlePaste({ id, name })}
          />
        ))}
      </div>
    </>
  );
}

export default CardNumberField;
