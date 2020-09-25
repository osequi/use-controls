import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { camelCase, debounce } from "lodash";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

/**
 * Defines the prop types
 */
const propTypes = {
  type: PropTypes.oneOf(["text", "checkbox", "radio"]),
  label: PropTypes.string,
  value: PropTypes.any,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.any,
    })
  ),
  eventHandler: PropTypes.func,
};

/**
 * Defines the default props
 */
const defaultProps = {
  type: "text",
  label: "Text",
  value: "text",
  items: [],
  eventHandler: () => {},
};

/**
 * Displays a text input
 *
 * @see https://react-mui.metamn.now.sh/forms/controlled
 */
const Text2 = (props) => {
  const { id, label, value, eventHandler } = props;

  /**
   * Keeps the input control updated on every keystroke
   */
  const [value2, setValue2] = useState(value);

  /**
   * Keeps the input value debounced
   */
  const [debounced, setDebounced] = useState(value);
  const debounceValue = useCallback(
    debounce((value) => setDebounced(value), 500),
    []
  );

  /**
   * Handles the event
   */
  const handleChange = (event) => {
    setValue2(event.target.value);
    debounceValue(event.target.value);
  };

  /**
   * Returns the debounced value
   */
  useEffect(() => {
    eventHandler({ event: { target: { value: debounced } }, control: props });
  }, [debounced]);

  return (
    <TextField
      id={id}
      label={label}
      defaultValue={value2}
      onChange={handleChange}
    />
  );
};

/**
 * Displays a checkbox input
 */
const Checkbox2 = (props) => {
  const { id, label, value, eventHandler } = props;

  return (
    <FormControlLabel
      control={<Checkbox name={id} checked={value} />}
      label={label}
      onChange={(event) => eventHandler({ event: event, control: props })}
    />
  );
};

/**
 * Displays a checkbox input
 */
const Radio2 = (props) => {
  const { id, label, value, items, eventHandler } = props;

  const itemsList =
    items &&
    items.map((item) => {
      const { id, value, label } = item;

      return (
        <FormControlLabel
          control={<Radio />}
          key={id}
          value={value}
          label={label}
        />
      );
    });

  return (
    <RadioGroup
      aria-label={id}
      name={id}
      value={value}
      onChange={(event) => eventHandler({ event: event, control: props })}
    >
      {itemsList}
    </RadioGroup>
  );
};

/**
 * Displays the component
 */
const Control = (props) => {
  const { type, label, value } = props;

  const id = camelCase(label);

  switch (type) {
    case "checkbox":
      return <Checkbox2 {...props} id={id} />;
    case "radio":
      return <Radio2 {...props} id={id} />;
    case "text":
    default:
      return <Text2 {...props} id={id} />;
  }
};

Control.propTypes = propTypes;
Control.defaultProps = defaultProps;

export default Control;
export { propTypes as ControlPropTypes, defaultProps as ControlDefaultProps };
