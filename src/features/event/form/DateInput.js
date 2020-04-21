import React from "react";
import { Form, Label } from "semantic-ui-react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DateInput = ({
  input,
  placeholder,
  width,
  meta: { error, touched },
  ...props
}) => {
  return (
    <Form.Field error={!!error && touched}>
      <ReactDatePicker
        {...props}
        placeholderText={placeholder}
        selected={input.value ? new Date(input.value) : null}
        onChange={input.onChange}
        onBlur={input.onBlur}
        onChangeRaw={(e) => e.preventDefault()}
      />
      {touched && error && (
        <Label basic color="red">
          {error}{" "}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
