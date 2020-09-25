import React, { useState } from "react";
import PropTypes from "prop-types";
import { camelCase } from "lodash";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

/**
 * Imports other components and hooks
 */
import Control, { ControlPropTypes, ControlDefaultProps } from "./Control";

/**
 * Loads business logic
 */
import { loadInitialValues, getEventValue } from "./useControls.logic";

/**
 * Defines the prop types
 */
const propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape(ControlPropTypes)),
};

/**
 * Defines the default props
 */
const defaultProps = {
  title: "Controls",
  items: [],
};

/**
 * Displays the component
 */
const useControls = (props) => {
  const { title, items } = props;

  /**
   * Manages the state of values
   */
  const initialValues = loadInitialValues(props);
  const [values, setValues] = useState(initialValues);

  const eventHandler = (props) => {
    const { control } = props;
    const { label } = control;

    const newValues = { ...values };
    newValues[camelCase(label)] = getEventValue(props);

    setValues(newValues);
  };

  /**
   * Displays the controls
   */
  const itemsList =
    items &&
    items.map((item) => {
      const { id, label } = item;

      return (
        <div key={id}>
          <Control
            {...item}
            value={values[camelCase(label)]}
            eventHandler={eventHandler}
          />
        </div>
      );
    });

  /**
   * Displays the form
   */
  const form = (
    <FormControl className="Controls" component="fieldset">
      <FormLabel component="legend">{title}</FormLabel>
      {itemsList}
    </FormControl>
  );

  return [values, form];
};

useControls.propTypes = propTypes;
useControls.defaultProps = defaultProps;

export default useControls;
export {
  propTypes as useControlsPropTypes,
  defaultProps as useControlsDefaultProps,
};
