import React from "react";
import { Form, Label, Select } from "semantic-ui-react";

const SelectInput = ({
  input,
  multiple,
  options,
  type,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <Select
        value={input.value || null}
        onChange={(e, data) => input.onChange(data.value)}
        options={options}
        multiple={multiple}
        type={type}
      />
      {touched && error && (
        <Label basic color="red">
          {error}{" "}
        </Label>
      )}
    </Form.Field>
  );
};

export default SelectInput;
