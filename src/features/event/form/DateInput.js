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
  let date;
  if (Object.prototype.toString.call(value) === "[object String]") {
    date = Object.prototype.toString.call(new Date(value));
  } else if (Object.prototype.toString.call(value) === "[object Date]") {
    date = Object.prototype.toString.call(value);
  } else {
    date = value;
  }
  return (
    <Form.Field error={!!error && touched}>
      <ReactDatePicker
        {...props}
        placeholderText={placeholder}
        selected={
          value
            ? date !== "[object Date]"
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
