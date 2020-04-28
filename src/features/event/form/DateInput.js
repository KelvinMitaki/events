import React from "react";
import { Form, Label } from "semantic-ui-react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DateInput = ({
  input: { value, onChange, onBlur },
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
        selected={
          value
            ? Object.prototype.toString.call(value) !== "[object Date]"
              ? value.toDate()
              : new Date(value)
            : null
        }
        onChange={onChange}
        onBlur={onBlur}
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
