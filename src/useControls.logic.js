import { camelCase } from "lodash";

/**
 * Loads initial values from props
 */
const loadInitialValues = (props) => {
  const { items } = props;

  let values = [];

  items &&
    items.map((item) => {
      const { label, value } = item;
      return (values[camelCase(label)] = value);
    });

  return values;
};

/**
 * Returns the value of an event fired on various types of controls
 */
const getEventValue = (props) => {
  const { event, control } = props;
  const { type } = control;

  switch (type) {
    case "checkbox":
      return event.target.checked;
    default:
      return event.target.value;
  }
};

export { loadInitialValues, getEventValue };
